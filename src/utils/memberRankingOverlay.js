import axios from "axios";

export const AUTH_USER_PROFILE_STORAGE_KEY = "merchant-portal:auth-user-profile";
export const MEMBER_RANKING_OVERLAY_PENDING_KEY =
  "merchant-portal:member-ranking-overlay-pending";
export const TRANSACTION_TODAY_RANKING_CARD_CACHE_PREFIX =
  "merchant-transaction-dashboard-v1:today-ranking-cards";

const BANKCODE_PATHS = [
  ["bankcode"],
  ["bankCode"],
  ["memberBankCode"],
  ["member_bank_code"],
  ["member", "bankcode"],
  ["member", "bankCode"],
  ["member", "memberBankCode"],
  ["member", "member_bank_code"],
  ["bank", "bankcode"],
  ["bank", "bankCode"],
  ["profile", "bankcode"],
  ["profile", "bankCode"],
  ["user", "bankcode"],
  ["user", "bankCode"],
  ["memberInfo", "bankcode"],
  ["memberInfo", "bankCode"],
];

const RANKING_ROW_CONTAINERS = [
  "data",
  "results",
  "items",
  "rows",
  "rankings",
  "list",
  "payload",
];

const safeParseJson = (value) => {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("Failed to parse member ranking overlay storage:", error);
    return null;
  }
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

const toSafeNumber = (value) => {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : 0;
};

const resolveEntryRank = (entry, index, paths, fallback) => {
  const value = resolveFirstValue(entry, paths);
  const normalized = toSafeNumber(value);

  if (normalized > 0) {
    return Math.floor(normalized);
  }

  if (fallback && fallback > 0) {
    return Math.floor(fallback);
  }

  return index + 1;
};

const resolveEntryMetric = (entry, paths, fallback = 0) => {
  const value = resolveFirstValue(entry, paths);
  return value === undefined ? fallback : toSafeNumber(value);
};

const resolveEntryBankcode = (entry) =>
  normalizeBankcode(
    resolveFirstValue(entry, [
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
    ])
  );

const resolveEntryBankName = (entry, fallbackBankcode) =>
  String(
    resolveFirstValue(entry, [
      ["bankname"],
      ["bankName"],
      ["memberBankName"],
      ["member_bank_name"],
      ["name"],
      ["member", "bankname"],
      ["member", "bankName"],
      ["memberInfo", "bankname"],
      ["memberInfo", "bankName"],
    ]) ||
      fallbackBankcode ||
      "Member Bank"
  ).trim();

export const normalizeRole = (value) => String(value || "").trim().toLowerCase();

export const readStoredAuthUserProfile = () => {
  if (typeof window === "undefined") return null;

  return safeParseJson(localStorage.getItem(AUTH_USER_PROFILE_STORAGE_KEY));
};

export const writeStoredAuthUserProfile = (profile) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(AUTH_USER_PROFILE_STORAGE_KEY, JSON.stringify(profile || {}));
  } catch (error) {
    console.error("Failed to persist auth user profile:", error);
  }
};

export const clearStoredAuthUserProfile = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_USER_PROFILE_STORAGE_KEY);
};

export const resolveStoredUserBankcode = (source = readStoredAuthUserProfile()) => {
  const candidates = BANKCODE_PATHS.map((path) => readPath(source, path));

  if (typeof window !== "undefined") {
    candidates.push(localStorage.getItem("bankcode"));
  }

  for (const candidate of candidates) {
    const normalized = normalizeBankcode(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return "";
};

export const queueMemberRankingOverlay = (payload = {}) => {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(
      MEMBER_RANKING_OVERLAY_PENDING_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        ...payload,
      })
    );
  } catch (error) {
    console.error("Failed to queue member ranking overlay:", error);
  }
};

export const readQueuedMemberRankingOverlay = () => {
  if (typeof window === "undefined") return null;

  return safeParseJson(sessionStorage.getItem(MEMBER_RANKING_OVERLAY_PENDING_KEY));
};

export const clearQueuedMemberRankingOverlay = () => {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(MEMBER_RANKING_OVERLAY_PENDING_KEY);
};

export const getMemberRankingTodayEndpoint = (apiUrl = "/api") =>
  `${apiUrl}/transfer/ranked-bankcodes-today`;

export const buildTransactionTodayRankingCardCacheKey = (bankCode = "") =>
  `${TRANSACTION_TODAY_RANKING_CARD_CACHE_PREFIX}:${normalizeBankcode(bankCode)}`;

export const writeTransactionTodayRankingCardCache = (bankCode, overlayState) => {
  if (typeof window === "undefined") return;

  const normalizedBankCode = normalizeBankcode(bankCode);
  if (!normalizedBankCode) return;

  try {
    localStorage.setItem(
      buildTransactionTodayRankingCardCacheKey(normalizedBankCode),
      JSON.stringify({
        timestamp: Date.now(),
        data: overlayState || null,
      })
    );
  } catch (error) {
    console.error("Failed to cache transaction ranking card state:", error);
  }
};

