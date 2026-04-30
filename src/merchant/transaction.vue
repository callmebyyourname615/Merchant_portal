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

    <div class="relative grid grid-cols-1 gap-5 px-4 mt-6 lg:grid-cols-4 sm:px-8">
      <div class="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/60 gsap-chart-card sm:px-6 sm:py-6 lg:col-span-4">
        <div class="pointer-events-none absolute right-12 top-0 h-36 w-36 rounded-full bg-sky-100/70 blur-3xl"></div>

        <div class="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              {{ activeRankingScopeLabel }}
            </p>
            <h3 class="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Total Transaction Count & Total Amount
            </h3>
            <p class="mt-2 text-sm text-slate-500">
              {{ activeRankingScopeCaption }}
            </p>
          </div>

          <div class="flex flex-col items-start gap-3 lg:items-end">
            <div class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">
              <span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              <span>{{ currentYearRangeLabel }}</span>
              <span class="text-slate-300">|</span>
              <span>{{ currentYear }}</span>
            </div>
          </div>
        </div>

        <div class="relative mt-5 h-[320px] w-full overflow-hidden rounded-[22px] border border-slate-200/70 bg-slate-50/80 p-2">
          <div
            ref="monthlyBarChartRef"
            class="h-full w-full transition-opacity duration-300"
            :class="monthlyChartInitialized ? 'opacity-100' : 'opacity-0 pointer-events-none'"
          ></div>
          <div
            v-if="monthlyChartLoading && !monthlyChartInitialized"
            class="absolute inset-0 z-10 bg-white/90 p-5 backdrop-blur-sm sm:p-6"
          >
            <div class="flex h-full flex-col">
              <div class="flex items-center justify-between gap-4">
                <div class="space-y-2">
                  <div class="yearly-overview-shimmer h-3 w-40 rounded-full"></div>
                  <div class="yearly-overview-shimmer h-3 w-28 rounded-full"></div>
                </div>
                <div class="yearly-overview-shimmer h-8 w-28 rounded-full"></div>
              </div>
              <div
                class="mt-6 grid flex-1 items-end gap-2 sm:gap-3"
                :style="{ gridTemplateColumns: `repeat(${getYearScopeMonthLimit()}, minmax(0, 1fr))` }"
              >
                <div
                  v-for="(height, index) in yearlyOverviewSkeletonBars.slice(0, getYearScopeMonthLimit())"
                  :key="`yearly-overview-skeleton-${index}`"
                  class="yearly-overview-shimmer rounded-t-xl"
                  :style="{ height: `${height}%` }"
                ></div>
              </div>
              <div
                class="mt-5 grid gap-3"
                :style="{ gridTemplateColumns: `repeat(${getYearScopeMonthLimit()}, minmax(0, 1fr))` }"
              >
                <div
                  v-for="month in getYearScopeMonthLimit()"
                  :key="`yearly-overview-label-${month}`"
                  class="yearly-overview-shimmer h-2 rounded-full"
                ></div>
              </div>
            </div>
          </div>
          <div
            v-if="yearlyOverviewHasLoadingMonths"
            class="pointer-events-none absolute inset-0 z-10 p-2"
          >
            <div class="relative h-full w-full">
              <div
                class="absolute bottom-[44px] left-[52px] right-[52px] top-[64px] grid items-end gap-2 sm:gap-3"
                :style="{ gridTemplateColumns: `repeat(${getYearScopeMonthLimit()}, minmax(0, 1fr))` }"
              >
                <div
                  v-for="month in getYearScopeMonthLimit()"
                  :key="`yearly-overview-month-loading-bar-${month}`"
                  class="relative h-full"
                >
                  <div
                    v-if="isYearlyOverviewMonthLoading(month)"
                    class="yearly-overview-shimmer absolute inset-x-[18%] bottom-0 rounded-t-xl opacity-95 shadow-[0_10px_24px_rgba(148,163,184,0.18)]"
                    :style="{ height: `${yearlyOverviewSkeletonBars[(month - 1) % yearlyOverviewSkeletonBars.length]}%` }"
                  ></div>
                </div>
              </div>
              <div
                class="absolute bottom-[24px] left-[52px] right-[52px] grid gap-2 sm:gap-3"
                :style="{ gridTemplateColumns: `repeat(${getYearScopeMonthLimit()}, minmax(0, 1fr))` }"
              >
                <div
                  v-for="month in getYearScopeMonthLimit()"
                  :key="`yearly-overview-month-loading-label-${month}`"
                  class="flex justify-center"
                >
                  <div
                    v-if="isYearlyOverviewMonthLoading(month)"
                    class="yearly-overview-shimmer h-1.5 w-8 rounded-full opacity-90"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else-if="!monthlyChartInitialized && monthlyChartError"
            class="absolute inset-0 z-10 flex items-center justify-center bg-white/85 px-6 text-center text-sm font-medium text-slate-500 backdrop-blur-sm"
          >
            {{ monthlyChartError }}
          </div>
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
import { ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from "vue";
import axios from "axios";
import * as echarts from "echarts";
import { gsap } from "gsap";
import { buildApiUrl } from "@/config/api";
import { useYearlyTransferRanking } from "@/composables/useYearlyTransferRanking";

export default {
  components: {
    apexchart: VueApexCharts,
  },

  setup() {
    const transferLoading = ref(true);
    const chartLoading = ref(true);
    const monthlyChartLoading = ref(false);
    const monthlyChartInitialized = ref(false);
    const monthlyChartError = ref("");
    const activeRankingScope = ref("year");
    const selectedRankingMonth = ref(new Date().getMonth() + 1);
    const totalMembers = ref(0);
    const totalInquiryTransaction = ref(0);
    const totalMerchantInactive = ref(0);
    const totalTransferTransaction = ref(0);
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
    const apiBase2Root = apiBase2.replace(/\/api$/, "");
    const dailyLineChartRef = ref(null);
    const monthlyBarChartRef = ref(null);
    const currentYear = ref(new Date().getFullYear());
    const cachePrefix = "merchant-transaction-dashboard-v1";
    const yearlyRankingTtlMs = 60 * 60 * 1000;
    const monthlyScopeTtlMs = 30 * 60 * 1000;
    const rankingTodayTtlMs = 5 * 60 * 1000;
    const dailyCountsTtlMs = 10 * 60 * 1000;
    const memberMerchantTtlMs = 30 * 60 * 1000;
    const softAbortMs = 15000;
    const yearlyRankingRequestTimeoutMs = 8 * 60 * 1000;

    let dailyLineChart = null;
    let monthlyBarChart = null;
    let monthlyChartTween = null;
    let monthlyRealtimeTimer = null;
    let monthlyChartRequestId = 0;
    let yearlyOverviewLoadRequestId = 0;
    let yearlyOverviewSummaryRequestId = 0;
    let monthlyChartRows = [];
    let monthlyChartHoverIndex = null;
    let lastTransferTodaySnapshot = null;
    let monthlyChartContext = {
      period: activeRankingScope.value,
      month: selectedRankingMonth.value,
    };
    let monthlyLegendSelected = {
      "Total Count": true,
      "Total Amount": true,
    };
    const monthlyLegendItems = [
      {
        name: "Total Count",
        icon: "roundRect",
        itemStyle: {
          color: "#2563EB",
          borderRadius: 4,
        },
      },
      {
        name: "Total Amount",
        icon: "roundRect",
        itemStyle: {
          color: "#F59E0B",
          borderRadius: 4,
        },
      },
    ];
    const inMemoryCache = new Map();
    const pendingRequests = new Map();
    const yearlyRankingScopeCache = Object.create(null);

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
    const monthLabelLookup = monthLabels.reduce((lookup, label, index) => {
      const normalizedLabel = String(label || "").toLowerCase();
      lookup[normalizedLabel] = index + 1;
      return lookup;
    }, {
      january: 1,
      february: 2,
      march: 3,
      april: 4,
      may: 5,
      june: 6,
      july: 7,
      august: 8,
      september: 9,
      october: 10,
      november: 11,
      december: 12,
    });
    const getCurrentDisplayMonthNumber = () => new Date().getMonth() + 1;
    const getYearScopeMonthLimit = () => Math.max(1, Math.min(12, getCurrentDisplayMonthNumber()));
    const buildYearScopeBaseRows = () =>
      Array.from({ length: getYearScopeMonthLimit() }, (_, index) =>
        createEmptyScopeRow({
          label: monthLabels[index],
          month: index + 1,
          sortOrder: index + 1,
        })
      );
    const rankingScopeOptions = [
      { key: "today", label: "Today" },
      { key: "month", label: "Month" },
      { key: "year", label: "Year" },
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

    const fetchWithCache = async ({ key, ttlMs, requestFn, forceRefresh = false }) => {
      const cached = getCachedData(key, ttlMs);
      if (!forceRefresh && cached.isFresh) {
        return cached.data;
      }

      if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
      }

      const request = requestFn()
        .then((data) => writeCacheEntry(key, data))
        .finally(() => {
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

    const resolveSelectedRankingYear = () =>
      Math.floor(toSafeNumber(currentYear.value)) || new Date().getFullYear();

    const resolveSelectedRankingMonth = () => {
      const month = Math.floor(toSafeNumber(selectedRankingMonth.value));
      return month >= 1 && month <= 12 ? month : new Date().getMonth() + 1;
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

    const getYearlyRankingScopeCacheKey = ({
      year = resolveSelectedRankingYear(),
      bankcode = userBankcode.value,
    } = {}) =>
      `${Math.floor(toSafeNumber(year)) || new Date().getFullYear()}:${
        normalizeBankcode(bankcode) || "unknown"
      }`;

    const getCachedYearlyRankingScope = (options = {}) => {
      const cacheKey = getYearlyRankingScopeCacheKey(options);
      return Object.prototype.hasOwnProperty.call(yearlyRankingScopeCache, cacheKey)
        ? yearlyRankingScopeCache[cacheKey]
        : null;
    };

    const setCachedYearlyRankingScope = (scopeData, options = {}) => {
      const cacheKey = getYearlyRankingScopeCacheKey(options);
      yearlyRankingScopeCache[cacheKey] = scopeData;
      return scopeData;
    };

    const inferMonthNumber = (value) => {
      const rawValue = String(value || "").trim();
      if (!rawValue) return 0;

      const normalizedValue = rawValue.toLowerCase();

      for (const [label, monthNumber] of Object.entries(monthLabelLookup)) {
        if (normalizedValue.includes(label)) {
          return monthNumber;
        }
      }

      const parsedDate = new Date(rawValue);
      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate.getMonth() + 1;
      }

      const yearMonthMatch =
        rawValue.match(/\b\d{4}[-/](0?[1-9]|1[0-2])(?:[-/]\d{1,2})?\b/) ||
        rawValue.match(/\b(0?[1-9]|1[0-2])[-/]\d{4}\b/);

      if (yearMonthMatch) {
        const candidates = yearMonthMatch[0].match(/\d+/g) || [];
        const inferredMonth = candidates.find((candidate) => {
          const normalizedMonth = Number(candidate);
          return normalizedMonth >= 1 && normalizedMonth <= 12;
        });

        return inferredMonth ? Number(inferredMonth) : 0;
      }

      return 0;
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

    const activeRankingScopeLabel = computed(() => {
      if (activeRankingScope.value === "year") return "Yearly Overview";
      if (activeRankingScope.value === "month") return "Monthly Overview";
      return "Today Overview";
    });

    const currentYearRangeLabel = computed(
      () => `Jan - ${monthLabels[getYearScopeMonthLimit() - 1]}`
    );

    const activeRankingScopeCaption = computed(() => {
      const bankcode = userBankcode.value || "No bankcode";
      return `${bankcode} · ${currentYearRangeLabel.value} ${currentYear.value}`;
    });

    const monthlyChartLoadingLabel = computed(
      () => `Preparing ${currentYearRangeLabel.value} transfer ranking chart`
    );

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

    const buildFallbackScopeLabel = (context = monthlyChartContext) => {
      if (context.period === "year") {
        return String(currentYear.value);
      }

      if (context.period === "month") {
        return monthLabels[(context.month || selectedRankingMonth.value) - 1] || "Month";
      }

      return "Today";
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

    const assignScopeRowLabel = (row, context, index = 0) => {
      if (context.period === "year" && row.month >= 1 && row.month <= 12) {
        return monthLabels[row.month - 1];
      }

      if (context.period === "month" && row.day > 0) {
        return `Day ${row.day}`;
      }

      if (context.period === "today" && row.hour > 0) {
        return `${String(row.hour).padStart(2, "0")}:00`;
      }

      if (row.rawLabel && row.rawLabel.length <= 32) {
        return row.rawLabel;
      }

      if (context.period === "month") {
        return monthLabels[(context.month || selectedRankingMonth.value) - 1] || "Month";
      }

      if (context.period === "year") {
        return String(currentYear.value);
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

    const buildScopeRowsFromNormalized = (rows = [], context = monthlyChartContext) => {
      const normalizedRows = Array.isArray(rows) ? rows : [];

      if (context.period === "year" && normalizedRows.some((row) => row.month > 0)) {
        const baseRows = buildYearScopeBaseRows();

        normalizedRows.forEach((row) => {
          const monthIndex = row.month - 1;
          if (monthIndex >= 0 && monthIndex < baseRows.length) {
            baseRows[monthIndex] = mergeScopeRow(baseRows[monthIndex], row);
            baseRows[monthIndex].label = monthLabels[monthIndex];
          }
        });

        return baseRows;
      }

      if (context.period === "year" && !normalizedRows.length) {
        return buildYearScopeBaseRows();
      }

      if (context.period === "month" && normalizedRows.some((row) => row.day > 0)) {
        const totalDays = new Date(
          currentYear.value,
          context.month || selectedRankingMonth.value,
          0
        ).getDate();
        const baseRows = Array.from({ length: totalDays }, (_, index) =>
          createEmptyScopeRow({
            label: `Day ${index + 1}`,
            month: context.month || selectedRankingMonth.value,
            day: index + 1,
            sortOrder: index + 1,
          })
        );

        normalizedRows.forEach((row) => {
          const dayIndex = row.day - 1;
          if (dayIndex >= 0 && dayIndex < baseRows.length) {
            baseRows[dayIndex] = mergeScopeRow(baseRows[dayIndex], row);
            baseRows[dayIndex].label = `Day ${dayIndex + 1}`;
          }
        });

        return baseRows;
      }

      if (context.period === "today" && normalizedRows.some((row) => row.hour > 0)) {
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
        return [
          createEmptyScopeRow({
            label: buildFallbackScopeLabel(context),
            month: context.month || 0,
            sortOrder: 1,
          }),
        ];
      }

      if (normalizedRows.length === 1) {
        const row = { ...normalizedRows[0] };
        row.label = assignScopeRowLabel(row, context, 0);
        row.sortOrder = row.sortOrder || 1;
        return [row];
      }

      return normalizedRows
        .map((row, index) => ({
          ...row,
          label: assignScopeRowLabel(row, context, index),
          sortOrder:
            context.period === "year"
              ? row.month || index + 1
              : context.period === "month"
              ? row.day || index + 1
              : row.hour || index + 1,
        }))
        .sort((left, right) => left.sortOrder - right.sortOrder);
    };

    const buildRankingScopeData = (payload, context = monthlyChartContext) => {
      const normalizedBankcode = normalizeBankcode(context.bankcode || userBankcode.value);
      const sourceRows = extractRankingRows(payload)
        .map((entry, index) => normalizeRankingEntry(entry, index))
        .map((row) => {
          const rowWithBankcode = {
            ...row,
            bankCode: row.bankCode || normalizedBankcode,
            bankName: row.bankName || normalizedBankcode || "Member Bank",
          };

          if (context.period !== "year") {
            return rowWithBankcode;
          }

          const requestedMonth = toPositiveInteger(context.requestMonth || context.month);

          return {
            ...rowWithBankcode,
            month: rowWithBankcode.month || requestedMonth,
            sortOrder: rowWithBankcode.month || requestedMonth || rowWithBankcode.sortOrder,
          };
        })
        .filter((row) => !normalizedBankcode || row.bankCode === normalizedBankcode)
        .map((row, index) => {
          if (context.period !== "year" || row.month > 0) {
            return row;
          }

          const inferredMonth = inferMonthNumber(row.rawLabel);
          if (inferredMonth < 1 || inferredMonth > getYearScopeMonthLimit()) {
            return row;
          }

          return {
            ...row,
            month: inferredMonth,
            sortOrder: inferredMonth || row.sortOrder || index + 1,
          };
        });
      const rows = buildScopeRowsFromNormalized(sourceRows, context);

      return {
        rows,
        sourceRows,
        summary: buildScopeSummary(rows),
      };
    };

    const getRankingScopeContext = (overrides = {}) => ({
      period: overrides.period || activeRankingScope.value,
      month:
        overrides.month !== undefined
          ? Number(overrides.month)
          : Number(selectedRankingMonth.value),
      bankcode: overrides.bankcode || userBankcode.value,
    });

    const waitForChartPaint = () =>
      new Promise((resolve) => {
        if (typeof window === "undefined" || typeof window.requestAnimationFrame !== "function") {
          resolve();
          return;
        }

        window.requestAnimationFrame(() => resolve());
      });

    const ensureMonthlyBarChartInstance = () => {
      if (!monthlyBarChartRef.value) return null;

      if (!monthlyBarChart) {
        monthlyBarChart = echarts.init(monthlyBarChartRef.value);
        bindMonthlyChartHoverEvents();
      }

      return monthlyBarChart;
    };

    const waitForMonthlyChartRenderSuccess = ({ timeoutMs = 2400 } = {}) =>
      new Promise((resolve) => {
        const chart = ensureMonthlyBarChartInstance();
        if (!chart) {
          resolve();
          return;
        }

        let settled = false;
        let timer = null;

        const finish = () => {
          if (settled) return;
          settled = true;
          chart.off("finished", onFinished);
          if (timer) {
            clearTimeout(timer);
          }
          waitForChartPaint().then(resolve);
        };

        const onFinished = () => finish();

        chart.on("finished", onFinished);
        timer = setTimeout(finish, timeoutMs);
      });

    const renderMonthlyChartAndWait = async (rows = [], context = monthlyChartContext) => {
      const renderFinished = waitForMonthlyChartRenderSuccess();
      renderMonthlyBarChart(rows, null, { context });
      await renderFinished;
    };

    const normalizeMonthlyRows = (rows = [], context = monthlyChartContext) =>
      buildScopeRowsFromNormalized(rows, context);

    const interpolateMonthlyRows = (fromRows = [], toRows = [], progress = 1, context = monthlyChartContext) => {
      const startRows = normalizeMonthlyRows(fromRows, context);
      const endRows = normalizeMonthlyRows(toRows, context);

      return endRows.map((row, index) => {
        const start = startRows[index] || createEmptyScopeRow({
          label: row.label,
          month: row.month,
          day: row.day,
          hour: row.hour,
          sortOrder: row.sortOrder,
        });

        return {
          ...row,
          fromCount: start.fromCount + (row.fromCount - start.fromCount) * progress,
          toCount: start.toCount + (row.toCount - start.toCount) * progress,
          totalCount: start.totalCount + (row.totalCount - start.totalCount) * progress,
          fromAmount: start.fromAmount + (row.fromAmount - start.fromAmount) * progress,
          toAmount: start.toAmount + (row.toAmount - start.toAmount) * progress,
          totalAmount: start.totalAmount + (row.totalAmount - start.totalAmount) * progress,
        };
      });
    };

    const hasMonthlyChartRows = (rows) => Array.isArray(rows) && rows.length > 0;

    const getRankingScopeCacheKey = (context = monthlyChartContext) =>
      buildCacheKey(
        "stacked-ranking-scope",
        `${resolveSelectedRankingYear()}:${context.period}:${
          context.period === "year"
            ? `ranked-by-year-post:${getYearScopeMonthLimit()}`
            : context.month || "all"
        }:${context.bankcode || "unknown"}`
      );

    const getRankingScopeTtlMs = (period) =>
      period === "today"
        ? rankingTodayTtlMs
        : period === "month"
        ? monthlyScopeTtlMs
        : yearlyRankingTtlMs;

    const buildRankingScopeRequest = (context = monthlyChartContext) => {
      if (context.period === "today") {
        return {
          method: "post",
          url: `${apiBase2}/transfer/ranked-bankcodes-today`,
          data: {
            bankcode: context.bankcode,
          },
        };
      }

      if (context.period === "year") {
        const requestedMonth =
          toPositiveInteger(context.requestMonth || context.month) || getYearScopeMonthLimit();

        return {
          method: "post",
          url: `${apiBase2Root}/api/transfer/ranked-bankcodes-by-year`,
          data: {
            bankcode: context.bankcode,
            month: requestedMonth,
          },
        };
      }

      return {
        method: "post",
        url: `${apiBase2}/transfer/ranked-bankcodes-by-year`,
        data: {
          bankcode: context.bankcode,
          month: context.month,
        },
      };
    };

    const requestRankingScopeData = async (context = monthlyChartContext) => {
      const request = buildRankingScopeRequest(context);
      const abort = createSoftAbortSignal(
        context.period === "year" ? yearlyRankingRequestTimeoutMs : softAbortMs
      );

      try {
        const response = await axios({
          method: request.method || "get",
          url: request.url,
          ...getAuthConfig(),
          signal: abort.signal,
          params: request.params,
          data: request.data,
        });

        return response.data;
      } finally {
        abort.cancel();
      }
    };

    const fetchRankingScopeData = async (context = monthlyChartContext, forceRefresh = false) => {
      const cacheKey = getRankingScopeCacheKey(context);

      return fetchWithCache({
        key: cacheKey,
        ttlMs: getRankingScopeTtlMs(context.period),
        forceRefresh,
        requestFn: async () => {
          const payload = await requestRankingScopeData(context);
          return buildRankingScopeData(payload, context);
        },
      });
    };

    const {
      yearlyOverviewSkeletonBars,
      yearlyOverviewHasLoadingMonths,
      getYearScopeMonths,
      setYearlyOverviewMonthLoading,
      clearYearlyOverviewLoadingMonths,
      isYearlyOverviewMonthLoading,
      buildYearScopeDataFromMonthlyScopes,
      readCachedYearlyRankingMonthScopes,
      fetchYearlyRankingScopeDataProgressively,
    } = useYearlyTransferRanking({
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
      getDefaultContext: () => monthlyChartContext,
    });

    const deriveMonthScopeFromYearCache = (context = monthlyChartContext) => {
      if (context.period !== "month") return null;

      const yearContext = getRankingScopeContext({
        period: "year",
        bankcode: context.bankcode,
        month: 0,
      });
      const cachedYearScopeData =
        getCachedYearlyRankingScope({
          year: resolveSelectedRankingYear(),
          bankcode: context.bankcode,
        }) ||
        getCachedData(getRankingScopeCacheKey(yearContext), getRankingScopeTtlMs("year")).data;
      const yearSourceRows = Array.isArray(cachedYearScopeData?.sourceRows)
        ? cachedYearScopeData.sourceRows
        : [];

      if (!yearSourceRows.length || !yearSourceRows.some((row) => row.month === context.month)) {
        return null;
      }

      return {
        rows: buildScopeRowsFromNormalized(
          yearSourceRows.filter((row) => row.month === context.month),
          context
        ),
        sourceRows: yearSourceRows.filter((row) => row.month === context.month),
        summary: buildScopeSummary(
          buildScopeRowsFromNormalized(
            yearSourceRows.filter((row) => row.month === context.month),
            context
          )
        ),
      };
    };

    const primeYearRankingScopeCache = async () => {
      try {
        const context = getRankingScopeContext({ period: "year", month: 0 });
        if (!context.bankcode) return;

        const scopeData = await fetchRankingScopeData(context, false);
        setCachedYearlyRankingScope(scopeData, {
          year: resolveSelectedRankingYear(),
          bankcode: context.bankcode,
        });
      } catch (error) {
        console.error("Error priming year ranking scope cache:", error);
      }
    };

    const applyRankingScopeSummary = (scopeData = {}) => {
      totalInquiryTransaction.value = Math.max(
        0,
        Math.round(toSafeNumber(scopeData?.summary?.totalCount))
      );
      totalTransferTransaction.value = toSafeNumber(scopeData?.summary?.totalAmount);
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

    const hasTransferTodaySnapshotChanged = (previousSnapshot = null, nextSnapshot = null) => {
      if (!previousSnapshot && !nextSnapshot) return false;
      if (!previousSnapshot || !nextSnapshot) return true;

      return [
        "totalCount",
        "totalAmount",
        "fromCount",
        "toCount",
        "fromAmount",
        "toAmount",
        "rankFromCount",
        "rankToCount",
        "rankTotalCount",
        "rankFromAmount",
        "rankToAmount",
        "rankTotalAmount",
      ].some(
        (key) => toSafeNumber(previousSnapshot.row?.[key]) !== toSafeNumber(nextSnapshot.row?.[key])
      );
    };

    const fetchLiveTransferTodaySnapshot = async (forceRefresh = true) => {
      try {
        const todayContext = getRankingScopeContext({ period: "today" });
        if (!todayContext.bankcode) return null;

        const cacheKey = buildCacheKey("lmps-today-cards", todayContext.bankcode);
        const todayScopeData = await fetchWithCache({
          key: cacheKey,
          ttlMs: rankingTodayTtlMs,
          forceRefresh,
          requestFn: async () => {
            const abort = createSoftAbortSignal();

            try {
              const response = await axios.post(
                `${apiBase2}/transfer/ranked-bankcodes-today`,
                { bankcode: todayContext.bankcode },
                {
                  ...getAuthConfig(),
                  signal: abort.signal,
                }
              );

              return buildRankingScopeData(response.data, todayContext);
            } finally {
              abort.cancel();
            }
          },
        });
        return buildTransferTodaySnapshot(todayScopeData);
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

    const chartGradientCount = () =>
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#2563EB" },
        { offset: 1, color: "#60A5FA" },
      ]);

    const chartGradientAmount = () =>
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#F59E0B" },
        { offset: 1, color: "#FCD34D" },
      ]);

    const buildMonthlySeriesData = ({
      rows,
      hoveredIndex,
      key,
      gradient,
      activeColor,
      shadowColor,
    }) =>
      rows.map((item, index) => {
        const isHoveredMonth = hoveredIndex === index;
        const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

        return {
          value: item[key],
          itemStyle: {
            color: isHoveredMonth ? activeColor : gradient,
            opacity: isDimmed ? 0.08 : 1,
            borderRadius: [12, 12, 0, 0],
            shadowBlur: isHoveredMonth ? 18 : 10,
            shadowColor: isHoveredMonth ? shadowColor : "rgba(15, 23, 42, 0.10)",
            borderWidth: isHoveredMonth ? 1.5 : 0,
            borderColor: isHoveredMonth ? "rgba(255,255,255,0.85)" : "transparent",
          },
        };
      });

    const isMonthlyLegendVisible = (seriesName) =>
      monthlyLegendSelected[seriesName] !== false;

    const bindMonthlyChartHoverEvents = () => {
      if (!monthlyBarChart) return;

      monthlyBarChart.off("mouseover");
      monthlyBarChart.off("globalout");
      monthlyBarChart.off("legendselectchanged");

      monthlyBarChart.on("mouseover", (params) => {
        if (params?.componentType !== "series" || typeof params?.dataIndex !== "number") {
          return;
        }

        if (!isMonthlyLegendVisible(params?.seriesName)) {
          monthlyBarChart?.dispatchAction({ type: "hideTip" });
          return;
        }

        if (monthlyChartHoverIndex === params.dataIndex) return;
        renderMonthlyBarChart(monthlyChartRows, params.dataIndex);
      });

      monthlyBarChart.on("globalout", () => {
        if (monthlyChartHoverIndex === null) return;
        monthlyBarChart?.dispatchAction({ type: "hideTip" });
        renderMonthlyBarChart(monthlyChartRows, null);
      });

      monthlyBarChart.on("legendselectchanged", (params) => {
        monthlyLegendSelected = {
          ...monthlyLegendSelected,
          ...(params?.selected || {}),
        };

        monthlyChartHoverIndex = null;
        monthlyBarChart?.dispatchAction({ type: "hideTip" });
        renderMonthlyBarChart(monthlyChartRows, null);
      });
    };
    const buildTooltipRankingLines = (items = []) =>
      items
        .filter((item) => toPositiveInteger(item.value) > 0)
        .map(
          (item) => `
            <div style="display:flex;justify-content:space-between;gap:12px;">
              <span style="color:rgba(255,255,255,0.66);">${item.label}</span>
              <b style="color:#FFFFFF;">${formatRank(item.value)}</b>
            </div>
          `
        )
        .join("");

    const buildMonthlyChartTooltipTitle = (label, context = monthlyChartContext) => {
      if (context.period === "year") {
        return `${label} ${currentYear.value}`;
      }

      if (context.period === "month") {
        return `${label} · ${monthLabels[(context.month || selectedRankingMonth.value) - 1]} ${currentYear.value}`;
      }

      return label;
    };

    const renderMonthlyBarChart = (rawRows = [], hoveredIndex = null, options = {}) => {
      if (!monthlyBarChartRef.value) return;

      const { persistRows = true, context = monthlyChartContext } = options;

      if (persistRows) {
        monthlyChartRows = Array.isArray(rawRows) ? rawRows : [];
      }
      monthlyChartContext = {
        period: context.period || activeRankingScope.value,
        month: context.month || selectedRankingMonth.value,
      };
      monthlyChartHoverIndex = typeof hoveredIndex === "number" ? hoveredIndex : null;

      const rows = normalizeMonthlyRows(
        persistRows ? monthlyChartRows : Array.isArray(rawRows) ? rawRows : [],
        monthlyChartContext
      );
      const categoryLabels = rows.map(
        (row, index) =>
          row.label ||
          assignScopeRowLabel(row, monthlyChartContext, index) ||
          buildFallbackScopeLabel(monthlyChartContext)
      );

      ensureMonthlyBarChartInstance();

      monthlyBarChart.setOption(
        {
          color: ["#2563EB", "#F59E0B"],
          backgroundColor: "transparent",
          animationDuration: 900,
          animationEasing: "cubicOut",
          grid: {
            top: 56,
            left: 28,
            right: 28,
            bottom: 28,
            containLabel: true,
          },
          legend: {
            top: 0,
            right: 0,
            data: monthlyLegendItems,
            selected: monthlyLegendSelected,
            itemWidth: 16,
            itemHeight: 10,
            itemGap: 18,
            inactiveColor: "#CBD5E1",
            textStyle: {
              color: "#64748B",
              fontWeight: 600,
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            confine: true,
            appendToBody: false,
            enterable: false,
            backgroundColor: "rgba(15, 23, 42, 0.96)",
            borderWidth: 0,
            textStyle: { color: "#fff" },
            position: (point, params, dom, rect, size) => {
              const [x, y] = point;
              const [contentWidth, contentHeight] = size.contentSize;
              const [viewWidth, viewHeight] = size.viewSize;

              let left = x + 14;
              if (left + contentWidth > viewWidth - 12) {
                left = Math.max(12, viewWidth - contentWidth - 12);
              }

              let top = y - contentHeight - 14;
              if (top < 12) {
                top = Math.min(viewHeight - contentHeight - 12, y + 14);
              }

              return [left, Math.max(12, top)];
            },
            formatter: (params) => {
              const visibleEntries = Array.isArray(params)
                ? params.filter((entry) => isMonthlyLegendVisible(entry?.seriesName))
                : [];

              if (!visibleEntries.length) {
                monthlyBarChart?.dispatchAction({ type: "hideTip" });
                return "";
              }

              const index = visibleEntries?.[0]?.dataIndex ?? 0;
              const item =
                rows[index] ||
                createEmptyScopeRow({
                  label: categoryLabels[index] || buildFallbackScopeLabel(monthlyChartContext),
                  sortOrder: index + 1,
                });
              const showCount = isMonthlyLegendVisible("Total Count");
              const showAmount = isMonthlyLegendVisible("Total Amount");
              const countRankLines = buildTooltipRankingLines([
                { label: "rankFromCount", value: item.rankFromCount },
                { label: "rankToCount", value: item.rankToCount },
                { label: "rankTotalCount", value: item.rankTotalCount },
              ]);
              const amountRankLines = buildTooltipRankingLines([
                { label: "rankFromAmount", value: item.rankFromAmount },
                { label: "rankToAmount", value: item.rankToAmount },
                { label: "rankTotalAmount", value: item.rankTotalAmount },
              ]);

              return `
                <div style="min-width: 320px; padding: 4px 2px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                    <div style="font-size:15px;font-weight:700;">
                      ${buildMonthlyChartTooltipTitle(categoryLabels[index], monthlyChartContext)}
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:${showCount && showAmount ? "1fr 1fr" : "1fr"};gap:10px;">
                    ${
                      showCount
                        ? `
                    <div style="background:rgba(37,99,235,0.16);border:1px solid rgba(96,165,250,0.22);border-radius:14px;padding:12px;">
                      <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#93C5FD;margin-bottom:8px;">
                        Count
                      </div>
                      <div style="display:flex;justify-content:space-between;margin-bottom:6px;gap:12px;">
                        <span style="color:rgba(255,255,255,0.72);">fromCount</span>
                        <b>${formatCount(item.fromCount)}</b>
                      </div>
                      <div style="display:flex;justify-content:space-between;margin-bottom:6px;gap:12px;">
                        <span style="color:rgba(255,255,255,0.72);">toCount</span>
                        <b>${formatCount(item.toCount)}</b>
                      </div>
                      <div style="display:flex;justify-content:space-between;gap:12px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.10);">
                        <span style="color:#DBEAFE;">totalCount</span>
                        <b style="color:#FFFFFF;">${formatCount(item.totalCount)}</b>
                      </div>
                      ${
                        countRankLines
                          ? `
                      <div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.10);display:grid;gap:6px;">
                        ${countRankLines}
                      </div>
                      `
                          : ""
                      }
                    </div>
                    `
                        : ""
                    }

                    ${
                      showAmount
                        ? `
                    <div style="background:rgba(245,158,11,0.16);border:1px solid rgba(251,191,36,0.22);border-radius:14px;padding:12px;">
                      <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#FCD34D;margin-bottom:8px;">
                        Amount
                      </div>
                      <div style="display:flex;justify-content:space-between;margin-bottom:6px;gap:12px;">
                        <span style="color:rgba(255,255,255,0.72);">fromAmount</span>
                        <b>${formatAmount(item.fromAmount)}</b>
                      </div>
                      <div style="display:flex;justify-content:space-between;margin-bottom:6px;gap:12px;">
                        <span style="color:rgba(255,255,255,0.72);">toAmount</span>
                        <b>${formatAmount(item.toAmount)}</b>
                      </div>
                      <div style="display:flex;justify-content:space-between;gap:12px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.10);">
                        <span style="color:#FEF3C7;">totalAmount</span>
                        <b style="color:#FFFFFF;">${formatAmount(item.totalAmount)}</b>
                      </div>
                      ${
                        amountRankLines
                          ? `
                      <div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.10);display:grid;gap:6px;">
                        ${amountRankLines}
                      </div>
                      `
                          : ""
                      }
                    </div>
                    `
                        : ""
                    }
                  </div>
                </div>
              `;
            },
          },
          xAxis: {
            type: "category",
            data: categoryLabels,
            axisLine: {
              lineStyle: { color: "#CBD5E1" },
            },
            axisTick: { show: false },
            axisLabel: {
              color: "#64748B",
              rotate: categoryLabels.length > 10 ? 32 : 0,
            },
            axisPointer: {
              type: "shadow",
              shadowStyle: {
                color: "rgba(15, 23, 42, 0.06)",
              },
            },
          },
          yAxis: [
            {
              type: "value",
              name: "Total Count",
              position: "left",
              splitLine: {
                lineStyle: { color: "rgba(148, 163, 184, 0.18)" },
              },
              axisLabel: {
                color: "#64748B",
                formatter: (value) => formatCompact(value),
              },
              nameTextStyle: {
                color: "#64748B",
              },
            },
            {
              type: "value",
              name: "Total Amount",
              position: "right",
              splitLine: { show: false },
              axisLabel: {
                color: "#64748B",
                formatter: (value) => formatCompact(value),
              },
              nameTextStyle: {
                color: "#64748B",
              },
            },
          ],
          series: [
            {
              name: "Total Count",
              type: "bar",
              yAxisIndex: 0,
              barMaxWidth: 22,
              data: buildMonthlySeriesData({
                rows,
                hoveredIndex: monthlyChartHoverIndex,
                key: "totalCount",
                gradient: chartGradientCount(),
                activeColor: "#2563EB",
                shadowColor: "rgba(37, 99, 235, 0.28)",
              }),
              emphasis: {
                disabled: true,
              },
            },
            {
              name: "Total Amount",
              type: "bar",
              yAxisIndex: 1,
              barMaxWidth: 22,
              data: buildMonthlySeriesData({
                rows,
                hoveredIndex: monthlyChartHoverIndex,
                key: "totalAmount",
                gradient: chartGradientAmount(),
                activeColor: "#F59E0B",
                shadowColor: "rgba(245, 158, 11, 0.28)",
              }),
              emphasis: {
                disabled: true,
              },
            },
          ],
        },
        true
      );
    };

    const animateMonthlyChartRows = async (nextRows = [], context = monthlyChartContext) => {
      const normalizedNextRows = normalizeMonthlyRows(nextRows, context);
      const hasPreviousRows = hasMonthlyChartRows(monthlyChartRows);
      const isSameScope =
        monthlyChartContext.period === context.period &&
        Number(monthlyChartContext.month || 0) === Number(context.month || 0);

      if (!monthlyChartInitialized.value || !hasPreviousRows || !isSameScope) {
        const renderFinished = waitForMonthlyChartRenderSuccess();
        renderMonthlyBarChart(normalizedNextRows, monthlyChartHoverIndex, { context });
        await renderFinished;
        return;
      }

      monthlyChartTween?.kill();

      const tweenState = { progress: 0 };
      const fromRows = normalizeMonthlyRows(monthlyChartRows, context);
      await new Promise((resolve) => {
        monthlyChartTween = gsap.to(tweenState, {
          progress: 1,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            renderMonthlyBarChart(
              interpolateMonthlyRows(fromRows, normalizedNextRows, tweenState.progress, context),
              monthlyChartHoverIndex,
              { persistRows: false, context }
            );
          },
          onComplete: async () => {
            const renderFinished = waitForMonthlyChartRenderSuccess();
            renderMonthlyBarChart(normalizedNextRows, monthlyChartHoverIndex, { context });
            await renderFinished;
            monthlyChartTween = null;
            resolve();
          },
        });
      });
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
      monthlyBarChart?.resize();
    };

    const clearMonthlyRealtimeRefresh = () => {
      if (monthlyRealtimeTimer) {
        clearTimeout(monthlyRealtimeTimer);
        monthlyRealtimeTimer = null;
      }
    };

    const scheduleMonthlyRealtimeRefresh = () => {
      clearMonthlyRealtimeRefresh();
    };

    const destroyCharts = () => {
      clearMonthlyRealtimeRefresh();
      monthlyChartTween?.kill();
      monthlyChartTween = null;
      window.removeEventListener("resize", resizeCharts);
      dailyLineChart?.dispose();
      dailyLineChart = null;
      monthlyBarChart?.dispose();
      monthlyBarChart = null;
    };

    const fetchMonthlyTransferScope = async (options = {}) => {
      const {
        forceRefresh = false,
        showLoading = true,
        animate = false,
        period = activeRankingScope.value,
        month = selectedRankingMonth.value,
      } = options;
      const requestId = ++monthlyChartRequestId;
      monthlyChartError.value = "";
      let hasRenderedCachedData = false;
      let hasRenderedProgressData = false;

      const renderScopeData = async (
        scopeData = {},
        context,
        shouldAnimate = false,
        renderOptions = {}
      ) => {
        if (requestId !== monthlyChartRequestId) return;

        const { keepLoading = false } = renderOptions;

        applyRankingScopeSummary(scopeData);
        const rowsToRender = normalizeMonthlyRows(scopeData.rows, context);

        await nextTick();
        if (requestId !== monthlyChartRequestId) return;

        if (shouldAnimate) {
          await animateMonthlyChartRows(rowsToRender, context);
        } else {
          await renderMonthlyChartAndWait(rowsToRender, context);
        }

        if (requestId !== monthlyChartRequestId) return;

        monthlyChartError.value = "";
        monthlyChartInitialized.value = true;
        monthlyChartContext = context;
        monthlyChartLoading.value = keepLoading;
      };

      try {
        const context = getRankingScopeContext({ period, month });
        if (!context.bankcode) {
          clearYearlyOverviewLoadingMonths();
          monthlyChartError.value = "Unable to load yearly transaction data right now.";
          return;
        }

        if (context.period === "year") {
          setYearlyOverviewMonthLoading(getYearScopeMonths(), true);
        } else {
          clearYearlyOverviewLoadingMonths();
        }

        const cacheKey = getRankingScopeCacheKey(context);
        const cached = getCachedData(cacheKey, getRankingScopeTtlMs(context.period));
        const cachedYearScopeData =
          context.period === "year"
            ? getCachedYearlyRankingScope({
                year: resolveSelectedRankingYear(),
                bankcode: context.bankcode,
              })
            : null;
        const cachedYearMonthScopes =
          context.period === "year" ? readCachedYearlyRankingMonthScopes(context) : [];
        const cachedYearMonthScopeData = cachedYearMonthScopes.length
          ? buildYearScopeDataFromMonthlyScopes(cachedYearMonthScopes, context)
          : null;
        const derivedScopeData =
          context.period !== "year" && !cached.data ? deriveMonthScopeFromYearCache(context) : null;
        const previewScopeData =
          cachedYearScopeData || cached.data || cachedYearMonthScopeData || derivedScopeData;

        transferLoading.value = !hasMonthlyChartRows(previewScopeData?.rows);

        if (hasMonthlyChartRows(previewScopeData?.rows)) {
          await renderScopeData(previewScopeData, context, false, {
            keepLoading: context.period === "year",
          });
          if (requestId !== monthlyChartRequestId) return;
          hasRenderedCachedData = true;
        } else if (showLoading || !monthlyChartInitialized.value) {
          monthlyChartLoading.value = true;
          if (context.period === "year") {
            await renderScopeData(
              buildYearScopeDataFromMonthlyScopes([], context),
              context,
              false,
              { keepLoading: true }
            );
            if (requestId !== monthlyChartRequestId) return;
          }
        }

        const scopeData =
          context.period === "year"
            ? await fetchYearlyRankingScopeDataProgressively(context, {
                forceRefresh,
                onProgress: async (progressScopeData, progress) => {
                  if (requestId !== monthlyChartRequestId) return;

                  setYearlyOverviewMonthLoading([progress?.month], false);
                  if (progress?.isLast) return;

                  await renderScopeData(
                    progressScopeData,
                    context,
                    animate && (hasRenderedCachedData || hasRenderedProgressData || monthlyChartInitialized.value),
                    { keepLoading: true }
                  );
                  hasRenderedProgressData = true;
                },
              })
            : await fetchRankingScopeData(
                context,
                forceRefresh || !cached.isFresh || !cached.data
              );

        if (requestId !== monthlyChartRequestId) return;

        if (context.period === "year") {
          clearYearlyOverviewLoadingMonths();
          setCachedYearlyRankingScope(scopeData, {
            year: resolveSelectedRankingYear(),
            bankcode: context.bankcode,
          });
        }

        await renderScopeData(
          scopeData,
          context,
          animate && (hasRenderedCachedData || hasRenderedProgressData || monthlyChartInitialized.value)
        );
      } catch (error) {
        if (requestId !== monthlyChartRequestId) return;
        clearYearlyOverviewLoadingMonths();
        if (isCanceledRequest(error)) {
          monthlyChartLoading.value = false;
          return;
        }
        if (!hasRenderedCachedData && !hasRenderedProgressData) {
          monthlyChartError.value =
            error?.response?.data?.message ||
            error?.message ||
            "Unable to load yearly transaction data right now.";
          monthlyChartInitialized.value = false;
        } else {
          monthlyChartLoading.value = false;
        }
      } finally {
        if (requestId === monthlyChartRequestId && !monthlyChartInitialized.value) {
          monthlyChartLoading.value = false;
        }
        if (requestId === monthlyChartRequestId) {
          transferLoading.value = false;
        }
      }
    };

    const fetchYearlyOverviewMonthlySummary = async ({ forceRefresh = false } = {}) => {
      const requestId = ++yearlyOverviewSummaryRequestId;

      try {
        const context = getRankingScopeContext({
          period: "month",
          month: resolveSelectedRankingMonth(),
        });
        if (!context.bankcode) return;

        const cacheKey = getRankingScopeCacheKey(context);
        const cached = getCachedData(cacheKey, getRankingScopeTtlMs("month"));

        if (cached.data) {
          applyRankingScopeSummary(cached.data);
        }

        const scopeData = await fetchRankingScopeData(
          context,
          forceRefresh || !cached.isFresh || !cached.data
        );

        if (requestId !== yearlyOverviewSummaryRequestId) return;
        applyRankingScopeSummary(scopeData);
      } catch (error) {
        if (requestId !== yearlyOverviewSummaryRequestId) return;
        if (isCanceledRequest(error)) return;
        console.error("Error fetching yearly overview monthly summary:", error);
      }
    };

    const loadYearlyOverview = async ({
      forceYearRefresh = false,
      forceMonthRefresh = false,
      showLoading = true,
      animate = false,
    } = {}) => {
      const requestId = ++yearlyOverviewLoadRequestId;

      await fetchMonthlyTransferScope({
        period: "year",
        month: 0,
        forceRefresh: forceYearRefresh,
        showLoading,
        animate,
      });

      if (requestId !== yearlyOverviewLoadRequestId) return;

      await fetchYearlyOverviewMonthlySummary({
        forceRefresh: forceMonthRefresh,
      });
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
            const [inquiryRes, transferRes] = await Promise.all([
              axios.get(`${apiBase2}/inquiry/daily-count`, {
                ...getAuthConfig(),
                params: { bankcode },
              }),
              axios.get(`${apiBase2}/transfer/daily-count`, {
                ...getAuthConfig(),
                params: { bankcode },
              }),
            ]);

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
        console.error("Error fetching daily counts:", error);
      } finally {
        chartLoading.value = false;
      }
    };

    const refreshTransferDashboardIfNeeded = async (options = {}) => {
      const { animate = true } = options;

      try {
        const bankcode = userBankcode.value;
        if (!bankcode) return;

        const latestTodaySnapshot = await fetchLiveTransferTodaySnapshot(true);
        if (!latestTodaySnapshot) return;
        applyLmpsTodayCardSnapshot(latestTodaySnapshot);
        lmpsTodayCardsLoading.value = false;

        const todaySnapshotChanged = hasTransferTodaySnapshotChanged(
          lastTransferTodaySnapshot,
          latestTodaySnapshot
        );
        lastTransferTodaySnapshot = latestTodaySnapshot;

        if (!todaySnapshotChanged) {
          return;
        }

        const activeContext = getRankingScopeContext({
          period: activeRankingScope.value,
          month: activeRankingScope.value === "month" ? selectedRankingMonth.value : 0,
        });

        await fetchMonthlyTransferScope({
          period: activeContext.period,
          month: activeContext.period === "month" ? activeContext.month : 0,
          forceRefresh: true,
          showLoading: false,
          animate,
        });
        if (activeContext.period === "year") {
          await fetchYearlyOverviewMonthlySummary({ forceRefresh: true });
        }
      } catch (error) {
        console.error("Error refreshing transfer dashboard:", error);
      }
    };

    const handleMonthlyChartVisibilityChange = () => {
      if (typeof document === "undefined") return;

      if (document.hidden) {
        clearMonthlyRealtimeRefresh();
        return;
      }
    };

    const handleRankingScopeChange = async () => {
      if (activeRankingScope.value === "year") {
        await loadYearlyOverview({
          showLoading: true,
          animate: true,
        });
        return;
      }

      await fetchMonthlyTransferScope({
        period: activeRankingScope.value,
        month: activeRankingScope.value === "month" ? resolveSelectedRankingMonth() : 0,
        showLoading: true,
        animate: true,
      });
    };

    const handleRankingMonthChange = async () => {
      if (activeRankingScope.value === "year") {
        await fetchYearlyOverviewMonthlySummary();
        return;
      }

      if (activeRankingScope.value === "month") {
        await fetchMonthlyTransferScope({
          period: "month",
          month: resolveSelectedRankingMonth(),
          showLoading: true,
          animate: true,
        });
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

    watch(currentYear, async (nextYear, previousYear) => {
      if (Number(nextYear) === Number(previousYear)) return;

      if (activeRankingScope.value === "year") {
        await loadYearlyOverview({
          showLoading: true,
          animate: true,
        });
        return;
      }

      await fetchMonthlyTransferScope({
        period: activeRankingScope.value,
        month: activeRankingScope.value === "month" ? resolveSelectedRankingMonth() : 0,
        showLoading: true,
        animate: true,
      });
    });

    watch(selectedRankingMonth, async (nextMonth, previousMonth) => {
      if (Number(nextMonth) === Number(previousMonth)) return;

      if (activeRankingScope.value === "year") {
        await fetchYearlyOverviewMonthlySummary();
        return;
      }

      if (activeRankingScope.value === "month") {
        await fetchMonthlyTransferScope({
          period: "month",
          month: resolveSelectedRankingMonth(),
          showLoading: true,
          animate: true,
        });
      }
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
      loadYearlyOverview({
        showLoading: true,
        animate: true,
      }).catch((error) => {
        console.error("Error loading yearly overview:", error);
      });
      await lmpsTodayCardsPromise;

      animateChartCards();
      window.addEventListener("resize", resizeCharts);
      document.addEventListener("visibilitychange", handleMonthlyChartVisibilityChange);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("visibilitychange", handleMonthlyChartVisibilityChange);
      destroyCharts();
    });

    return {
      userRole,
      userBankcode,
      totalMembers,
      totalInquiryTransaction,
      totalMerchantInactive,
      totalTransferTransaction,
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
      transferLoading,
      chartLoading,
      monthlyChartInitialized,
      monthlyChartLoading,
      monthlyChartError,
      monthlyBarChartRef,
      currentYear,
      monthLabels,
      yearlyOverviewSkeletonBars,
      yearlyOverviewHasLoadingMonths,
      isYearlyOverviewMonthLoading,
      rankingScopeOptions,
      activeRankingScope,
      selectedRankingMonth,
      activeRankingScopeLabel,
      currentYearRangeLabel,
      activeRankingScopeCaption,
      monthlyChartLoadingLabel,
      getYearScopeMonthLimit,
      handleRankingScopeChange,
      handleRankingMonthChange,
      formatCount,
      formatAmount,
      formatRank,
    };
  },
};
</script>

<style scoped>
.yearly-overview-shimmer {
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 45%, #e2e8f0 100%);
}

.yearly-overview-shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.78) 50%,
    transparent 100%
  );
  animation: yearly-overview-shimmer 1.35s infinite;
}

@keyframes yearly-overview-shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
