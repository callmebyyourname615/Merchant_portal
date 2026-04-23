<template>
  <div>
    <div class="flex justify-between px-4 mt-4 sm:px-8">
      <h2 class="text-2xl text-gray-600">Duplicates Merchant</h2>

      <div class="flex items-center space-x-1 text-xs">
        <router-link to="/" class="font-bold text-indigo-700">Home</router-link>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-gray-600">duplicates-merchant</span>
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
        <div v-if="loading" class="text-center text-gray-500 mt-4">Loading...</div>
        <div v-else-if="displayedMerchants.length === 0" class="text-center text-gray-500 mt-4">
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
              <th class="text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(group, index) in displayedMerchants" :key="index">
              <td class="py-4">{{ group.bankcodes.join(', ') }}</td>
              <td>{{ group.merchantnameLa.join(', ') }}</td>
              <td>{{ group.merchantnameEn.join(', ') }}</td>
              <td>{{ group.Village.join(', ') }}</td>
              <td>{{ group.District.join(', ') }}</td>
              <td>{{ group.Province.join(', ') }}</td>
              <td class="space-x-2">
                <template v-if="!group.mapped">
                  <button @click="mapGroup(index)" :disabled="mappingLoading"
                    class="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">
                    <span v-if="mappingLoading">Mapping...</span>
                    <span v-else>Map</span>
                  </button>
                </template>
                <template v-else>
                  <span class="px-2 py-1 rounded text-xs text-white bg-green-500">Mapped</span>
                </template>

                <button @click="viewDetails(group)"
                  class="px-2 py-1 text-xs text-white bg-indigo-500 rounded hover:bg-indigo-600">
                  Details
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="7" class="py-2">
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

    <!-- Modal -->
    <transition name="modal">
      <div v-if="showDetailsModal"
        class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center p-4"
        @click.self="closeModal">
        <div class="relative p-6 bg-white w-full max-w-md max-h-[80vh] overflow-y-auto rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4">Merchant Details</h2>

          <div v-for="(detail, index) in detailedGroupData" :key="index" class="mb-4 border-b pb-2">
            <p><strong>Merchant Name (Lao):</strong> {{ detail.merchantnameLa }}</p>
            <p><strong>Merchant Name (Eng):</strong> {{ detail.merchantnameEn }}</p>
            <p><strong>Bank Code:</strong> {{ detail.bankcode }}</p>
            <p><strong>Address:</strong> {{ detail.Village }}, {{ detail.District }}, {{ detail.Province }}</p>
            <p><strong>Cross Border:</strong> {{ detail.SupportCrossBorder ? 'Yes' : 'No' }}</p>
            <p><strong>Status:</strong> {{ detail.status ? 'Active' : 'Inactive' }}</p>
          </div>

          <button @click="closeModal" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Close</button>
        </div>
      </div>
    </transition>


  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { buildApiUrl } from '@/config/api';

interface MerchantData {
  merchantnameLa: string[];
  merchantnameEn: string[];
  bankcodes: string[];
  Village: string;
  District: string;
  Province: string;
  status: boolean;
  SupportCrossBorder: boolean;
  merchants?: MerchantData[];
  mapped?: boolean;
}

interface MerchantGroup {
  recordIds: number[];
  merchants: MerchantData[];
  mapped: boolean;
  bankcodes: string[];
  merchantnameLa: string[];
  merchantnameEn: string[];
  SupportCrossBorder: boolean;
  Village: string[];
  District: string[];
  Province: string[];
  status: boolean;
}

