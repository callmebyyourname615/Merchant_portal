<template>
  <div class="relative min-h-screen overflow-hidden bg-slate-50 pb-10">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-sky-100/80 via-indigo-50/70 to-transparent"></div>
    <div class="pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl"></div>
    <div class="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl"></div>

    <div class="relative px-4 pt-6 sm:px-8">
      <div class="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/75 px-5 py-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div class="space-y-3">
          <div class="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
            Merchant Analytics
          </div>
          <div>
            <h2 class="text-3xl font-semibold tracking-tight text-slate-900">Transaction Dashboard</h2>
            
          </div>
        </div>

        <div class="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm sm:self-auto">
          <a href="#" class="font-semibold text-sky-700 transition-colors hover:text-sky-800">Home</a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span class="text-slate-600">Dashboard</span>
        </div>
      </div>
    </div>

    <div class="relative grid grid-cols-1 gap-5 px-4 mt-6 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
      <div class="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
        <div class="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-sky-100/70 blur-2xl"></div>
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400"></div>

        <div class="relative flex h-full flex-col justify-between gap-6">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700/80">
                LMPS Transaction Count
              </p>
              <h3 class="max-w-[15rem] text-sm font-medium leading-6 text-slate-500">
                Today's transaction Count (LMPS)
              </h3>
            </div>
            <div class="flex min-w-[4.75rem] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-500 px-3 py-4 text-4xl font-black text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)] ring-1 ring-white/70">
              {{ lmpsTodayCardsLoading ? "Loading" : formatRank(lmpsTotalCountRank) }}
            </div>
          </div>

          <div class="flex items-end justify-between gap-4">
            <p class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2rem]">
              {{ lmpsTodayCardsLoading ? "Loading..." : formatCount(lmpsTotalCount) }}
            </p>
            <span class="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700">
              Count
            </span>
          </div>
        </div>
      </div>

      <div class="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
        <div class="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-100/70 blur-2xl"></div>
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 via-violet-500 to-blue-500"></div>

        <div class="relative flex h-full flex-col justify-between gap-6">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo-700/80">
                LMPS Amount
              </p>
              <h3 class="max-w-[15rem] text-sm font-medium leading-6 text-slate-500">
                Today's transaction amount (LMPS)
              </h3>
            </div>
            <div class="flex min-w-[4.75rem] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-600 px-3 py-4 text-4xl font-black text-white shadow-[0_12px_28px_rgba(79,70,229,0.28)] ring-1 ring-white/70">
              {{ lmpsTodayCardsLoading ? "Loading" : formatRank(lmpsTotalAmountRank) }}
            </div>
          </div>

          <div class="flex items-end justify-between gap-4">
            <p class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[1.5rem]">
              {{ lmpsTodayCardsLoading ? "Loading..." : formatAmount(lmpsTotalAmount) }}
            </p>
            <span class="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700">
              Amount
            </span>
          </div>
        </div>
      </div>

      <div class="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
        <div class="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-100/70 blur-2xl"></div>
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-green-500"></div>

        <div class="relative flex h-full flex-col justify-between gap-6">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700/80">
                Merchant Base
              </p>
              <h3 class="max-w-[15rem] text-sm font-medium leading-6 text-slate-500">
                Total Merchants
              </h3>
            </div>
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 shadow-[0_12px_28px_rgba(16,185,129,0.25)] ring-1 ring-white/70">
              <img
                src="/fontawesome/store-solid-full.svg"
                alt="Store icon"
                class="h-7 w-7 invert brightness-0"
              />
            </div>
          </div>

          <div class="flex items-end justify-between gap-4">
            <p class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2rem]">
              {{ totalMembers.toLocaleString() }}
            </p>
            <span class="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              Merchants
            </span>
          </div>
        </div>
      </div>

      <div class="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
        <div class="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-rose-100/70 blur-2xl"></div>
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 via-orange-400 to-red-500"></div>

        <div class="relative flex h-full flex-col justify-between gap-6">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-rose-700/80">
                Merchant Status
              </p>
              <h3 class="max-w-[15rem] text-sm font-medium leading-6 text-slate-500">
                Total Merchant Inactive
              </h3>
            </div>
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-orange-400 to-red-500 shadow-[0_12px_28px_rgba(244,63,94,0.24)] ring-1 ring-white/70">
              <img
                src="/fontawesome/store-slash-solid-full.svg"
                alt="Store inactive icon"
                class="h-7 w-7 invert brightness-0"
              />
            </div>
          </div>

          <div class="flex items-end justify-between gap-4">
            <p class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2rem]">
              {{ totalMerchantInactive.toLocaleString() }}
            </p>
            <span class="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-700">
              Inactive
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="relative px-4 mt-6 sm:px-8">
      <div class="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/60 gsap-chart-card sm:px-6 sm:py-6">
        <div class="pointer-events-none absolute right-12 top-0 h-36 w-36 rounded-full bg-sky-100/70 blur-3xl"></div>

        <div class="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Yearly Overview
            </p>
            <h3 class="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Total Transaction Count &amp; Total Amount
            </h3>
            <p class="mt-2 text-sm text-slate-500">
              Monthly breakdown of total transaction count and total amount.
            </p>
          </div>
        </div>

        <div class="relative mt-5 w-full overflow-hidden rounded-[22px] border border-slate-200/70 bg-slate-50/80 p-2">
          <apexchart
            type="bar"
            :height="340"
            :options="monthlyOverviewOptions"
            :series="monthlyOverviewSeries"
          ></apexchart>
        </div>
      </div>
    </div>

    <div class="relative grid grid-cols-1 gap-5 px-4 mt-6 lg:grid-cols-4 sm:px-8">
      <div class="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/60 gsap-chart-card sm:px-6 sm:py-6">
        <div class="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-100/70 blur-3xl"></div>

        <div class="relative">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Daily Mix
          </p>
          <h3 class="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Daily Transactions
          </h3>
        </div>

        <div class="relative mt-5 overflow-hidden rounded-[22px] border border-slate-200/70 bg-slate-50/80 p-2">
          <apexchart
            type="donut"
            :height="300"
            :options="sessionsOptions"
            :series="sessionsSeries"
          ></apexchart>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/60 sm:px-6 sm:py-6 lg:col-span-3">
        <div class="pointer-events-none absolute right-12 top-0 h-36 w-36 rounded-full bg-emerald-100/60 blur-3xl"></div>

        <div class="relative">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Daily Trend
          </p>
          <h3 class="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Daily Transaction Count
          </h3>
        </div>

        <div class="relative mt-5 h-[300px] w-full overflow-hidden rounded-[22px] border border-slate-200/70 bg-slate-50/80 p-2">
          <div
            ref="dailyLineChartRef"
            class="h-full w-full transition-opacity duration-300"
            :class="chartLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'"
          ></div>

          <div
            v-if="chartLoading"
            class="absolute inset-0 flex flex-col items-center justify-center bg-white/85 backdrop-blur-sm"
          >
            <svg
              class="mb-2 h-8 w-8 animate-spin text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p class="text-sm text-slate-500">Loading count transactions...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import VueApexCharts from "vue3-apexcharts";
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import axios from "axios";
import * as echarts from "echarts";
import { gsap } from "gsap";
import { buildApiUrl } from "@/config/api";

