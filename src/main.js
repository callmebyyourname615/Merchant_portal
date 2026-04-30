import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import router from '@/router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const INACTIVITY_LIMIT = 10 * 60 * 1000 // 10 นาที
const AUTH_STORAGE_KEYS = ['token', 'tokenExpiry']

let inactivityTimer

function logout() {
  AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
  router.push('/login')
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer)
  inactivityTimer = setTimeout(() => {
    logout()
  }, INACTIVITY_LIMIT)
}

;['mousemove', 'mousedown', 'keypress', 'touchstart', 'click'].forEach((evt) => {
  window.addEventListener(evt, resetInactivityTimer)
})

resetInactivityTimer()


const app = createApp(App)

app.use(router)
app.use(Toast, {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
})

app.mount('#app')
