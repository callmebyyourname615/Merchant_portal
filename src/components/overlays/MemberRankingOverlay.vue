<script setup>
import confetti from "canvas-confetti";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { buildApiUrl } from "@/config/api";
import {
  buildMemberRankingOverlayState,
  createEmptyMemberRankingOverlayData,
  fetchMemberRankingOverlayState,
  readStoredAuthUserProfile,
  resolveStoredUserBankcode,
} from "@/utils/memberRankingOverlay";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  prefetchedState: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close"]);

const apiUrl = buildApiUrl("/api", "base2");

const viewState = ref("idle");
const overlayData = ref(createEmptyMemberRankingOverlayData());
const statusMessage = ref("");
const confettiFired = ref(false);

let activeRequestId = 0;
let confettiTimer = null;

const FONT_AWESOME_ICON_PATHS = {
  trophy: "/fontawesome/trophy-solid-full.svg",
  sent: "/fontawesome/arrow-right-up-long-line.svg",
  received: "/fontawesome/arrow-left-down-long-line.svg",
  trend: "/fontawesome/arrow-trend-up-solid-full.svg",
  chart: "/fontawesome/chart-bar-solid-full.svg",
};

const toSafeNumber = (value) => {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : 0;
};

const createMaskedIconStyle = (iconPath, color, size = "18px") => ({
  backgroundColor: color,
  maskImage: `url(${iconPath})`,
  WebkitMaskImage: `url(${iconPath})`,
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  width: size,
  height: size,
});

const getRankSuffix = (value) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const normalizedValue = Number(value) || 0;
  const mod100 = normalizedValue % 100;

  return suffixes[(mod100 - 20) % 10] || suffixes[mod100] || suffixes[0];
};

const getRankTheme = (rank) => {
  if (rank === 1) {
    return {
      from: "#FFD700",
      via: "#FFC520",
      to: "#FF8C00",
      glow: "rgba(255,215,0,0.38)",
      textColor: "#1a0e00",
      labelColor: "#FFD700",
    };
  }

  if (rank === 2) {
    return {
      from: "#D4D4D4",
      via: "#B8B8B8",
      to: "#888888",
      glow: "rgba(192,192,192,0.28)",
      textColor: "#111111",
      labelColor: "#C8C8C8",
    };
  }

  if (rank === 3) {
    return {
      from: "#E8A060",
      via: "#CD7F32",
      to: "#8B5A22",
      glow: "rgba(205,127,50,0.32)",
      textColor: "#1a0a00",
      labelColor: "#CD7F32",
    };
  }

  return {
    from: "#818CF8",
    via: "#6366F1",
    to: "#4F46E5",
    glow: "rgba(99,102,241,0.32)",
    textColor: "#FFFFFF",
    labelColor: "#818CF8",
  };
};

const getStatusTheme = () => ({
  from: "#FB7185",
  via: "#F43F5E",
  to: "#E11D48",
  glow: "rgba(244,63,94,0.30)",
  textColor: "#FFFFFF",
  labelColor: "#FB7185",
});

const getConfettiColors = (rank) => {
  if (rank === 1) {
    return ["#FFD700", "#FFC520", "#FFF8DC", "#FFFACD", "#ffffff"];
  }

  if (rank === 2) {
    return ["#D4D4D4", "#B8B8B8", "#E8E8E8", "#ffffff", "#B0C4DE"];
  }

  if (rank === 3) {
    return ["#E8A060", "#CD7F32", "#DAA520", "#F4A460", "#ffffff"];
  }

  return ["#818CF8", "#6366F1", "#A5B4FC", "#C7D2FE", "#ffffff"];
};

const formatAmount = (value) => {
  const normalized = toSafeNumber(value);

  if (normalized >= 1_000_000_000) {
    return `${(normalized / 1_000_000_000).toFixed(2)}B`;
  }

  if (normalized >= 1_000_000) {
    return `${(normalized / 1_000_000).toFixed(2)}M`;
  }

  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(normalized);
};

