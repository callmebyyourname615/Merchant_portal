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
            <h2 class="text-3xl font-semibold tracking-tight text-slate-900">Dashboard Overview</h2>
        
          </div>
        </div>

        <div class="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm sm:self-auto">
          <a href="#" class="font-semibold text-sky-700 transition-colors hover:text-sky-800">Home</a>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-slate-600">Dashboard</span>
        </div>
      </div>
    </div>

    <div class="relative grid grid-cols-1 gap-5 px-4 mt-6 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
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
        <div class="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-sky-100/70 blur-2xl"></div>
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400"></div>

        <div class="relative flex h-full flex-col justify-between gap-6">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700/80">
                Active Merchants
              </p>
              <h3 class="max-w-[15rem] text-sm font-medium leading-6 text-slate-500">
                Total Merchants (Real merchants)
              </h3>
            </div>
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-500 shadow-[0_12px_28px_rgba(37,99,235,0.28)] ring-1 ring-white/70">
              <img
                src="/fontawesome/store-solid-full.svg"
                alt="Active merchant icon"
                class="h-7 w-7 invert brightness-0"
              />
            </div>
          </div>

          <div class="flex items-end justify-between gap-4">
            <p class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2rem]">
              {{ totalMerchantActive.toLocaleString() }}
            </p>
            <span class="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700">
              Active
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

      <div class="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]">
        <div class="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-100/70 blur-2xl"></div>
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 via-violet-500 to-blue-500"></div>

        <div class="relative flex h-full flex-col justify-between gap-6">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-3">
              <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo-700/80">
                Cross-Border
              </p>
              <h3 class="max-w-[15rem] text-sm font-medium leading-6 text-slate-500">
                Total Merchant Receive Crossborder
              </h3>
            </div>
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-600 shadow-[0_12px_28px_rgba(79,70,229,0.28)] ring-1 ring-white/70">
              <img
                src="/fontawesome/earth-asia-solid-full.svg"
                alt="Crossborder icon"
                class="h-7 w-7 invert brightness-0"
              />
            </div>
          </div>

          <div class="flex items-end justify-between gap-4">
            <p class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2rem]">
              {{ totalMerchantReceiveCrossborder.toLocaleString() }}
            </p>
            <span class="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700">
              Crossborder
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="relative grid grid-cols-1 gap-5 px-4 mt-6 lg:grid-cols-3 sm:px-8">
      <div class="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/60 sm:px-6 sm:py-6">
        <div class="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-sky-100/70 blur-3xl"></div>

        <div class="relative">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Trend
          </p>
          <h3 class="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Monthly Count
          </h3>
        </div>

        <div class="relative mt-5 overflow-hidden rounded-[22px] border border-slate-200/70 bg-slate-50/80 p-2">
          <apexchart type="area" :height="300" :options="pageViewOptions" :series="pageViewSeries"></apexchart>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/60 sm:px-6 sm:py-6">
        <div class="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-100/70 blur-3xl"></div>

        <div class="relative">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Distribution
          </p>
          <h3 class="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Member Merchants
          </h3>
        </div>

        <div class="relative mt-5 overflow-hidden rounded-[22px] border border-slate-200/70 bg-slate-50/80 p-2">
          <apexchart type="donut" :height="300" :options="sessionsOptions" :series="sessionsSeries"></apexchart>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/60 sm:px-6 sm:py-6">
        <div class="pointer-events-none absolute right-10 top-0 h-32 w-32 rounded-full bg-emerald-100/70 blur-3xl"></div>

        <div class="relative">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Province Overview
          </p>
          <h3 class="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Merchants
          </h3>
        </div>

        <div class="relative mt-5 overflow-hidden rounded-[22px] border border-slate-200/70 bg-slate-50/80 p-2">
          <div class="overflow-y-auto max-h-80 rounded-[18px] bg-white">
            <table class="table-auto min-w-full divide-y divide-slate-200">
              <thead class="sticky top-0 z-10 bg-slate-50">
                <tr>
                  <th scope="col" class="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Province
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-sm text-slate-500">
                <tr v-for="(item, index) in provinces" :key="index" class="transition-colors hover:bg-slate-50/80">
                  <td class="px-4 py-3 font-medium text-slate-600">{{ item.Province }}</td>
                  <td class="px-4 py-3">{{ item.count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import topAuthors from '@/data/home/topAuthors.json'
import recentSales from '@/data/home/recentSales.json'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { buildApiUrl } from '@/config/api'

export default {
  components: {
    apexchart: VueApexCharts,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },

  setup() {
    const totalMembers = ref(0)
    const totalMerchantActive = ref(0)
    const totalMerchantInactive = ref(0)
    const totalMerchantReceiveCrossborder = ref(0)
    const userRole = computed(() => localStorage.getItem('role') || '')

    const sessionsSeries = ref([])
    const sessionsOptions = ref({
      chart: { type: 'donut' },
      labels: [],
      colors: [],
      legend: { position: 'bottom' },
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => {
          const count = opts.w.config.series[opts.seriesIndex]
          return `${count}`
        },
        style: { fontSize: '14px' },
      },
      tooltip: {
        y: { formatter: (val) => `${val} merchants` },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 320 },
            legend: { position: 'bottom' },
          },
        },
      ],
    })

    const pageViewSeries = ref([{ name: 'Page view', data: [] }])
    const pageViewOptions = ref({
      chart: { id: 'pageview-chart', toolbar: { show: false }, zoom: { enabled: false } },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      xaxis: { categories: [] },
      tooltip: { enabled: true },
    })

    const apiUrl = buildApiUrl('/api', 'base1')

    function formatMonthLabel(monthDayStr) {
      const [month, day] = monthDayStr.split('-')
      const fakeYear = new Date().getFullYear()
      const date = new Date(fakeYear, Number(month) - 1, Number(day))
      return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
    }



    const fetchMonthlyCounts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/records/monthly-count`)
        const categories = res.data.map(item => formatMonthLabel(item.day))
        const counts = res.data.map(item => Number(item.total))

        pageViewOptions.value = {
          ...pageViewOptions.value,
          xaxis: {
            ...pageViewOptions.value.xaxis,
            categories,
            labels: { rotate: -45 } // optional: tilt labels if many days
          }
        }

        pageViewSeries.value = [{ name: 'Page view', data: counts }]
      } catch (error) {
        console.error('Error fetching monthly count:', error)
      }
    }



    const fetchTotalMembers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count`)
        totalMembers.value = Number(response.data[0]?.count) || 0
      } catch (error) {
        console.error('Fetch total members error:', error)
        totalMembers.value = 0
        alert('Error fetching total members: ' + (error.response?.data?.message || error.message))
      }
    }

    const fetchTotalMerchantActive = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count-unique-merchants`)
        totalMerchantActive.value = Number(response.data.count) || 0
      } catch (error) {
        console.error('Fetch total active merchants error:', error)
        totalMerchantActive.value = 0
        alert('Error fetching total merchants: ' + (error.response?.data?.message || error.message))
      }
    }

    const fetchTotalMerchantInactive = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count-status-inactive`)
        totalMerchantInactive.value = Number(response.data[0]?.count) || 0
      } catch (error) {
        console.error('Fetch total inactive merchants error:', error)
        totalMerchantInactive.value = 0
        alert('Error fetching inactive merchants: ' + (error.response?.data?.message || error.message))
      }
    }

    const fetchTotalMerchantReceiveCrossborder = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count-support-cross-border`)
        totalMerchantReceiveCrossborder.value = Number(response.data[0]?.count) || 0
      } catch (error) {
        console.error('Fetch crossborder merchants error:', error)
        totalMerchantReceiveCrossborder.value = 0
        alert('Error fetching crossborder merchants: ' + (error.response?.data?.message || error.message))
      }
    }

    const provinces = ref([])

    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count-by-provinces`)
        provinces.value = response.data || []
      } catch (error) {
        console.error('Fetch provinces error:', error)
        provinces.value = []
      }
    }


    const fetchMemberMerchants = async () => {
      try {
        const response = await axios.get(`${apiUrl}/records/count-member-merchants`)
        const labels = response.data.map((item) => item.bankcode || 'Unknown')
        const series = response.data.map((item) => Number(item.count) || 0)

        const bankColors = [
          '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6',
          '#14B8A6', '#F43F5E', '#EAB308', '#A855F7', '#22C55E', '#0EA5E9',
        ]
        const colors = labels.map((_, i) => bankColors[i % bankColors.length])

        sessionsSeries.value = series
        sessionsOptions.value = { ...sessionsOptions.value, labels, colors }
      } catch (error) {
        console.error('Fetch member merchants error:', error)
        sessionsSeries.value = []
        sessionsOptions.value = { ...sessionsOptions.value, labels: [], colors: [] }
        alert('Error fetching member merchants: ' + (error.response?.data?.message || error.message))
      }
    }

    onMounted(() => {
      fetchTotalMembers()
      fetchTotalMerchantActive()
      fetchTotalMerchantInactive()
      fetchTotalMerchantReceiveCrossborder()
      fetchMemberMerchants()
      fetchProvinces()
      fetchMonthlyCounts()
    })

    return {
      userRole,
      totalMembers,
      totalMerchantActive,
      totalMerchantInactive,
      totalMerchantReceiveCrossborder,
      pageViewOptions,
      pageViewSeries,
      sessionsOptions,
      sessionsSeries,
      topAuthors,
      recentSales,
      provinces,
    }
  },
}
</script>