export const createEmptyMemberRankingOverlayData = (bankCode = "") => ({
  bankCode,
  bankName: bankCode || "Member Bank",
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

export const normalizeRankingRows = (payload) => {
  if (Array.isArray(payload)) return payload;

  for (const key of RANKING_ROW_CONTAINERS) {
    const container = payload?.[key];

    if (Array.isArray(container)) {
      return container;
    }

    if (container && typeof container === "object") {
      for (const nestedKey of RANKING_ROW_CONTAINERS) {
        if (Array.isArray(container[nestedKey])) {
          return container[nestedKey];
        }
      }
    }
  }

  return [];
};

export const normalizeMemberRankingEntry = (entry, index = 0) => {
  const bankCode = resolveEntryBankcode(entry);
  const fromCount = resolveEntryMetric(entry, [
    ["fromCount"],
    ["from_count"],
    ["sentCount"],
    ["sendCount"],
    ["outCount"],
    ["debitCount"],
  ]);
  const toCount = resolveEntryMetric(entry, [
    ["toCount"],
    ["to_count"],
    ["receivedCount"],
    ["receiveCount"],
    ["inCount"],
    ["creditCount"],
  ]);
  const fromAmount = resolveEntryMetric(entry, [
    ["fromAmount"],
    ["from_amount"],
    ["sentAmount"],
    ["sendAmount"],
    ["outAmount"],
    ["debitAmount"],
  ]);
  const toAmount = resolveEntryMetric(entry, [
    ["toAmount"],
    ["to_amount"],
    ["receivedAmount"],
    ["receiveAmount"],
    ["inAmount"],
    ["creditAmount"],
  ]);
  const fallbackRank = resolveEntryRank(
    entry,
    index,
    [
      ["rank"],
      ["ranking"],
      ["position"],
      ["order"],
      ["place"],
      ["rankTotalAmount"],
      ["rank_total_amount"],
      ["totalAmountRank"],
      ["rankTotalCount"],
      ["rank_total_count"],
      ["totalCountRank"],
    ],
    index + 1
  );

  return {
    bankCode,
    bankName: resolveEntryBankName(entry, bankCode),
    fromCount,
    toCount,
    totalCount: resolveEntryMetric(
      entry,
      [
        ["totalCount"],
        ["total_count"],
        ["count"],
        ["todayCount"],
        ["transactionCount"],
        ["transferCount"],
      ],
      fromCount + toCount
    ),
    fromAmount,
    toAmount,
    totalAmount: resolveEntryMetric(
      entry,
      [
        ["totalAmount"],
        ["total_amount"],
        ["amount"],
        ["todayAmount"],
        ["transactionAmount"],
        ["transferAmount"],
      ],
      fromAmount + toAmount
    ),
    rankFromCount: resolveEntryRank(
      entry,
      index,
      [["rankFromCount"], ["rank_from_count"], ["fromCountRank"], ["sentCountRank"]],
      fallbackRank
    ),
    rankToCount: resolveEntryRank(
      entry,
      index,
      [["rankToCount"], ["rank_to_count"], ["toCountRank"], ["receivedCountRank"]],
      fallbackRank
    ),
    rankTotalCount: resolveEntryRank(
      entry,
      index,
      [["rankTotalCount"], ["rank_total_count"], ["totalCountRank"], ["countRank"]],
      fallbackRank
    ),
    rankFromAmount: resolveEntryRank(
      entry,
      index,
      [["rankFromAmount"], ["rank_from_amount"], ["fromAmountRank"], ["sentAmountRank"]],
      fallbackRank
    ),
    rankToAmount: resolveEntryRank(
      entry,
      index,
      [["rankToAmount"], ["rank_to_amount"], ["toAmountRank"], ["receivedAmountRank"]],
      fallbackRank
    ),
    rankTotalAmount: resolveEntryRank(
      entry,
      index,
      [["rankTotalAmount"], ["rank_total_amount"], ["totalAmountRank"], ["amountRank"]],
      fallbackRank
    ),
  };
};

export const buildMemberRankingOverlayState = ({
  viewState = "idle",
  overlayData = createEmptyMemberRankingOverlayData(),
  statusMessage = "",
} = {}) => ({
  viewState,
  overlayData,
  statusMessage,
});

export const fetchMemberRankingOverlayState = async ({
  apiUrl = "/api",
  token = "",
  authProfile = null,
  timeoutMs = 5000,
} = {}) => {
  const bankCode = resolveStoredUserBankcode(authProfile);
  const emptyState = createEmptyMemberRankingOverlayData(bankCode);

  if (!bankCode) {
    return buildMemberRankingOverlayState({
      viewState: "error",
      overlayData: emptyState,
      statusMessage: "No member bank code was found in this account profile.",
    });
  }

  try {
    const response = await axios.get(getMemberRankingTodayEndpoint(apiUrl), {
      timeout: timeoutMs,
      ...(token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}),
    });

    const rows = normalizeRankingRows(response.data).map((entry, index) =>
      normalizeMemberRankingEntry(entry, index)
    );

    if (!rows.length) {
      return buildMemberRankingOverlayState({
        viewState: "empty",
        overlayData: emptyState,
        statusMessage: "No ranking data was returned for today.",
      });
    }

    const matchedEntry = rows.find((entry) => entry.bankCode === bankCode);

    if (!matchedEntry) {
      return buildMemberRankingOverlayState({
        viewState: "empty",
        overlayData: emptyState,
        statusMessage: "Your member bank was not found in today's ranking list.",
      });
    }

    return buildMemberRankingOverlayState({
      viewState: "ready",
      overlayData: matchedEntry,
      statusMessage: "",
    });
  } catch (error) {
    const timedOut =
      error?.code === "ECONNABORTED" ||
      String(error?.message || "").toLowerCase().includes("timeout");

    return buildMemberRankingOverlayState({
      viewState: "error",
      overlayData: emptyState,
      statusMessage:
        timedOut
          ? "Loading the ranking took too long. Please try again shortly."
          : error.response?.data?.message || "Unable to load the ranking overlay right now.",
    });
  }
};