const formatCount = (value) => new Intl.NumberFormat("en-US").format(toSafeNumber(value));

const formatFullAmount = (value) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(toSafeNumber(value));

const formatMoneyAmount = (value) =>
  new Intl.NumberFormat("en-US", {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  }).format(toSafeNumber(value));

const applyOverlayState = (state, fallbackBankCode = "") => {
  const normalizedState = buildMemberRankingOverlayState({
    viewState: state?.viewState || "idle",
    overlayData: {
      ...createEmptyMemberRankingOverlayData(fallbackBankCode),
      ...(state?.overlayData || {}),
    },
    statusMessage: state?.statusMessage || "",
  });

  viewState.value = normalizedState.viewState;
  overlayData.value = normalizedState.overlayData;
  statusMessage.value = normalizedState.statusMessage;
};

const loadRanking = async ({ preferPrefetched = true } = {}) => {
  const requestId = ++activeRequestId;
  const authProfile = readStoredAuthUserProfile();
  const bankCode = resolveStoredUserBankcode(authProfile);

  if (preferPrefetched && props.prefetchedState) {
    const prefetchedBankCode = props.prefetchedState?.overlayData?.bankCode;

    if (!prefetchedBankCode || !bankCode || prefetchedBankCode === bankCode) {
      applyOverlayState(props.prefetchedState, bankCode);
      return;
    }
  }

  applyOverlayState(
    buildMemberRankingOverlayState({
      viewState: "loading",
      overlayData: createEmptyMemberRankingOverlayData(bankCode),
      statusMessage: "",
    }),
    bankCode
  );

  const nextState = await fetchMemberRankingOverlayState({
    apiUrl,
    token: localStorage.getItem("token") || "",
    authProfile,
  });

  if (requestId !== activeRequestId) return;

  applyOverlayState(nextState, bankCode);
};

const closeOverlay = () => {
  emit("close");
};

const onBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    closeOverlay();
  }
};

const onEscape = (event) => {
  if (event.key === "Escape" && props.isOpen) {
    closeOverlay();
  }
};

const clearConfettiTimer = () => {
  if (confettiTimer) {
    window.clearTimeout(confettiTimer);
    confettiTimer = null;
  }
};

const fireConfetti = async () => {
  if (typeof window === "undefined") return;
  const colors = getConfettiColors(overallRank.value);
  const base = overallRank.value <= 3 ? 180 : 70;

  const shoot = (ratio, options) =>
    confetti({
      origin: { y: 0.62 },
      colors,
      zIndex: 140,
      particleCount: Math.floor(base * ratio),
      ...options,
    });

  shoot(0.25, { spread: 26, startVelocity: 55 });
  shoot(0.2, { spread: 60 });
  shoot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  shoot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  shoot(0.1, { spread: 120, startVelocity: 45 });
};

const scheduleConfetti = () => {
  if (viewState.value !== "ready" || confettiFired.value) {
    return;
  }

  confettiFired.value = true;

  if (typeof window !== "undefined") {
    clearConfettiTimer();
    confettiTimer = window.setTimeout(() => {
      void fireConfetti();
    }, 10);
  }
};

watch(
  () => props.isOpen,
  (value) => {
    if (value) {
      loadRanking();
      scheduleConfetti();
      return;
    }

    if (!value) {
      activeRequestId += 1;
      clearConfettiTimer();
      confettiFired.value = false;
      viewState.value = "idle";
      statusMessage.value = "";
    }
  },
  { immediate: true }
);

watch(
  viewState,
  (state) => {
    if (props.isOpen && state === "ready") {
      scheduleConfetti();
    }
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener("keydown", onEscape);
});

onBeforeUnmount(() => {
  clearConfettiTimer();
  window.removeEventListener("keydown", onEscape);
});

