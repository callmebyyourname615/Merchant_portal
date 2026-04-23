<template>
  <div class="bg-gray-100 px-4 pt-4">
    <!-- Toast Notification -->
    <div
      v-if="toast.show"
      :class="[
        'fixed top-6 right-6 z-50 px-4 py-2 rounded-lg shadow-lg text-white font-semibold transition-all duration-300',
        {
          'bg-green-500': toast.type === 'success',
          'bg-red-500': toast.type === 'error',
          'bg-blue-500': toast.type === 'info'
        }
      ]"
    >
      {{ toast.message }}
    </div>
    <div class="max-w-5xl mx-auto mt-8">
      <h2 class="text-2xl text-gray-600 text-left font-bold">Add User</h2>
      <form @submit.prevent="sendToApi" autocomplete="off" class="mt-4 space-y-4">
        <div>
          <label class="block text-gray-700 mb-1 text-sm font-medium">Bank</label>
          <select
            v-model="form.bankId"
            class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">Select Bank</option>
            <option v-for="member in members" :key="member.id" :value="member.id">
              {{ member.banks }} ({{ member.bankcode }})
            </option>
          </select>
        </div>
        <div>
          <label for="usernameInput" class="block text-gray-700 mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            id="usernameInput"
            v-model="form.username"
            autocomplete="off"
            class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="emailInput" class="block text-gray-700 mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            id="emailInput"
            v-model="form.email"
            autocomplete="off"
            class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="passwordInput" class="block text-gray-700 mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            id="passwordInput"
            v-model="form.password"
            autocomplete="new-password"
            class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-gray-700 mb-1 text-sm font-medium">Role</label>
          <select
            v-model="form.role"
            class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 text-sm transition"
        >
          <span v-if="loading">Submitting...</span>
          <span v-else>Send</span>
        </button>
      </form>
      <table class="w-full mt-6 table-auto border border-gray-300">
        <thead>
          <tr class="bg-gray-800 text-white">
            <th class="text-left border border-gray-300 px-3 py-2 text-sm">No</th>
            <th class="text-left border border-gray-300 px-3 py-2 text-sm">Bank Code</th>
            <th class="text-left border border-gray-300 px-3 py-2 text-sm">Username</th>
            <th class="text-left border border-gray-300 px-3 py-2 text-sm">Email</th>
            <th class="text-left border border-gray-300 px-3 py-2 text-sm">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in paginatedUsers"
            :key="user.id"
            class="odd:bg-gray-50 even:bg-white"
          >
            <td class="border border-gray-300 px-3 py-2 text-sm">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>
            <td class="border border-gray-300 px-3 py-2 text-sm">{{ user.member?.bankcode || 'Unknown' }}</td>
            <td class="border border-gray-300 px-3 py-2 text-sm">{{ user.username }}</td>
            <td class="border border-gray-300 px-3 py-2 text-sm">{{ user.email }}</td>
            <td class="border border-gray-300 px-3 py-2 text-sm">{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination Controls -->
      <div class="flex justify-end mt-2">
        <nav class="inline-flex items-center space-x-1">
          <button
            class="px-2 py-1 rounded hover:bg-gray-200"
            :disabled="currentPage === 1"
            @click="goToPage(1)"
          >&laquo;</button>
          <button
            class="px-2 py-1 rounded hover:bg-gray-200"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >&lt;</button>
          <button
            v-for="page in totalPages"
            :key="page"
            class="px-3 py-1 rounded"
            :class="page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'"
            @click="goToPage(page)"
          >{{ page }}</button>
          <button
            class="px-2 py-1 rounded hover:bg-gray-200"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >&gt;</button>
          <button
            class="px-2 py-1 rounded hover:bg-gray-200"
            :disabled="currentPage === totalPages"
            @click="goToPage(totalPages)"
          >&raquo;</button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { nextTick } from 'vue';
import { buildApiUrl } from '@/config/api';

const apiUrl = buildApiUrl('/api', 'base1');

export default {
  data() {
    return {
      loading: false,
      members: [],
      users: [],
      currentPage: 1,
      rowsPerPage: 5,
      toast: {
        show: false,
        message: '',
        type: 'success'
      },
      form: {
        bankId: '',
        username: '',
        email: '',
        password: '',
        role: ''
      }
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.rowsPerPage) || 1;
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return this.users.slice(start, start + this.rowsPerPage);
    }
  },
  methods: {
    showToast(message, type = 'success') {
      this.toast = { show: true, message, type };
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
      console.log(`${type.toUpperCase()}: ${message}`);
    },
    resetForm() {
      this.form = {
        bankId: '',
        username: '',
        email: '',
        password: '',
        role: ''
      };
      console.log('Form reset on mount:', this.form); // Debug form state
    },
    async fetchMembers() {
      if (!apiUrl) {
        this.showToast('API URL is not configured', 'error');
        return;
      }
      try {
        this.showToast('Fetching bank codes...', 'info');
        const response = await axios.get(`${apiUrl}/members`);
        this.members = response.data;
        this.showToast('Bank codes loaded successfully', 'success');
      } catch (error) {
        console.error('Error fetching members:', error);
        this.showToast('Failed to fetch bank codes: ' + (error.response?.data?.message || error.message), 'error');
      }
    },
    async fetchUsers() {
      if (!apiUrl) {
        this.showToast('API URL is not configured', 'error');
        return;
      }
      try {
        this.showToast('Fetching users...', 'info');
        const response = await axios.get(`${apiUrl}/users`);
        this.users = response.data;
        this.currentPage = 1;
        this.resetForm(); // Reset form after fetching users
        this.showToast('Users loaded successfully', 'success');
      } catch (error) {
        console.error('Error fetching users:', error);
        this.showToast('Failed to load users: ' + (error.response?.data?.message || error.message), 'error');
      }
    },
    async sendToApi() {
      if (!this.form.bankId || !this.form.username || !this.form.email || !this.form.password || !this.form.role) {
        this.showToast('Please fill in all fields', 'error');
        return;
      }

      if (!apiUrl) {
        this.showToast('API URL is not configured', 'error');
        return;
      }

      const memberId = parseInt(this.form.bankId, 10);
      if (isNaN(memberId)) {
        this.showToast('Invalid bank selection', 'error');
        return;
      }

      this.loading = true;
      this.showToast('Submitting user data...', 'info');
      try {
        const payload = {
          memberId,
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          role: this.form.role
        };
        console.log('Sending payload:', payload); // Debug payload
        const response = await axios.post(`${apiUrl}/users`, payload);
        this.showToast(response.data.message || 'User added successfully', response.data.status || 'success');
        this.resetForm();
        this.fetchUsers();
      } catch (error) {
        this.showToast('Error adding user: ' + (error.response?.data?.message || error.message), 'error');
      } finally {
        this.loading = false;
      }
    },
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    }
  },
  mounted() {
    this.resetForm(); // Ensure form is reset on mount
    nextTick(() => {
      // Force DOM update to clear inputs
      document.getElementById('usernameInput').value = '';
      document.getElementById('emailInput').value = '';
      document.getElementById('passwordInput').value = '';
      console.log('DOM inputs cleared:', {
        username: document.getElementById('usernameInput').value,
        email: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value
      });
    });
    this.fetchMembers();
    this.fetchUsers();
  }
};
</script>

<style>
@import '/src/assets/css/tailwind.css';
</style>
