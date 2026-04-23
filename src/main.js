import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import router from '@/router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import axios from 'axios'
import { buildApiUrl } from '@/config/api'

// Simple token helpers
function saveTokens(access, refresh) {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
}

function getAccessToken() {
  return localStorage.getItem('access_token')
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}

function clearTokens() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

// Auto logout after inactivity
let inactivityTimer
let refreshIntervalId
let lastActivity = Date.now()

const INACTIVITY_LIMIT = 10 * 60 * 1000 // 10 นาที
const REFRESH_INTERVAL = 60 * 1000 // 1 นาที
const apiUrl = buildApiUrl('/api', 'base1')

function logout() {
  clearTokens()
  stopTokenRefresh()
  router.push('/login')
}

function resetInactivityTimer() {
  lastActivity = Date.now()
  clearTimeout(inactivityTimer)
  inactivityTimer = setTimeout(() => {
    logout()
  }, INACTIVITY_LIMIT)
}

function startTokenRefresh() {
  if (refreshIntervalId) return // ป้องกันซ้ำ
  refreshIntervalId = setInterval(async () => {
    const refreshToken = getRefreshToken()
    const now = Date.now()

    if (now - lastActivity > INACTIVITY_LIMIT) {
      logout()
      return
    }

    if (refreshToken) {
      try {
        const res = await axios.post(`${apiUrl}/auth/refresh`, {
          refresh_token: refreshToken
        })
        saveTokens(res.data.access_token, refreshToken)
      } catch (err) {
        logout()
      }
    }
  }, REFRESH_INTERVAL)
}

function stopTokenRefresh() {
  clearInterval(refreshIntervalId)
  refreshIntervalId = null
}

// Watch for user activity
;['mousemove', 'mousedown', 'keypress', 'touchstart', 'click'].forEach((evt) => {
  window.addEventListener(evt, resetInactivityTimer)
})

resetInactivityTimer()
startTokenRefresh()


const app = createApp(App)

app.use(router)
app.use(Toast, {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
})

app.mount('#app')