export default {
  components: {
    apexchart: VueApexCharts,
  },

  setup() {
    const chartLoading = ref(true);
    const totalMembers = ref(0);
    const totalMerchantInactive = ref(0);
    const lmpsTotalCount = ref(0);
    const lmpsTotalAmount = ref(0);
    const lmpsTotalCountRank = ref(0);
    const lmpsTotalAmountRank = ref(0);
    const lmpsTodayCardsLoading = ref(true);

    const userRole = computed(() => (localStorage.getItem("role") || "").toLowerCase());
    const userBankcode = computed(() =>
      (localStorage.getItem("bankcode") || "").toUpperCase().trim()
    );

    const apiBase1 = buildApiUrl("/api", "base1");
    const apiBase2 = buildApiUrl("/api", "base2");
    const dailyLineChartRef = ref(null);
    const cachePrefix = "merchant-transaction-dashboard-v1";
    const rankingTodayTtlMs = 5 * 60 * 1000;
    const dailyCountsTtlMs = 10 * 60 * 1000;
    const memberMerchantTtlMs = 30 * 60 * 1000;
    const softAbortMs = 6 * 60 * 1000;

    let dailyLineChart = null;
    const inMemoryCache = new Map();
    const pendingRequests = new Map();

    const monthLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const rankingRowContainers = [
      "data",
      "results",
      "items",
      "rows",
      "rankings",
      "list",
      "payload",
      "result",
      "summary",
    ];
    const rankingBankcodePaths = [
      ["bankcode"],
      ["bankCode"],
      ["memberBankCode"],
      ["member_bank_code"],
      ["bank_code"],
      ["code"],
      ["member", "bankcode"],
      ["member", "bankCode"],
      ["memberInfo", "bankcode"],
      ["memberInfo", "bankCode"],
    ];
    const totalCountPaths = [
      ["totalCount"],
      ["total_count"],
      ["count"],
      ["todayCount"],
      ["transactionCount"],
      ["transferCount"],
      ["totalTransactionCount"],
      ["totalTransferCount"],
      ["lmpsTransactionCount"],
      ["lmpsTotalCount"],
    ];
    const totalAmountPaths = [
      ["totalAmount"],
      ["total_amount"],
      ["amount"],
      ["todayAmount"],
      ["transactionAmount"],
      ["transferAmount"],
      ["totalTransactionAmount"],
      ["totalTransferAmount"],
      ["lmpsTransactionAmount"],
      ["lmpsTotalAmount"],
    ];
    const fromCountPaths = [
      ["fromCount"],
      ["from_count"],
      ["sentCount"],
      ["sendCount"],
      ["outCount"],
      ["debitCount"],
    ];
    const toCountPaths = [
      ["toCount"],
      ["to_count"],
      ["receivedCount"],
      ["receiveCount"],
      ["inCount"],
      ["creditCount"],
    ];
    const fromAmountPaths = [
      ["fromAmount"],
      ["from_amount"],
      ["sentAmount"],
      ["sendAmount"],
      ["outAmount"],
      ["debitAmount"],
    ];
    const toAmountPaths = [
      ["toAmount"],
      ["to_amount"],
      ["receivedAmount"],
      ["receiveAmount"],
      ["inAmount"],
      ["creditAmount"],
    ];
    const genericRankPaths = [
      ["rank"],
      ["ranking"],
      ["position"],
      ["order"],
      ["place"],
      ["overallRank"],
    ];
    const rankFromCountPaths = [
      ["rankFromCount"],
      ["rank_from_count"],
      ["fromCountRank"],
      ["sentCountRank"],
    ];
    const rankToCountPaths = [
      ["rankToCount"],
      ["rank_to_count"],
      ["toCountRank"],
      ["receivedCountRank"],
    ];
    const rankTotalCountPaths = [
      ["rankTotalCount"],
      ["rank_total_count"],
      ["totalCountRank"],
      ["countRank"],
    ];
    const rankFromAmountPaths = [
      ["rankFromAmount"],
      ["rank_from_amount"],
      ["fromAmountRank"],
      ["sentAmountRank"],
    ];
    const rankToAmountPaths = [
      ["rankToAmount"],
      ["rank_to_amount"],
      ["toAmountRank"],
      ["receivedAmountRank"],
    ];
    const rankTotalAmountPaths = [
      ["rankTotalAmount"],
      ["rank_total_amount"],
      ["totalAmountRank"],
      ["amountRank"],
    ];
    const monthNumberPaths = [
      ["month"],
      ["monthNumber"],
      ["month_number"],
      ["monthNo"],
      ["month_no"],
      ["periodMonth"],
    ];
    const dayNumberPaths = [
      ["day"],
      ["dayOfMonth"],
      ["day_of_month"],
      ["dateDay"],
      ["periodDay"],
    ];
    const hourNumberPaths = [
      ["hour"],
      ["hourOfDay"],
      ["hour_of_day"],
      ["periodHour"],
    ];
    const labelPaths = [
      ["label"],
      ["periodLabel"],
      ["dayLabel"],
      ["displayLabel"],
      ["monthLabel"],
      ["name"],
      ["date"],
      ["transactionDate"],
      ["createdAt"],
      ["timestamp"],
    ];

    const getAuthConfig = () => {
      const token = localStorage.getItem("token");
      return token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};
    };

    const buildCacheKey = (scope, suffix) => `${cachePrefix}:${scope}:${suffix}`;

    const readCacheEntry = (key) => {
      if (inMemoryCache.has(key)) {
        return inMemoryCache.get(key);
      }

      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object" || !("data" in parsed)) {
          localStorage.removeItem(key);
          return null;
        }

        inMemoryCache.set(key, parsed);
        return parsed;
      } catch (error) {
        console.error("Failed to read cache entry:", error);
        localStorage.removeItem(key);
        return null;
      }
    };

    const writeCacheEntry = (key, data) => {
      const entry = {
        timestamp: Date.now(),
        data,
      };

      inMemoryCache.set(key, entry);

      try {
        localStorage.setItem(key, JSON.stringify(entry));
      } catch (error) {
        console.error("Failed to write cache entry:", error);
      }

      return data;
    };

    const getCachedData = (key, ttlMs) => {
      const entry = readCacheEntry(key);
      if (!entry) return { data: null, isFresh: false, timestamp: 0 };

      return {
        data: entry.data,
        isFresh: Date.now() - Number(entry.timestamp || 0) < ttlMs,
        timestamp: Number(entry.timestamp || 0) || 0,
      };
    };

    const pendingRequestSafetyTimeoutMs = softAbortMs + 60 * 1000;

    const fetchWithCache = async ({ key, ttlMs, requestFn, forceRefresh = false }) => {
      const cached = getCachedData(key, ttlMs);
      if (!forceRefresh && cached.isFresh) {
        return cached.data;
      }

      if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
      }

      const safetyTimer = setTimeout(() => {
        pendingRequests.delete(key);
      }, pendingRequestSafetyTimeoutMs);

      const request = requestFn()
        .then((data) => writeCacheEntry(key, data))
        .finally(() => {
          clearTimeout(safetyTimer);
          pendingRequests.delete(key);
        });

      pendingRequests.set(key, request);
      return request;
    };

    const createSoftAbortSignal = (timeoutMs = softAbortMs) => {
      if (typeof AbortController === "undefined") {
        return { signal: undefined, cancel: () => {} };
      }

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      return {
        signal: controller.signal,
        cancel: () => clearTimeout(timer),
      };
    };

    const isCanceledRequest = (error) =>
      error?.name === "CanceledError" ||
      error?.code === "ERR_CANCELED" ||
      axios.isCancel?.(error);

    const toSafeNumber = (value) => {
      const normalizedValue =
        typeof value === "string" ? value.replace(/,/g, "").trim() : value;
      const num = Number(normalizedValue);
      return Number.isFinite(num) ? num : 0;
    };

    const readPath = (source, path) =>
      path.reduce(
        (value, key) =>
          value && typeof value === "object" && key in value ? value[key] : undefined,
        source
      );

    const resolveFirstValue = (entry, paths = []) => {
      for (const path of paths) {
        const normalizedPath = Array.isArray(path) ? path : [path];
        const value = readPath(entry, normalizedPath);

        if (value !== undefined && value !== null && String(value).trim() !== "") {
          return value;
        }
      }

      return undefined;
    };

    const normalizeBankcode = (value) => {
      const normalized = String(value || "").trim();
      return normalized ? normalized.toUpperCase() : "";
    };

    const toPositiveInteger = (value) => {
      const normalized = Math.floor(toSafeNumber(value));
      return normalized > 0 ? normalized : 0;
    };

    const resolveEntryMetric = (entry, paths, fallback = 0) => {
      const value = resolveFirstValue(entry, paths);
      return value === undefined ? fallback : toSafeNumber(value);
    };

    const resolveEntryRank = (entry, index, paths, fallback = 0) => {
      const value = toPositiveInteger(resolveFirstValue(entry, paths));
      if (value > 0) return value;

      const normalizedFallback = toPositiveInteger(fallback);
      if (normalizedFallback > 0) return normalizedFallback;

      return 0;
    };

    const parseEntryDateParts = (value) => {
      if (!value) {
        return { month: 0, day: 0, hour: 0 };
      }

      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) {
        return { month: 0, day: 0, hour: 0 };
      }

      return {
        month: parsed.getMonth() + 1,
        day: parsed.getDate(),
        hour: parsed.getHours(),
      };
    };

    const formatCount = (value) =>
      new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
      }).format(toSafeNumber(value));

    const formatAmount = (value) =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(toSafeNumber(value));

    const formatCompact = (value) =>
      new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(toSafeNumber(value));

    const formatRank = (value) => {
      const normalized = toPositiveInteger(value);
      return normalized > 0 ? `#${normalized}` : "-";
    };

    const hasRankingShape = (payload) =>
      Boolean(
        payload &&
          typeof payload === "object" &&
          (resolveFirstValue(payload, rankingBankcodePaths) !== undefined ||
            resolveFirstValue(payload, totalCountPaths) !== undefined ||
            resolveFirstValue(payload, totalAmountPaths) !== undefined)
      );

    const extractRankingRows = (payload) => {
      if (Array.isArray(payload)) {
        return payload;
      }

      for (const key of rankingRowContainers) {
        const container = payload?.[key];

        if (Array.isArray(container)) {
          return container;
        }

        if (container && typeof container === "object") {
          if (hasRankingShape(container)) {
            return [container];
          }

          for (const nestedKey of rankingRowContainers) {
            if (Array.isArray(container[nestedKey])) {
              return container[nestedKey];
            }

            if (container[nestedKey] && typeof container[nestedKey] === "object") {
              if (hasRankingShape(container[nestedKey])) {
                return [container[nestedKey]];
              }
            }
          }
        }
      }

      return hasRankingShape(payload) ? [payload] : [];
    };

    const mergePositiveRank = (currentValue, nextValue) => {
      const current = toPositiveInteger(currentValue);
      const next = toPositiveInteger(nextValue);

      if (!current) return next;
      if (!next) return current;

      return Math.min(current, next);
    };

    const createEmptyScopeRow = ({
      label = "",
      month = 0,
      day = 0,
      hour = 0,
      sortOrder = 0,
    } = {}) => ({
      label,
      rawLabel: "",
      month,
      day,
      hour,
      sortOrder,
      bankCode: userBankcode.value || "",
      bankName: userBankcode.value || "Member Bank",
      fromCount: 0,
      toCount: 0,
      totalCount: 0,
      fromAmount: 0,
      toAmount: 0,
      totalAmount: 0,
      rankFromCount: 0,
      rankToCount: 0,
      rankTotalCount: 0,
      rankFromAmount: 0,
      rankToAmount: 0,
      rankTotalAmount: 0,
    });

    const normalizeRankingEntry = (entry, index = 0) => {
      const bankCode = normalizeBankcode(resolveFirstValue(entry, rankingBankcodePaths));
      const rawDateValue = resolveFirstValue(entry, [
        ["date"],
        ["transactionDate"],
        ["createdAt"],
        ["timestamp"],
      ]);
      const parsedDateParts = parseEntryDateParts(rawDateValue);
      const rawLabel = String(resolveFirstValue(entry, labelPaths) || "").trim();
      const fromCount = resolveEntryMetric(entry, fromCountPaths);
      const toCount = resolveEntryMetric(entry, toCountPaths);
      const fromAmount = resolveEntryMetric(entry, fromAmountPaths);
      const toAmount = resolveEntryMetric(entry, toAmountPaths);
      const fallbackRank =
        toPositiveInteger(resolveFirstValue(entry, genericRankPaths)) ||
        toPositiveInteger(resolveFirstValue(entry, rankTotalCountPaths)) ||
        toPositiveInteger(resolveFirstValue(entry, rankTotalAmountPaths));

      return {
        bankCode,
        bankName: String(resolveFirstValue(entry, [["bankname"], ["bankName"], ["name"]]) || bankCode || "Member Bank").trim(),
        rawLabel,
        month:
          toPositiveInteger(resolveFirstValue(entry, monthNumberPaths)) || parsedDateParts.month,
        day: toPositiveInteger(resolveFirstValue(entry, dayNumberPaths)) || parsedDateParts.day,
        hour:
          toPositiveInteger(resolveFirstValue(entry, hourNumberPaths)) || parsedDateParts.hour,
        sortOrder: index + 1,
        fromCount,
        toCount,
        totalCount: resolveEntryMetric(entry, totalCountPaths, fromCount + toCount),
        fromAmount,
        toAmount,
        totalAmount: resolveEntryMetric(entry, totalAmountPaths, fromAmount + toAmount),
        rankFromCount: resolveEntryRank(entry, index, rankFromCountPaths, fallbackRank),
        rankToCount: resolveEntryRank(entry, index, rankToCountPaths, fallbackRank),
        rankTotalCount: resolveEntryRank(entry, index, rankTotalCountPaths, fallbackRank),
        rankFromAmount: resolveEntryRank(entry, index, rankFromAmountPaths, fallbackRank),
        rankToAmount: resolveEntryRank(entry, index, rankToAmountPaths, fallbackRank),
        rankTotalAmount: resolveEntryRank(entry, index, rankTotalAmountPaths, fallbackRank),
      };
    };

    const assignScopeRowLabel = (row, index = 0) => {
      if (row.hour > 0) {
        return `${String(row.hour).padStart(2, "0")}:00`;
      }

      if (row.rawLabel && row.rawLabel.length <= 32) {
        return row.rawLabel;
      }

      return index > 0 ? `Today ${index + 1}` : "Today";
    };

    const buildScopeSummary = (rows = []) =>
      rows.reduce(
        (summary, row) => ({
          totalCount: summary.totalCount + toSafeNumber(row?.totalCount),
          totalAmount: summary.totalAmount + toSafeNumber(row?.totalAmount),
        }),
        { totalCount: 0, totalAmount: 0 }
      );

    const mergeScopeRow = (baseRow, row) => ({
      ...baseRow,
      bankCode: row.bankCode || baseRow.bankCode,
      bankName: row.bankName || baseRow.bankName,
      rawLabel: row.rawLabel || baseRow.rawLabel,
      month: row.month || baseRow.month,
      day: row.day || baseRow.day,
      hour: row.hour || baseRow.hour,
      sortOrder: row.sortOrder || baseRow.sortOrder,
      fromCount: toSafeNumber(baseRow.fromCount) + toSafeNumber(row.fromCount),
      toCount: toSafeNumber(baseRow.toCount) + toSafeNumber(row.toCount),
      totalCount: toSafeNumber(baseRow.totalCount) + toSafeNumber(row.totalCount),
      fromAmount: toSafeNumber(baseRow.fromAmount) + toSafeNumber(row.fromAmount),
      toAmount: toSafeNumber(baseRow.toAmount) + toSafeNumber(row.toAmount),
      totalAmount: toSafeNumber(baseRow.totalAmount) + toSafeNumber(row.totalAmount),
      rankFromCount: mergePositiveRank(baseRow.rankFromCount, row.rankFromCount),
      rankToCount: mergePositiveRank(baseRow.rankToCount, row.rankToCount),
      rankTotalCount: mergePositiveRank(baseRow.rankTotalCount, row.rankTotalCount),
      rankFromAmount: mergePositiveRank(baseRow.rankFromAmount, row.rankFromAmount),
      rankToAmount: mergePositiveRank(baseRow.rankToAmount, row.rankToAmount),
      rankTotalAmount: mergePositiveRank(baseRow.rankTotalAmount, row.rankTotalAmount),
    });

    const buildScopeRowsFromNormalized = (rows = []) => {
      const normalizedRows = Array.isArray(rows) ? rows : [];

      if (normalizedRows.some((row) => row.hour > 0)) {
        const hourMap = new Map();

        normalizedRows.forEach((row, index) => {
          const key = row.hour || index + 1;
          const existing =
            hourMap.get(key) ||
            createEmptyScopeRow({
              label: `${String(row.hour || key).padStart(2, "0")}:00`,
              hour: row.hour || key,
              sortOrder: row.hour || key,
            });

          hourMap.set(key, mergeScopeRow(existing, row));
        });

        return Array.from(hourMap.values()).sort((left, right) => left.sortOrder - right.sortOrder);
      }

      if (!normalizedRows.length) {
        return [createEmptyScopeRow({ label: "Today", sortOrder: 1 })];
      }

      return normalizedRows
        .map((row, index) => ({
          ...row,
          label: assignScopeRowLabel(row, index),
          sortOrder: row.hour || index + 1,
        }))
        .sort((left, right) => left.sortOrder - right.sortOrder);
    };

    const buildRankingScopeData = (payload, context = {}) => {
      const normalizedBankcode = normalizeBankcode(context.bankcode || userBankcode.value);
      const sourceRows = extractRankingRows(payload)
        .map((entry, index) => normalizeRankingEntry(entry, index))
        .map((row) => ({
          ...row,
          bankCode: row.bankCode || normalizedBankcode,
          bankName: row.bankName || normalizedBankcode || "Member Bank",
        }))
        .filter((row) => !normalizedBankcode || row.bankCode === normalizedBankcode);
      const rows = buildScopeRowsFromNormalized(sourceRows);

      return {
        rows,
        sourceRows,
        summary: buildScopeSummary(rows),
      };
    };
    const extractTransferTodaySummary = (scopeData) => ({
      totalCount: toSafeNumber(scopeData?.summary?.totalCount),
      totalAmount: toSafeNumber(scopeData?.summary?.totalAmount),
    });

    const normalizeTransferTodaySummary = (summary = {}) => ({
      totalCount: Math.max(0, toSafeNumber(summary?.totalCount)),
      totalAmount: Math.max(0, toSafeNumber(summary?.totalAmount)),
    });

    const buildTransferTodaySnapshot = (scopeData = {}) => {
      const now = new Date();
      const summary = normalizeTransferTodaySummary(extractTransferTodaySummary(scopeData));
      const rows = Array.isArray(scopeData?.rows) ? scopeData.rows : [];
      const mergedRow = rows.reduce(
        (accumulator, row) => mergeScopeRow(accumulator, row),
        createEmptyScopeRow({
          label: monthLabels[now.getMonth()],
          month: now.getMonth() + 1,
          day: now.getDate(),
          sortOrder: now.getMonth() + 1,
        })
      );

      return {
        summary,
        row: {
          ...mergedRow,
          label: monthLabels[now.getMonth()],
          month: now.getMonth() + 1,
          day: now.getDate(),
          sortOrder: now.getMonth() + 1,
          totalCount: summary.totalCount,
          totalAmount: summary.totalAmount,
        },
      };
    };

    const applyLmpsTodayCardSnapshot = (snapshot = null) => {
      lmpsTotalCount.value = Math.max(0, Math.round(toSafeNumber(snapshot?.summary?.totalCount)));
      lmpsTotalAmount.value = Math.max(0, toSafeNumber(snapshot?.summary?.totalAmount));
      lmpsTotalCountRank.value = toPositiveInteger(snapshot?.row?.rankTotalCount);
      lmpsTotalAmountRank.value = toPositiveInteger(snapshot?.row?.rankTotalAmount);
    };

    const pickTodayBankcodeRecord = (payload, bankcode) => {
      const normalizedBankcode = String(bankcode || "").toUpperCase().trim();
      const candidates = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.results)
        ? payload.results
        : payload && typeof payload === "object"
        ? [payload]
        : [];

      if (!candidates.length) return null;

      const match = candidates.find(
        (entry) =>
          String(entry?.bankcode || entry?.bankCode || "").toUpperCase().trim() ===
          normalizedBankcode
      );

      return match || candidates[0];
    };

    const fetchLiveTransferTodaySnapshot = async (forceRefresh = true) => {
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) return null;

        const cacheKey = buildCacheKey("lmps-today-cards", bankcode);
        const snapshot = await fetchWithCache({
          key: cacheKey,
          ttlMs: rankingTodayTtlMs,
          forceRefresh,
          requestFn: async () => {
            const abort = createSoftAbortSignal();

            try {
              const response = await axios.post(
                `${apiBase2}/transfer/ranked-bankcodes-today`,
                { bankcode },
                {
                  ...getAuthConfig(),
                  signal: abort.signal,
                }
              );

              const record = pickTodayBankcodeRecord(response.data, bankcode);
              if (!record) return null;

              return {
                summary: {
                  totalCount: toSafeNumber(record.totalCount),
                  totalAmount: toSafeNumber(record.totalAmount),
                },
                row: {
                  rankTotalCount: toPositiveInteger(record.rankTotalCount),
                  rankTotalAmount: toPositiveInteger(record.rankTotalAmount),
                },
              };
            } finally {
              abort.cancel();
            }
          },
        });

        return snapshot;
      } catch (error) {
        if (!isCanceledRequest(error)) {
          console.error("Error fetching live transfer today snapshot:", error);
        }
        return null;
      }
    };

    const loadLmpsTodayCards = async ({ showLoading = false, forceRefresh = true } = {}) => {
      if (showLoading) {
        lmpsTodayCardsLoading.value = true;
      }

      try {
        const snapshot = await fetchLiveTransferTodaySnapshot(forceRefresh);
        if (snapshot) {
          applyLmpsTodayCardSnapshot(snapshot);
        }
      } finally {
        if (showLoading) {
          lmpsTodayCardsLoading.value = false;
        }
      }
    };

    const animateChartCards = () => {
      gsap.fromTo(
        ".gsap-chart-card",
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        }
      );
    };

    const renderDailyLineChart = (categories = [], series = []) => {
      if (!dailyLineChartRef.value) return;

      if (!dailyLineChart) {
        dailyLineChart = echarts.init(dailyLineChartRef.value);
      }

      dailyLineChart.setOption(
        {
          color: ["#2563EB", "#10B981"],
          animationDuration: 800,
          animationEasing: "cubicOut",
          grid: {
            top: 32,
            left: 24,
            right: 24,
            bottom: 24,
            containLabel: true,
          },
          legend: {
            top: 0,
            right: 0,
            itemWidth: 12,
            itemHeight: 12,
            textStyle: {
              color: "#64748B",
              fontWeight: 600,
            },
          },
          tooltip: {
            trigger: "axis",
            confine: true,
            backgroundColor: "rgba(15, 23, 42, 0.96)",
            borderWidth: 0,
            textStyle: { color: "#fff" },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: categories,
            axisLine: {
              lineStyle: { color: "#CBD5E1" },
            },
            axisTick: { show: false },
            axisLabel: {
              color: "#64748B",
            },
          },
          yAxis: {
            type: "value",
            splitLine: {
              lineStyle: { color: "rgba(148, 163, 184, 0.18)" },
            },
            axisLabel: {
              color: "#64748B",
              formatter: (value) => formatCompact(value),
            },
          },
          series: series.map((item, index) => ({
            name: item.name,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 7,
            showSymbol: false,
            emphasis: {
              focus: "series",
              scale: true,
            },
            lineStyle: {
              width: 3,
            },
            areaStyle: {
              opacity: 0.08,
            },
            data: Array.isArray(item.data) ? item.data : [],
            itemStyle: {
              color: index === 0 ? "#2563EB" : "#10B981",
            },
          })),
        },
        true
      );
    };

    const resizeCharts = () => {
      dailyLineChart?.resize();
    };

    const destroyCharts = () => {
      window.removeEventListener("resize", resizeCharts);
      dailyLineChart?.dispose();
      dailyLineChart = null;
    };

    const fetchDailyCounts = async () => {
      chartLoading.value = true;
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) return;

        const now = new Date();
        const monthScope = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const cacheKey = buildCacheKey("daily-counts", `${bankcode}:${monthScope}`);
        const cached = getCachedData(cacheKey, dailyCountsTtlMs);

        if (cached.data?.categories && cached.data?.series) {
          pageViewSeries.value = cached.data.series;
          pageViewOptions.value = {
            ...pageViewOptions.value,
            xaxis: { ...pageViewOptions.value.xaxis, categories: cached.data.categories },
          };
          renderDailyLineChart(cached.data.categories, cached.data.series);
          chartLoading.value = false;
        }

        const chartData = await fetchWithCache({
          key: cacheKey,
          ttlMs: dailyCountsTtlMs,
          forceRefresh: !cached.isFresh,
          requestFn: async () => {
            const abort = createSoftAbortSignal();
            let inquiryRes;
            let transferRes;

            try {
              [inquiryRes, transferRes] = await Promise.all([
                axios.get(`${apiBase2}/inquiry/daily-count`, {
                  ...getAuthConfig(),
                  signal: abort.signal,
                  params: { bankcode },
                }),
                axios.get(`${apiBase2}/transfer/daily-count`, {
                  ...getAuthConfig(),
                  signal: abort.signal,
                  params: { bankcode },
                }),
              ]);
            } finally {
              abort.cancel();
            }

            const daysInMonth = new Date(
              now.getFullYear(),
              now.getMonth() + 1,
              0
            ).getDate();

            const categories = Array.from({ length: daysInMonth }, (_, i) => i + 1);
            const inquiryRows = Array.isArray(inquiryRes.data) ? inquiryRes.data : [];
            const transferRows = Array.isArray(transferRes.data) ? transferRes.data : [];

            const inquiryCounts = categories.map(
              (day) => inquiryRows.find((x) => Number(x.day) === day)?.count || 0
            );

            const transferCounts = categories.map(
              (day) => transferRows.find((x) => Number(x.day) === day)?.count || 0
            );

            return {
              categories,
              series: [
                { name: "Inquiry", data: inquiryCounts },
                { name: "Transfer", data: transferCounts },
              ],
            };
          },
        });

        pageViewSeries.value = chartData.series;
        pageViewOptions.value = {
          ...pageViewOptions.value,
          xaxis: { ...pageViewOptions.value.xaxis, categories: chartData.categories },
        };
        renderDailyLineChart(chartData.categories, chartData.series);
      } catch (error) {
        if (!isCanceledRequest(error)) {
          console.error("Error fetching daily counts:", error);
        }
      } finally {
        chartLoading.value = false;
      }
    };

    const fetchTotalMembers = async () => {
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) throw new Error("No bankcode found");

        const res = await axios.post(
          `${apiBase1}/records/countByBankCode`,
          { bankcode },
          getAuthConfig()
        );

        totalMembers.value = Number(res.data?.count) || 0;
      } catch (error) {
        console.error(error);
        totalMembers.value = 0;
      }
    };

    const fetchTotalMerchantInactive = async () => {
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) return;

        const res = await axios.post(
          `${apiBase1}/records/countInactiveByBankCode`,
          { bankcode },
          getAuthConfig()
        );

        totalMerchantInactive.value = Number(res.data?.inactiveCount) || 0;
      } catch (error) {
        console.error(error);
        totalMerchantInactive.value = 0;
      }
    };

    const fetchMemberMerchants = async () => {
      try {
        const bankcode = userBankcode.value;
        if (!bankcode) {
          sessionsSeries.value = [];
          sessionsOptions.value = {
            ...sessionsOptions.value,
            labels: [],
            colors: [],
          };
          return;
        }

        const cacheKey = buildCacheKey("member-merchants", bankcode);
        const cached = getCachedData(cacheKey, memberMerchantTtlMs);
        const applyRows = (rows = []) => {
          const filteredRows = rows.filter(
            (item) => String(item.bankcode || "").toUpperCase() === bankcode
          );

          const labels = filteredRows.length
            ? filteredRows.map((item) => item.bankcode || bankcode)
            : [bankcode];

          const series = filteredRows.length
            ? filteredRows.map((item) => Number(item.count) || 0)
            : [0];

          const bankColors = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];
          const colors = labels.map((_, i) => bankColors[i % bankColors.length]);

          sessionsSeries.value = series;
          sessionsOptions.value = { ...sessionsOptions.value, labels, colors };
        };

        if (Array.isArray(cached.data)) {
          applyRows(cached.data);
        }

        const rows = await fetchWithCache({
          key: cacheKey,
          ttlMs: memberMerchantTtlMs,
          forceRefresh: !cached.isFresh,
          requestFn: async () => {
            const res = await axios.get(
              `${apiBase1}/records/count-member-merchants`,
              getAuthConfig()
            );
            return Array.isArray(res.data) ? res.data : [];
          },
        });

        applyRows(rows);
      } catch (error) {
        console.error(error);
        sessionsSeries.value = [];
        sessionsOptions.value = {
          ...sessionsOptions.value,
          labels: [],
          colors: [],
        };
      }
    };

    const sessionsSeries = ref([]);
    const sessionsOptions = ref({
      chart: { type: "donut" },
      labels: [],
      colors: [],
      legend: { position: "bottom" },
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => opts.w.config.series[opts.seriesIndex],
        style: { fontSize: "14px" },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} merchants`,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 320 },
            legend: { position: "bottom" },
          },
        },
      ],
    });

    const monthlyOverviewSeries = ref([
      {
        name: "Total Count",
        data: [12400, 15800, 14200, 18900, 21500, 19800, 23100, 24800, 22300, 26500, 28700, 31200],
      },
      {
        name: "Total Amount",
        data: [4200000, 5100000, 4800000, 6300000, 7200000, 6800000, 8100000, 8700000, 7900000, 9400000, 10200000, 11500000],
      },
    ]);

    const monthlyOverviewOptions = ref({
      chart: {
        type: "bar",
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: "inherit",
      },
      colors: ["#2563EB", "#F59E0B"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 6,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      grid: { borderColor: "rgba(148, 163, 184, 0.18)", strokeDashArray: 4 },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        labels: { style: { colors: "#64748B", fontWeight: 600 } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: [
        {
          seriesName: "Total Count",
          title: { text: "Total Count", style: { color: "#64748B" } },
          labels: {
            style: { colors: "#64748B" },
            formatter: (val) => formatCompact(val),
          },
        },
        {
          opposite: true,
          seriesName: "Total Amount",
          title: { text: "Total Amount", style: { color: "#64748B" } },
          labels: {
            style: { colors: "#64748B" },
            formatter: (val) => formatCompact(val),
          },
        },
      ],
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontWeight: 600,
        labels: { colors: "#64748B" },
        markers: { width: 12, height: 12, radius: 6 },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val, { seriesIndex }) =>
            seriesIndex === 1 ? formatAmount(val) : formatCount(val),
        },
      },
    });

    const pageViewSeries = ref([
      { name: "Inquiry", data: [] },
      { name: "Transfer", data: [] },
    ]);

    const pageViewOptions = ref({
      chart: {
        id: "pageview-chart",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 4,
        },
      },
      xaxis: {
        categories: [],
        labels: { rotate: -45 },
      },
      tooltip: { enabled: true },
    });

    onMounted(async () => {
      await nextTick();

      fetchTotalMembers();
      fetchTotalMerchantInactive();
      fetchMemberMerchants();
      fetchDailyCounts();
      const lmpsTodayCardsPromise = loadLmpsTodayCards({
        showLoading: true,
        forceRefresh: false,
      });
      await lmpsTodayCardsPromise;

      animateChartCards();
      window.addEventListener("resize", resizeCharts);
    });

    onBeforeUnmount(() => {
      destroyCharts();
    });

    return {
      userRole,
      userBankcode,
      totalMembers,
      totalMerchantInactive,
      lmpsTotalCount,
      lmpsTotalAmount,
      lmpsTotalCountRank,
      lmpsTotalAmountRank,
      lmpsTodayCardsLoading,
      dailyLineChartRef,
      pageViewOptions,
      pageViewSeries,
      sessionsOptions,
      sessionsSeries,
      monthlyOverviewOptions,
      monthlyOverviewSeries,
      chartLoading,
      monthLabels,
      formatCount,
      formatAmount,
      formatRank,
    };
  },
};
</script>