const overallRank = computed(() => {
  return (
    overlayData.value?.rankTotalAmount ||
    overlayData.value?.rankTotalCount ||
    overlayData.value?.rankFromAmount ||
    overlayData.value?.rankToAmount ||
    4
  );
});

const theme = computed(() =>
  viewState.value === "error" ? getStatusTheme() : getRankTheme(overallRank.value)
);

const overallSuffix = computed(() => getRankSuffix(overallRank.value));

const bankChipText = computed(
  () =>
    overlayData.value?.bankCode ||
    resolveStoredUserBankcode(readStoredAuthUserProfile()) ||
    "-"
);

const heroBankName = computed(() => overlayData.value?.bankName || "Member Bank");

const primaryActionLabel = computed(() => {
  if (viewState.value === "loading") return "Loading...";
  if (viewState.value === "error") return "Retry";
  return "Continue";
});

const overlayTitle = computed(() => {
  if (viewState.value === "loading") return "Loading Ranking";
  if (viewState.value === "error") return "Ranking Unavailable";
  if (viewState.value === "empty") return "Ranking Not Found";
  return "Congratulations";
});

const overlayDescription = computed(() => {
  if (viewState.value === "loading") {
    return "Preparing today's ranking before opening your dashboard.";
  }

  if (viewState.value === "error" || viewState.value === "empty") {
    return statusMessage.value;
  }

  return heroBankName.value;
});

const transactionVolumeCards = computed(() => [
  {
    key: "from-count",
    iconPath: FONT_AWESOME_ICON_PATHS.sent,
    label: "SENT",
    value: formatCount(overlayData.value?.fromCount),
    rank: overlayData.value?.rankFromCount || overallRank.value,
  },
  {
    key: "to-count",
    iconPath: FONT_AWESOME_ICON_PATHS.received,
    label: "RECEIVED",
    value: formatCount(overlayData.value?.toCount),
    rank: overlayData.value?.rankToCount || overallRank.value,
  },
  {
    key: "total-count",
    iconPath: FONT_AWESOME_ICON_PATHS.trend,
    label: "TOTAL",
    value: formatCount(overlayData.value?.totalCount),
    rank: overlayData.value?.rankTotalCount || overallRank.value,
    premium: true,
  },
]);

const transactionAmountCards = computed(() => [
  {
    key: "from-amount",
    iconPath: FONT_AWESOME_ICON_PATHS.sent,
    label: "SENT",
    unit: "LAK",
    value: formatMoneyAmount(overlayData.value?.fromAmount),
    rank: overlayData.value?.rankFromAmount || overallRank.value,
    precise: true,
  },
  {
    key: "to-amount",
    iconPath: FONT_AWESOME_ICON_PATHS.received,
    label: "RECEIVED",
    unit: "LAK",
    value: formatMoneyAmount(overlayData.value?.toAmount),
    rank: overlayData.value?.rankToAmount || overallRank.value,
    precise: true,
  },
  {
    key: "total-amount",
    iconPath: FONT_AWESOME_ICON_PATHS.trend,
    label: "TOTAL",
    unit: "LAK",
    value: formatMoneyAmount(overlayData.value?.totalAmount),
    rank: overlayData.value?.rankTotalAmount || overallRank.value,
    precise: true,
    premium: true,
  },
]);

const onPrimaryAction = () => {
  if (viewState.value === "loading") {
    return;
  }

  if (viewState.value === "error") {
    loadRanking({ preferPrefetched: false });
    return;
  }

  closeOverlay();
};
</script>

