<template>
  <div>
    <!-- Toast Notification -->
    <div
      v-if="toast.show"
      :class="[
        'fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white transition-all',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>
    <div class="max-w-5xl mx-auto mt-8">
      <h2 class="text-2xl text-gray-600 text-center text-bold">Add Country</h2>
      <form @submit.prevent="sendToApi" class="mt-4 space-y-2">
        <div>
          <label for="country" class="text-gray-600 block mb-1">Country</label>
          <input type="text" id="country" v-model="country" class="w-full px-2 py-1 border border-gray-300 rounded" />
        </div>

        <div>
          <label for="countrycode" class="text-gray-600 block mb-1">Country Code:</label>
          <input type="text" id="countrycode" v-model="countryCode" class="w-full px-2 py-1 border border-gray-300 rounded" />
        </div>
       
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">Send</button>
      </form>
      <table class="w-full mt-4 table-auto border border-gray-300">
  <thead>
    <tr>
      <th class="text-left bg-gray-800 text-white border border-gray-300 px-3 py-2">No</th>
      <th class="text-left bg-gray-800 text-white border border-gray-300 px-3 py-2">Country</th>
      <th class="text-left bg-gray-800 text-white border border-gray-300 px-3 py-2">Country Code</th>
    </tr>
  </thead>
  <tbody>
    <tr
      v-for="(country, index) in paginatedCountrys"
      :key="country.id"
      class="odd:bg-gray-50 even:bg-white"
    >
      <td class="border border-gray-300 px-3 py-2">
        {{ (currentPage - 1) * rowsPerPage + index + 1 }}
      </td>
      <td class="border border-gray-300 px-3 py-2">
        {{ country.country }}
      </td>
      <td class="border border-gray-300 px-3 py-2">
        {{ country.countryCode }}
      </td>
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
import { buildApiUrl } from '@/config/api';

const apiUrl = buildApiUrl('/api', 'base1');

export default {
  data() {
    return {
      country: '',
      countryCode: '',
      countrys: [],
      toast: {
        show: false,
        message: '',
        type: 'success', // 'success' or 'error'
      },
      currentPage: 1,
      rowsPerPage: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.countrys.length / this.rowsPerPage) || 1;
    },
    paginatedCountrys() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return this.countrys.slice(start, start + this.rowsPerPage);
    }
  },
  methods: {
    showToast(message, type = 'success') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => {
        this.toast.show = false;
      }, 2500);
    },
    async fetchCountrys() {
      try {
        const response = await axios.get(`${apiUrl}/crossborder`);
        this.countrys = response.data;
        console.log('data', this.countrys);
        this.currentPage = 1;
        this.showToast('Loaded Country Code successfully!', 'success');
      } catch (error) {
        console.error(error);
        this.showToast('Failed to load Country Code.', 'error');
      }
    },
    async sendToApi() {
      if (!this.country.trim()) {
        this.showToast('Please fill in Country Code.', 'error');
        return;
      }

      if (!apiUrl) {
        this.showToast('API URL is not configured', 'error');
        return;
      }

      try {
        await axios.post(`${apiUrl}/crossborder`, {
          country: this.country,
          countryCode: this.countryCode
        });
        this.country = ''; // ✅ reset input, not the whole list
        this.countryCode = '';
        this.showToast('Country Code added successfully!', 'success');
        this.fetchCountrys(); // reload list
      } catch (error) {
        console.error('API Error:', error);
        this.showToast((error.response?.data?.message || error.message), 'error');
      }
    },
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    }
  },
  mounted() {
    this.fetchCountrys();
  }
};
</script>

<link rel="stylesheet" href="/src/assets/css/tailwind.css">
