```vue
<template>
  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <h2 class="text-2xl text-gray-600">Merchant List</h2>

    <div class="flex items-center space-x-1 text-xs">
      <router-link to="/" class="font-bold text-indigo-700">Home</router-link>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600">Merchant</span>
    </div>
  </div>

  <div class="px-4 mt-8 sm:px-8">
    <div class="p-4 bg-white rounded">
      <div class="flex justify-between">
        <div>
          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input id="search" name="search" type="search" v-model="searchQuery" @input="resetToFirstPage"
              class="w-full py-2 text-sm text-gray-900 rounded-md pl-10 border border-gray-300 focus:outline-none focus:ring-gray-500 focus:ring-gray-500 focus:z-10"
              placeholder="Search by Bank Code, IIN, Merchant Name, or Status" />
          </div>
        </div>
      </div>
      <div v-if="displayedMerchants.length === 0" class="text-center text-gray-500 mt-4">
        No merchants found
      </div>
      <table v-else class="w-full mt-2 text-gray-500">
        <thead class="border-b">
          <tr>
            <th class="text-left text-gray-600">Bank Code</th>
            <th class="text-left text-gray-600">Merchant Name Lao</th>
            <th class="text-left text-gray-600">Merchant Name Eng</th>
            <th class="text-left text-gray-600">Village</th>
            <th class="text-left text-gray-600">District</th>
            <th class="text-left text-gray-600">Province</th>
            <th class="text-left text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="merchant in displayedMerchants" :key="merchant.iin">
            <td class="py-4">{{ merchant.bankcode }}</td>
            <td>{{ merchant.merchantnameLa }}</td>
            <td>{{ merchant.merchantnameEn }}</td>
            <td>{{ merchant.Village }}</td>
            <td>{{ merchant.District }}</td>
            <td>{{ merchant.Province }}</td>
            <td>
              <span
                :class="merchant.status ? 'px-2 py-1 rounded text-xs text-white bg-green-500' : 'px-2 py-1 rounded text-xs text-white bg-red-500'">
                {{ merchant.status ? 'Active' : 'Inactive' }}
              </span>
              <button @click="openEditModal(merchant)"
                class="ml-2 px-2 py-1 text-xs rounded bg-indigo-500 text-white hover:bg-indigo-600">
                Edit
              </button>
            </td>

          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="py-2">
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-500">
                    Showing
                    <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
                    to
                    <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredMerchants.length) }}</span>
                    of
                    <span class="font-medium">{{ filteredMerchants.length }}</span>
                    results
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" @click.prevent="goToPage(1)" :class="[
                      currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50',
                      'relative inline-flex items-center px-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500'
                    ]">
                      <span class="sr-only">First</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                      </svg>
                    </a>
                    <a href="#" @click.prevent="goToPage(currentPage - 1)" :class="[
                      currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50',
                      'relative inline-flex items-center px-2 border border-gray-300 text-sm font-medium text-gray-500'
                    ]">
                      <span class="sr-only">Previous</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </a>
                    <a v-for="page in displayedPages" :key="page" href="#" @click.prevent="goToPage(page)" :class="[
                      page === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'border-gray-300 text-gray-500 hover:bg-gray-50',
                      'relative inline-flex items-center px-4 py-1 border text-sm font-medium'
                    ]">
                      {{ page }}
                    </a>
                    <span v-if="totalPages > maxPageLinks && currentPage < totalPages - Math.floor(maxPageLinks / 2)"
                      class="relative inline-flex items-center px-4 py-1 border border-gray-300 text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <a href="#" @click.prevent="goToPage(currentPage + 1)" :class="[
                      currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50',
                      'relative inline-flex items-center px-2 border border-gray-300 text-sm font-medium text-gray-500'
                    ]">
                      <span class="sr-only">Next</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <a href="#" @click.prevent="goToPage(totalPages)" :class="[
                      currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50',
                      'relative inline-flex items-center px-2 rounded-r-md border border-gray-300 text-sm font-medium text-gray-500'
                    ]">
                      <span class="sr-only">Last</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 5l7 7-7 7m-8-14l7 7-7 7" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
      <h3 class="text-lg font-bold mb-4">Edit Merchant</h3>

      <div v-if="selectedMerchant">
        <label class="block text-sm font-medium text-gray-700">Bank Code</label>
        <input v-model="selectedMerchant.bankcode" class="w-full border rounded px-3 py-2 mb-2" />

        <label class="block text-sm font-medium text-gray-700">Merchant Name Lao</label>
        <input v-model="selectedMerchant.merchantnameLa" class="w-full border rounded px-3 py-2 mb-2" />

        <label class="block text-sm font-medium text-gray-700">Merchant Name Eng</label>
        <input v-model="selectedMerchant.merchantnameEn" class="w-full border rounded px-3 py-2 mb-2" />

        <label class="block text-sm font-medium text-gray-700">Village</label>
        <input v-model="selectedMerchant.Village" class="w-full border rounded px-3 py-2 mb-2" />

        <label class="block text-sm font-medium text-gray-700">District</label>
        <input v-model="selectedMerchant.District" class="w-full border rounded px-3 py-2 mb-2" />

        <label class="block text-sm font-medium text-gray-700">Province</label>
        <input v-model="selectedMerchant.Province" class="w-full border rounded px-3 py-2 mb-2" />

        <label class="block text-sm font-medium text-gray-700">Status</label>
        <select v-model="selectedMerchant.status" class="w-full border rounded px-3 py-2 mb-4">
          <option :value="true">Active</option>
          <option :value="false">Inactive</option>
        </select>
      </div>

      <div class="flex justify-end space-x-2">
        <button @click="closeModal" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
          Cancel
        </button>
        <button @click="saveMerchant" class="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600">
          Save
        </button>
      </div>
    </div>
  </div>


</template>

<script>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { buildApiUrl } from '@/config/api';

const apiUrl = buildApiUrl('/api', 'base1');

export default {
  setup() {
    const merchants = ref([]);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const pageSize = 14;
    const maxPageLinks = 5;
    const userRole = computed(() => (localStorage.getItem('role') || '').toLowerCase());
    const bankcode = computed(() => localStorage.getItem('bankcode') || '');

    // 🔹 Modal state
    const isModalOpen = ref(false);
    const selectedMerchant = ref(null);

    const resetToFirstPage = () => {
      console.log('Resetting to first page due to search');
      currentPage.value = 1;
    };

    const fetchMerchants = async () => {
      if (!apiUrl) {
        console.error('API URL is not configured');
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/records`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        console.log('API Response:', response.data);

        merchants.value = Array.isArray(response.data.data)
          ? response.data.data
          : Array.isArray(response.data)
            ? response.data
            : [];

        console.log('Merchants updated:', merchants.value);

      } catch (error) {
        console.error('Fetch error:', error.response?.data || error);
        merchants.value = [];
      }
    };

    const filteredMerchants = computed(() => {
      let result = merchants.value;
      if (userRole.value === 'user' && bankcode.value) {
        console.log('Filtering by bankcode:', bankcode.value);
        result = result.filter((merchant) => merchant.bankcode === bankcode.value);
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter((merchant) => {
          const statusText = merchant.status ? 'active' : 'inactive';
          return (
            merchant.bankcode?.toLowerCase().includes(query) ||
            merchant.iin?.toString().includes(query) ||
            merchant.merchantnameLa?.toLowerCase().includes(query) ||
            merchant.merchantnameEn?.toLowerCase().includes(query) ||
            statusText.includes(query)
          );
        });
      }
      console.log('Filtered merchants:', result.length);
      return result;
    });

    const totalPages = computed(() =>
      Math.ceil(filteredMerchants.value.length / pageSize)
    );

    const displayedPages = computed(() => {
      const pages = [];
      const half = Math.floor(maxPageLinks / 2);
      let start = Math.max(1, currentPage.value - half);
      let end = Math.min(totalPages.value, start + maxPageLinks - 1);
      if (end - start < maxPageLinks - 1) {
        start = Math.max(1, end - maxPageLinks + 1);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

    const displayedMerchants = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      const end = start + pageSize;
      console.log(
        'Displaying merchants:',
        filteredMerchants.value.slice(start, end)
      );
      return filteredMerchants.value.slice(start, end);
    });

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
        console.log('Navigating to page:', page);
        currentPage.value = page;
      }
    };

    // 🔹 Modal methods
    const openEditModal = (merchant) => {
      selectedMerchant.value = { ...merchant }; // clone object
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      selectedMerchant.value = null;
    };

    const saveMerchant = async () => {
      if (!selectedMerchant.value) return;

      const { id, ...payload } = selectedMerchant.value;
      const token = localStorage.getItem('token');

      console.log('Saving merchant ID:', id);
      console.log('Payload:', payload);
      console.log('Token:', token);

      if (!token) {
        console.error('No auth token found. You must log in first.');
        return;
      }

      try {
        await axios.put(`${apiUrl}/records/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await fetchMerchants();
        closeModal();
      } catch (error) {
        console.error('Update failed:', error.response?.data || error);
      }
    };


    onMounted(() => {
      console.log(
        'ListMerchant mounted, role:',
        userRole.value,
        'bankcode:',
        bankcode.value
      );
      fetchMerchants();
    });

    return {
      merchants,
      searchQuery,
      currentPage,
      pageSize,
      totalPages,
      displayedPages,
      goToPage,
      displayedMerchants,
      filteredMerchants,
      resetToFirstPage,
      userRole,
      bankcode,
      // 🔹 expose modal state & methods
      isModalOpen,
      selectedMerchant,
      openEditModal,
      closeModal,
      saveMerchant,
    };
  },
};
</script>

```