<template>
  <teleport to="body">
    <Transition name="overlay-fade">
      <div
        v-if="isOpen"
        class="overlay-backdrop"
        :style="{ backgroundColor: 'rgba(4,4,18,0.84)', backdropFilter: 'blur(20px)' }"
        @click="onBackdropClick"
      >
        <div
          class="overlay-glow"
          :style="{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 68%)` }"
        ></div>

        <Transition name="card-pop">
          <div
            v-if="isOpen"
            class="overlay-card"
            :style="{
              boxShadow: `0 32px 90px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px ${theme.glow}`,
            }"
          >
            <div
              class="top-shimmer"
              :style="{
                background: `linear-gradient(90deg, transparent, ${theme.from}99, ${theme.via}dd, ${theme.from}99, transparent)`,
              }"
            ></div>

            <button class="close-button" type="button" @click="closeOverlay" aria-label="Close overlay">
              <svg class="close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <div class="overlay-content">
              <div class="year-pill fade-down">
                <div class="year-pill-inner">
                  <div
                    class="year-dot"
                    :style="{ background: `linear-gradient(135deg,${theme.from},${theme.to})` }"
                  ></div>
                  <span>TODAY'S RANKINGS</span>
                </div>
              </div>

              <template v-if="viewState === 'ready'">
                <div class="hero-row">
                  <div class="rank-circle-wrapper fade-scale">
                    <div
                      class="rank-glow"
                      :style="{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 72%)` }"
                    ></div>
                    <div class="rank-outer-ring" :style="{ borderColor: `${theme.from}44` }"></div>
                    <div class="rank-inner-ring" :style="{ borderColor: `${theme.from}30` }"></div>
                    <div
                      class="rank-circle"
                      :style="{
                        background: `linear-gradient(145deg, ${theme.from}28, ${theme.to}4a)`,
                        borderColor: `${theme.from}70`,
                        boxShadow: `0 0 32px ${theme.glow}, inset 0 1px 0 ${theme.from}50`,
                      }"
                    >
                      <span
                        class="rank-circle-icon"
                        :style="{
                          ...createMaskedIconStyle(FONT_AWESOME_ICON_PATHS.trophy, theme.from, '18px'),
                          filter: `drop-shadow(0 0 6px ${theme.from})`,
                        }"
                      ></span>
                      <span
                        class="rank-value"
                        :style="{ background: `linear-gradient(155deg,${theme.from},${theme.via},${theme.to})` }"
                      >
                        #{{ overallRank }}
                      </span>
                      <span class="rank-place" :style="{ color: `${theme.labelColor}cc` }">
                        {{ overallRank }}{{ overallSuffix }} PLACE
                      </span>
                    </div>
                  </div>

                  <div class="hero-copy fade-right">
                    <p class="eyebrow">MEMBER BANK RANKING</p>
                    <h2>Congratulations</h2>
                    <p class="hero-bank-name">{{ heroBankName }}</p>
                    <div
                      class="bank-chip"
                      :style="{
                        background: `linear-gradient(135deg,${theme.from}18,${theme.to}28)`,
                        borderColor: `${theme.from}44`,
                      }"
                    >
                      <span
                        class="bank-chip-text"
                        :style="{ background: `linear-gradient(135deg,${theme.from},${theme.to})` }"
                      >
                        {{ bankChipText }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="divider"></div>

                <section class="stats-section fade-up" style="animation-delay: 0.18s;">
                  <div class="stats-heading">
                    <span
                      class="stats-heading-icon"
                      :style="createMaskedIconStyle(FONT_AWESOME_ICON_PATHS.chart, theme.labelColor, '14px')"
                    ></span>
                    <span>TRANSACTION COUNT</span>
                  </div>
                  <div class="stats-grid">
                    <div
                      v-for="card in transactionVolumeCards"
                      :key="card.key"
                      class="stat-card"
                      :class="{ 'stat-card-premium': card.premium }"
                    >
                      <span
                        class="stat-icon"
                        :style="createMaskedIconStyle(card.iconPath, 'rgba(255,255,255,0.35)', '14px')"
                      ></span>
                      <span class="stat-label">{{ card.label }}</span>
                      <span class="stat-value">{{ card.value }}</span>
                      <span
                        class="rank-badge"
                        :style="{
                          color: theme.labelColor,
                          borderColor: `${theme.labelColor}55`,
                          background: `${theme.labelColor}22`,
                        }"
                      >
                        #{{ card.rank }}
                      </span>
                    </div>
                  </div>
                </section>

                <section class="stats-section fade-up" style="animation-delay: 0.28s;">
                  <div class="stats-heading">
                    <span
                      class="stats-heading-icon"
                      :style="createMaskedIconStyle(FONT_AWESOME_ICON_PATHS.trend, theme.labelColor, '14px')"
                    ></span>
                    <span>TRANSACTION AMOUNT</span>
                  </div>
                  <div class="stats-grid">
                    <div
                      v-for="card in transactionAmountCards"
                      :key="card.key"
                      class="stat-card"
                      :class="{
                        'stat-card-premium': card.premium,
                        'stat-card-precise': card.precise,
                      }"
                    >
                      <span
                        class="stat-icon"
                        :style="createMaskedIconStyle(card.iconPath, 'rgba(255,255,255,0.35)', '14px')"
                      ></span>
                      <span class="stat-label">{{ card.label }}</span>
                      <span class="stat-unit">{{ card.unit }}</span>
                      <span class="stat-value" :class="{ 'stat-value-precise': card.precise }">
                        {{ card.value }}
                      </span>
                      <span
                        class="rank-badge"
                        :style="{
                          color: theme.labelColor,
                          borderColor: `${theme.labelColor}55`,
                          background: `${theme.labelColor}22`,
                        }"
                      >
                        #{{ card.rank }}
                      </span>
                    </div>
                  </div>
                </section>

                <div
                  class="summary-panel fade-up"
                  :style="{
                    background: `linear-gradient(135deg,${theme.from}12,${theme.to}20)`,
                    borderColor: `${theme.from}35`,
                  }"
                >
                  <div>
                    <p class="summary-label">TODAY TOTAL AMOUNT (LAK)</p>
                    <p class="summary-value summary-value-amount">
                      {{ formatMoneyAmount(overlayData?.totalAmount) }}
                    </p>
                  </div>
                  <div class="summary-right">
                    <p class="summary-label">TOTAL TXNS</p>
                    <p class="summary-value">{{ formatCount(overlayData?.totalCount) }}</p>
                  </div>
                  <div
                    class="summary-icon"
                    :style="{
                      background: `linear-gradient(135deg,${theme.from},${theme.to})`,
                      boxShadow: `0 4px 16px ${theme.glow}`,
                      color: theme.textColor,
                    }"
                  >
                    <span
                      class="summary-icon-glyph"
                      :style="createMaskedIconStyle(FONT_AWESOME_ICON_PATHS.trophy, theme.textColor, '18px')"
                    ></span>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="state-shell">
                  <div
                    class="state-circle"
                    :style="{
                      background: `linear-gradient(145deg, ${theme.from}20, ${theme.to}36)`,
                      borderColor: `${theme.from}66`,
                      boxShadow: `0 0 32px ${theme.glow}, inset 0 1px 0 ${theme.from}40`,
                    }"
                  >
                    <div v-if="viewState === 'loading'" class="loader-bars">
                      <span class="loader-bar loader-bar-sm"></span>
                      <span class="loader-bar loader-bar-md"></span>
                      <span class="loader-bar loader-bar-lg"></span>
                    </div>
                    <svg
                      v-else
                      class="status-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      :style="{ color: theme.from }"
                    >
                      <path
                        d="M12 8V12M12 16H12.01M10.29 3.86L1.82 18C1.64 18.3122 1.55 18.6671 1.56 19.0267C1.57 19.3863 1.68 19.7359 1.88 20.0376C2.09 20.3393 2.4 20.5808 2.76 20.7359C3.11 20.891 3.5 20.9525 3.88 20.91H20.12C20.5 20.9525 20.89 20.891 21.24 20.7359C21.6 20.5808 21.91 20.3393 22.12 20.0376C22.32 19.7359 22.43 19.3863 22.44 19.0267C22.45 18.6671 22.36 18.3122 22.18 18L13.71 3.86C13.51 3.57176 13.24 3.33973 12.92 3.18362C12.61 3.02752 12.26 2.95215 12 2.96453C11.74 2.95215 11.39 3.02752 11.08 3.18362C10.76 3.33973 10.49 3.57176 10.29 3.86Z"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>

                  <div class="state-copy">
                    <p class="eyebrow">MEMBER BANK RANKING</p>
                    <h2>{{ overlayTitle }}</h2>
                    <p class="state-description">{{ overlayDescription }}</p>
                    <div
                      class="bank-chip"
                      :style="{
                        background: `linear-gradient(135deg,${theme.from}18,${theme.to}28)`,
                        borderColor: `${theme.from}44`,
                      }"
                    >
                      <span
                        class="bank-chip-text"
                        :style="{ background: `linear-gradient(135deg,${theme.from},${theme.to})` }"
                      >
                        {{ bankChipText }}
                      </span>
                    </div>
                  </div>
                </div>
              </template>

              <div class="actions fade-up" style="animation-delay: 0.5s;">
                <button class="secondary-button" type="button" @click="closeOverlay">Close</button>
                <button
                  class="primary-button"
                  type="button"
                  :disabled="viewState === 'loading'"
                  :style="{
                    background: `linear-gradient(135deg,${theme.from},${theme.via} 55%,${theme.to})`,
                    color: theme.textColor,
                    boxShadow: `0 4px 20px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.28)`,
                  }"
                  @click="onPrimaryAction"
                >
                  {{ primaryActionLabel }}
                </button>
              </div>
            </div>

            <div
              class="bottom-shimmer"
              :style="{ background: `linear-gradient(90deg,transparent,${theme.from}40,transparent)` }"
            ></div>
          </div>
        </Transition>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped>
