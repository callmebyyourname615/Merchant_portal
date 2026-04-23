<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Sign in to Merchant Portal</h2>

      <div v-if="errorMsg" class="mb-4 text-red-600 text-center">{{ errorMsg }}</div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="relative text-gray-400">
          <input
            id="email"
            name="email"
            type="email"
            v-model="email"
            :readonly="readonly"
            autocomplete="off"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-4 border border-gray-300
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Email address"
            required
          />
        </div>

        <div class="relative text-gray-400">
          <input
            id="password"
            name="password"
            type="password"
            v-model="password"
            :readonly="readonly"
            autocomplete="new-password"
            class="w-full py-4 text-sm text-gray-900 rounded-md pl-4 border border-gray-300
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Password"
            required
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 cursor-pointer">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative w-full flex justify-center py-4 px-6 border border-transparent
              font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500
              focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed
              transition"
          >
            {{ isSubmitting ? "Preparing dashboard..." : "Sign in" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { buildApiUrl } from "@/config/api";
import {
  clearQueuedMemberRankingOverlay,
  fetchMemberRankingOverlayState,
  queueMemberRankingOverlay,
  writeTransactionTodayRankingCardCache,
  writeStoredAuthUserProfile,
} from "@/utils/memberRankingOverlay";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "",
      readonly: true,
      isSubmitting: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.readonly = false;
    }, 100);

    if (this.$route.query.expired === "true") {
      this.errorMsg = "Your session has expired. Please log in again.";
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.email = "";
      vm.password = "";
      if (!vm.errorMsg) vm.errorMsg = "";
    });
  },
  methods: {
    async handleSubmit() {
      if (this.isSubmitting) return;

      try {
        this.isSubmitting = true;
        this.errorMsg = "";
        const apiUrl = buildApiUrl("/api", "base1");
        const rankingApiUrl = buildApiUrl("/api", "base2");
        if (!apiUrl) {
          this.errorMsg = "API URL is not configured";
          return;
        }

        const response = await axios.post(`${apiUrl}/auth/login`, {
          email: this.email,
          password: this.password,
        });

        const { access_token, role, bankcode, username, memberId } = response.data;
        const normalizedRole = (role || "").toLowerCase();

        if (!["user", "admin", "manager"].includes(normalizedRole)) {
          this.errorMsg = "Invalid role received from server";
          return;
        }

        const expiresIn = 60 * 60 * 1000;
        const expiryTime = new Date().getTime() + expiresIn;

        localStorage.setItem("token", access_token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", normalizedRole);
        localStorage.setItem("bankcode", bankcode || "");
        localStorage.setItem("iin", response.data.iin || "");
        localStorage.setItem("tokenExpiry", expiryTime);
        localStorage.setItem("memberId", memberId || "");
        writeStoredAuthUserProfile(response.data);

        if (normalizedRole === "user") {
          const overlayState = await fetchMemberRankingOverlayState({
            apiUrl: rankingApiUrl,
            token: access_token,
            authProfile: response.data,
            timeoutMs: 5000,
          });

          writeTransactionTodayRankingCardCache(bankcode || "", overlayState);
          queueMemberRankingOverlay({
            role: normalizedRole,
            bankcode: bankcode || "",
            overlayState,
          });
          this.$router.push({ name: "transaction" });
        } else {
          clearQueuedMemberRankingOverlay();
          this.$router.push({ name: "dashboard" });
        }
      } catch (error) {
        this.errorMsg = error.response?.data?.message || "Login failed";
        console.error("Login error:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
