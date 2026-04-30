import { computed, ref } from "vue";

const defaultSkeletonBars = [48, 78, 58, 86, 64, 92, 52, 74, 61, 88, 55, 80];

export const useYearlyTransferRanking = ({
  activeRankingScope,
  monthlyChartLoading,
  getYearScopeMonthLimit,
  toPositiveInteger,
  normalizeBankcode,
  userBankcode,
  resolveSelectedRankingYear,
  buildCacheKey,
  readCacheEntry,
  getCachedData,
  writeCacheEntry,
  fetchWithCache,
  yearlyRankingTtlMs,
  monthLabels,
  createEmptyScopeRow,
  buildScopeSummary,
  buildScopeRowsFromNormalized,
  buildRankingScopeData,
  requestRankingScopeData,
  setCachedYearlyRankingScope,
  getRankingScopeCacheKey,
  getDefaultContext,
}) => {
  const yearlyOverviewLoadingMonths = ref({});
  const yearlyOverviewSkeletonBars = defaultSkeletonBars;

  const resolveContext = (context) =>
    context || (typeof getDefaultContext === "function" ? getDefaultContext() : {});

  const getYearScopeMonths = () =>
    Array.from({ length: getYearScopeMonthLimit() }, (_, index) => index + 1);

  const normalizeYearScopeMonth = (month) =>
    Math.max(1, Math.min(12, toPositiveInteger(month) || 1));

  const setYearlyOverviewMonthLoading = (months = [], isLoading = true) => {
    const nextLoadingMonths = { ...yearlyOverviewLoadingMonths.value };

    months.forEach((month) => {
      const normalizedMonth = normalizeYearScopeMonth(month);

      if (isLoading) {
        nextLoadingMonths[normalizedMonth] = true;
      } else {
        delete nextLoadingMonths[normalizedMonth];
      }
    });

    yearlyOverviewLoadingMonths.value = nextLoadingMonths;
  };

  const clearYearlyOverviewLoadingMonths = () => {
    yearlyOverviewLoadingMonths.value = {};
  };

  const isYearlyOverviewMonthLoading = (month) =>
    Boolean(yearlyOverviewLoadingMonths.value[normalizeYearScopeMonth(month)]);

  const yearlyOverviewHasLoadingMonths = computed(
    () =>
      activeRankingScope.value === "year" &&
      monthlyChartLoading.value &&
      getYearScopeMonths().some((month) => isYearlyOverviewMonthLoading(month))
  );

  const getYearRankingMonthCacheKey = (context, month = 1) => {
    const resolvedContext = resolveContext(context);

    return buildCacheKey(
      "ranked-bankcodes-by-year-month",
      `${resolveSelectedRankingYear()}:${
        normalizeBankcode(resolvedContext.bankcode || userBankcode.value) || "unknown"
      }:${month}`
    );
  };

  const createEmptyYearMonthScopeData = (context, month = 1) => {
    const resolvedContext = resolveContext(context);
    const normalizedMonth = normalizeYearScopeMonth(month);
    const bankcode = normalizeBankcode(resolvedContext.bankcode || userBankcode.value);
    const row = createEmptyScopeRow({
      label: monthLabels[normalizedMonth - 1],
      month: normalizedMonth,
      sortOrder: normalizedMonth,
    });

    row.bankCode = bankcode;
    row.bankName = bankcode || "Member Bank";

    return {
      rows: [row],
      sourceRows: [row],
      summary: buildScopeSummary([row]),
    };
  };

  const buildYearScopeDataFromMonthlyScopes = (monthlyScopes = [], context) => {
    const resolvedContext = resolveContext(context);
    const sourceRows = (Array.isArray(monthlyScopes) ? monthlyScopes : []).flatMap((scope) => {
      if (Array.isArray(scope?.sourceRows) && scope.sourceRows.length) {
        return scope.sourceRows;
      }

      return Array.isArray(scope?.rows) ? scope.rows : [];
    });
    const rows = buildScopeRowsFromNormalized(sourceRows, {
      ...resolvedContext,
      period: "year",
      month: 0,
    });

    return {
      rows,
      sourceRows,
      summary: buildScopeSummary(rows),
    };
  };

  const readCachedYearlyRankingMonthScopes = (context) => {
    const resolvedContext = resolveContext(context);

    return getYearScopeMonths()
      .map((month) => readCacheEntry(getYearRankingMonthCacheKey(resolvedContext, month))?.data)
      .filter(Boolean);
  };

  const normalizeYearMonthScopeData = (payload, context, month = 1) => {
    const resolvedContext = resolveContext(context);
    const normalizedMonth = normalizeYearScopeMonth(month);
    const requestContext = {
      ...resolvedContext,
      period: "year",
      month: normalizedMonth,
      requestMonth: normalizedMonth,
    };
    const scopeData = buildRankingScopeData(payload, requestContext);
    const sourceRows =
      Array.isArray(scopeData?.sourceRows) && scopeData.sourceRows.length
        ? scopeData.sourceRows
        : createEmptyYearMonthScopeData(resolvedContext, normalizedMonth).sourceRows;
    const monthRows = sourceRows.map((row, index) => ({
      ...row,
      label: monthLabels[normalizedMonth - 1],
      month: normalizedMonth,
      sortOrder: normalizedMonth || index + 1,
    }));

    return {
      rows: monthRows,
      sourceRows: monthRows,
      summary: buildScopeSummary(monthRows),
    };
  };

  const fetchYearRankingMonthData = async (month, context, forceRefresh = false) => {
    const resolvedContext = resolveContext(context);
    const normalizedMonth = normalizeYearScopeMonth(month);
    const requestContext = {
      ...resolvedContext,
      period: "year",
      month: normalizedMonth,
      requestMonth: normalizedMonth,
    };
    const cacheKey = getYearRankingMonthCacheKey(requestContext, normalizedMonth);

    return fetchWithCache({
      key: cacheKey,
      ttlMs: yearlyRankingTtlMs,
      forceRefresh,
      requestFn: async () => {
        const payload = await requestRankingScopeData(requestContext);
        return normalizeYearMonthScopeData(payload, requestContext, normalizedMonth);
      },
    });
  };

  const fetchYearlyRankingScopeDataProgressively = async (
    context,
    { forceRefresh = false, onProgress = null } = {}
  ) => {
    const resolvedContext = resolveContext(context);
    const months = getYearScopeMonths();
    const monthScopes = new Array(months.length).fill(null);
    let completedCount = 0;
    let liveSuccessCount = 0;
    let lastError = null;

    const monthPromises = months.map(async (month) => {
      const cacheKey = getYearRankingMonthCacheKey(resolvedContext, month);
      const cached = getCachedData(cacheKey, yearlyRankingTtlMs);
      let monthScopeData = cached.data || null;
      let liveFetchSucceeded = false;

      try {
        monthScopeData = await fetchYearRankingMonthData(
          month,
          resolvedContext,
          forceRefresh || !cached.isFresh || !cached.data
        );
        liveFetchSucceeded = true;
      } catch (error) {
        lastError = error;
        console.error(`Error fetching yearly ranking month ${month}:`, error);
        monthScopeData = cached.data || createEmptyYearMonthScopeData(resolvedContext, month);
      }

      monthScopes[month - 1] = monthScopeData;
      completedCount += 1;
      if (liveFetchSucceeded) liveSuccessCount += 1;

      if (typeof onProgress === "function") {
        const aggregateScopeData = buildYearScopeDataFromMonthlyScopes(
          monthScopes.filter(Boolean),
          resolvedContext
        );
        await onProgress(aggregateScopeData, {
          month,
          isLast: completedCount === months.length,
        });
      }
    });

    await Promise.allSettled(monthPromises);

    if (liveSuccessCount === 0 && lastError) {
      throw lastError;
    }

    const aggregateScopeData = buildYearScopeDataFromMonthlyScopes(
      monthScopes.filter(Boolean),
      resolvedContext
    );

    writeCacheEntry(getRankingScopeCacheKey(resolvedContext), aggregateScopeData);
    setCachedYearlyRankingScope(aggregateScopeData, {
      year: resolveSelectedRankingYear(),
      bankcode: resolvedContext.bankcode,
    });

    return aggregateScopeData;
  };

  return {
    yearlyOverviewSkeletonBars,
    yearlyOverviewLoadingMonths,
    yearlyOverviewHasLoadingMonths,
    getYearScopeMonths,
    setYearlyOverviewMonthLoading,
    clearYearlyOverviewLoadingMonths,
    isYearlyOverviewMonthLoading,
    buildYearScopeDataFromMonthlyScopes,
    readCachedYearlyRankingMonthScopes,
    fetchYearlyRankingScopeDataProgressively,
  };
};