.overlay-backdrop {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

.overlay-glow {
  position: absolute;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -58%);
  filter: blur(40px);
  pointer-events: none;
}

.overlay-card {
  position: relative;
  width: 100%;
  max-width: 560px;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  background: linear-gradient(150deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.03) 100%);
  backdrop-filter: blur(24px);
}

.top-shimmer,
.bottom-shimmer {
  position: absolute;
  height: 1px;
  z-index: 2;
}

.top-shimmer {
  top: 0;
  left: 8%;
  width: 84%;
}

.bottom-shimmer {
  bottom: 0;
  left: 20%;
  width: 60%;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.45);
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: rgba(255,255,255,0.13);
  color: #ffffff;
}

.close-icon {
  width: 16px;
  height: 16px;
}

.overlay-content {
  padding: 32px 28px 28px;
}

.year-pill {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.year-pill-inner {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.055);
  border: 1px solid rgba(255,255,255,0.1);
}

.year-pill-inner span {
  color: rgba(255,255,255,0.5);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.09em;
}

.year-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.hero-row,
.state-shell {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.rank-circle-wrapper {
  position: relative;
  flex-shrink: 0;
}

.rank-glow,
.rank-outer-ring,
.rank-inner-ring {
  position: absolute;
  border-radius: 50%;
}

.rank-glow {
  inset: -14px;
  filter: blur(12px);
}

.rank-outer-ring {
  inset: -8px;
  border: 1px solid;
}

.rank-inner-ring {
  inset: -2px;
  border: 1px solid;
}

.rank-circle,
.state-circle {
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
}

.rank-circle-icon {
  display: block;
  width: 18px;
  height: 18px;
}

.rank-value,
.bank-chip-text {
  background-clip: text !important;
  -webkit-background-clip: text !important;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.rank-value {
  font-size: 36px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
}

.rank-place {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-align: center;
}

.hero-copy,
.state-copy {
  flex: 1;
  min-width: 0;
}

.hero-copy .eyebrow,
.state-copy .eyebrow,
.stats-heading span:last-child,
.summary-label {
  color: rgba(255,255,255,0.38);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.07em;
}

.hero-copy .eyebrow,
.state-copy .eyebrow {
  margin-bottom: 4px;
  font-size: 11px;
  letter-spacing: 0.09em;
}

.hero-copy h2,
.state-copy h2 {
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.hero-bank-name,
.state-description {
  margin: 0 0 10px;
  color: rgba(255,255,255,0.62);
  font-size: 13px;
  line-height: 1.5;
}

.bank-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 10px;
  border: 1px solid;
}

.bank-chip-text {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.04em;
}

.divider {
  height: 1px;
  background: rgba(255,255,255,0.07);
  margin-bottom: 20px;
}

.stats-section {
  margin-bottom: 16px;
}

.stats-heading {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.stats-heading-icon {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.stats-grid {
  display: flex;
  gap: 8px;
}

.stat-card {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
}

.stat-card-premium {
  background: rgba(255, 255, 255, 0.04);
  box-shadow: none;
}

.stat-card-precise {
  align-items: center;
}

.stat-icon {
  display: block;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 2px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.stat-label {
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-align: center;
}

.stat-unit {
  color: rgba(255, 255, 255, 0.25);
  font-size: 9px;
  letter-spacing: 0.06em;
}

.stat-value {
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.1;
  text-align: center;
}

.stat-value-precise {
  font-size: 13px;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.summary-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 8px 0 22px;
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid;
}

.summary-value {
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.summary-value-amount {
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.summary-right {
  text-align: right;
}

.summary-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.summary-icon-glyph {
  display: block;
  width: 18px;
  height: 18px;
}

.actions {
  display: flex;
  gap: 10px;
}

.secondary-button,
.primary-button {
  height: 46px;
  border-radius: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
  font-size: 14px;
}

.secondary-button {
  flex: 1;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.55);
  font-weight: 600;
}

.secondary-button:hover {
  background: rgba(255,255,255,0.11);
  color: rgba(255,255,255,0.85);
}

.primary-button {
  flex: 1.7;
  border: none;
  font-weight: 700;
}

.primary-button:hover:not(:disabled) {
  opacity: 0.87;
  transform: translateY(-1px);
}

.primary-button:disabled {
  opacity: 0.72;
  cursor: default;
}

.loader-bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
}

.loader-bar {
  width: 8px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.32));
  animation: loader-bounce 1s ease-in-out infinite;
}

.loader-bar-sm {
  height: 22px;
}

.loader-bar-md {
  height: 34px;
  animation-delay: 0.12s;
}

.loader-bar-lg {
  height: 48px;
  animation-delay: 0.24s;
}

.status-icon {
  width: 34px;
  height: 34px;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.35s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.card-pop-enter-active,
.card-pop-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.card-pop-enter-from,
.card-pop-leave-to {
  opacity: 0;
  transform: translateY(18px) scale(0.96);
}

.fade-down,
.fade-right,
.fade-scale,
.fade-up {
  animation-duration: 0.55s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
}

.fade-down {
  animation-name: fadeDown;
}

.fade-right {
  animation-name: fadeRight;
}

.fade-scale {
  animation-name: fadeScale;
}

.fade-up {
  animation-name: fadeUp;
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(12px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeScale {
  from {
    opacity: 0;
    transform: scale(0.92);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes loader-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.55;
  }

  50% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .overlay-content {
    padding: 28px 20px 20px;
  }

  .hero-row,
  .state-shell {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }

  .rank-circle-wrapper {
    display: flex;
    justify-content: center;
  }

  .stats-grid,
  .actions,
  .summary-panel {
    flex-direction: column;
  }

  .summary-right {
    text-align: left;
  }

  .bank-chip {
    justify-content: center;
  }

  .summary-icon {
    align-self: flex-start;
  }
}
</style>