export default defineComponent({
  setup() {
    const merchants = ref<MerchantData[]>([]);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const pageSize = 10;
    const maxPageLinks = 5;
    const loading = ref(true);
    const mappingLoading = ref(false);
    const detailedGroupData = ref<any[]>([]);
    const toast = useToast();
    const apiUrl = buildApiUrl('/api', 'base1');

    const selectedGroup = ref<MerchantGroup | null>(null);
    const showDetailsModal = ref(false);

    const resetToFirstPage = () => {
      currentPage.value = 1;
    };

    const fetchMerchants = async () => {
      if (!apiUrl) {
        toast.error('API URL is not configured');
        loading.value = false;
        return;
      }

      loading.value = true; // <-- start loading

      try {
        const response = await axios.get(`${apiUrl}/records/duplicates-merchant`);
        console.log('Full API Response:', response);

        // Normalize response shape
        let rawData: any[] = [];
        if (Array.isArray(response.data)) {
          rawData = response.data;
        } else if (Array.isArray(response.data.data)) {
          rawData = response.data.data;
        } else {
          console.warn('Unexpected response format:', response.data);
          merchants.value = [];
          toast.error('Invalid response format from server');
          return;
        }

        merchants.value = rawData
          .filter(item => item)
          .map(item => {
            const d = item.data ?? item;
            return {
              ...d,
              mapped: false,
              merchantnameLa: Array.isArray(d.merchantnameLa) ? d.merchantnameLa : [d.merchantnameLa ?? ''],
              merchantnameEn: Array.isArray(d.merchantnameEn) ? d.merchantnameEn : [d.merchantnameEn ?? ''],
              Village: Array.isArray(d.Village) ? d.Village : [d.Village ?? ''],
              District: Array.isArray(d.District) ? d.District : [d.District ?? ''],
              Province: Array.isArray(d.Province) ? d.Province : [d.Province ?? ''],
              bankcodes: Array.isArray(d.bankcodes) ? d.bankcodes : [d.bankcodes ?? ''],
              recordIds: d.recordIds ?? d.recordids ?? [], // 🔹 normalize casing
            };
          });

        console.log('Transformed merchants:', merchants.value);

        if (merchants.value.length === 0) {
          toast.info('No valid duplicate merchants found');
        }
      } catch (error) {
        console.error('Fetch error details:', (error as any).response || error);
        merchants.value = [];
        toast.error(
          'Error fetching merchants: ' +
          ((error as any).response?.data?.message || (error as any).message),
        );
      } finally {
        loading.value = false;
      }
    };


    const groupedMerchants = computed<MerchantGroup[]>(() =>
      merchants.value.map((item: any) => ({
        merchants: item.merchants || [],
        mapped: item.mapped ?? false,
        bankcodes: item.bankcodes || [],
        merchantnameLa: item.merchantnameLa || [],
        merchantnameEn: item.merchantnameEn || [],
        SupportCrossBorder: item.SupportCrossBorder ?? false,
        Village: item.Village || [],
        District: item.District || [],
        Province: item.Province || [],
        status: item.status ?? false,
        recordIds: item.recordIds || [], // 🔹 take it from normalized top-level property
      }))
    );

    const filteredMerchants = computed<MerchantGroup[]>(() => {
      if (!groupedMerchants.value || !Array.isArray(groupedMerchants.value)) return [];
      let filtered = groupedMerchants.value.filter((group) => !group.mapped);
      if (!searchQuery.value) return filtered;
      const query = searchQuery.value.toLowerCase();
      return filtered.filter(group => {
        const statusText = group.status ? 'active' : 'inactive';
        return (
          (group.bankcodes.join(',').toLowerCase().includes(query)) ||
          (Array.isArray(group.merchantnameLa) ? group.merchantnameLa.join(',').toLowerCase() : String(group.merchantnameLa || '').toLowerCase()).includes(query) ||
          (Array.isArray(group.merchantnameEn) ? group.merchantnameEn.join(',').toLowerCase() : String(group.merchantnameEn || '').toLowerCase()).includes(query) ||
          statusText.includes(query)
        );
      });
    });

    const totalPages = computed(() => Math.ceil(filteredMerchants.value.length / pageSize));

    const displayedPages = computed(() => {
      const pages: number[] = [];
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

    const displayedMerchants = computed<MerchantGroup[]>(() => {
      if (!filteredMerchants.value || !Array.isArray(filteredMerchants.value)) return [];
      const start = (currentPage.value - 1) * pageSize;
      const end = start + pageSize;
      return filteredMerchants.value.slice(start, end);
    });

    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
        console.log('Navigating to page:', page);
        currentPage.value = page;
      }
    };

    const mapGroup = async (groupIndex: number) => {
      const group = displayedMerchants.value[groupIndex];
      if (!group) return;

      mappingLoading.value = true;

      try {
        const payload = {
          recordIds: group.recordIds, // now this will have the correct IDs
          merchantnameLa: group.merchantnameLa,
          merchantnameEn: group.merchantnameEn,
          bankcodes: group.bankcodes,
          Village: group.Village,
          District: group.District,
          Province: group.Province,
        };


        console.log('Mapping payload:', payload);

        const response = await axios.post(`${apiUrl}/merchants/map`, payload);

        toast.success('Merchant group mapped successfully');

        // Mark group as mapped in your data source
        group.mapped = true;

      } catch (error) {
        console.error('Mapping error:', error);
        toast.error('Failed to map merchant group');
      } finally {
        mappingLoading.value = false;
      }
    };


    const closeModal = () => {
      showDetailsModal.value = false;
      selectedGroup.value = null;
    };

    const viewDetails = async (group: MerchantGroup) => {
      selectedGroup.value = group;
      showDetailsModal.value = true;
      detailedGroupData.value = [];
      try {
        if (!apiUrl) {
          toast.error('API URL is not configured');
          return;
        }

        const params = new URLSearchParams();
        if (group.bankcodes.length) {
          params.append('bankcodes', group.bankcodes.join(','));
        }
        if (group.iins.length) {
          params.append('iins', group.iins.join(','));
        }
        if (group.merchantnameLa.length) {
          params.append('merchantnameLa', group.merchantnameLa.join(','));
        }
        if (group.merchantnameEn.length) {
          params.append('merchantnameEn', group.merchantnameEn.join(','));
        }

        const url = `${apiUrl}/merchants/details?${params.toString()}`;
        console.log('Request URL:', url);

        const response = await axios.get(url);
        console.log('Response data:', response.data);

        if (Array.isArray(response.data)) {
          detailedGroupData.value = response.data.map(item => item.data || item);
        } else if (Array.isArray(response.data.data)) {
          detailedGroupData.value = response.data.data.map((item: { data: any; }) => item.data || item);
        } else {
          detailedGroupData.value = [];
          toast.info('No detailed data found for this group');
        }

      } catch (error) {
        console.error('Error fetching details:', (error as any).response || error);
        toast.error('Failed to fetch merchant details: ' + ((error as any).response?.data?.message || (error as any).message || 'Unknown error'));
      }
    };


    fetchMerchants();

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
      mapGroup,
      loading,
      mappingLoading,
      maxPageLinks,
      detailedGroupData,
      selectedGroup,
      showDetailsModal,
      viewDetails,
      closeModal,

      // aliases to fix 'Property does not exist' errors if your template uses these names
      selectedMerchant: selectedGroup,
      showModal: showDetailsModal,
    };
  },
});
</script>


<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
