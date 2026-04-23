```vue
<template>
    <div class="flex justify-between px-4 mt-4 sm:px-8">
        <h2 class="text-2xl text-gray-600">All Merchant Mapped</h2>

        <div class="flex items-center space-x-1 text-xs">
            <router-link to="/" class="font-bold text-indigo-700">Home</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600">Merchant-Mapped</span>
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
                        <th class="text-left text-gray-600">Merchant Name Lao </th>
                        <th class="text-left text-gray-600">Merchant Name Eng</th>
                        <th class="text-left text-gray-600">Village</th>
                        <th class="text-left text-gray-600">District</th>
                        <th class="text-left text-gray-600">Province</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="merchant in displayedMerchants" :key="merchant.iin">
                        <td class="py-4">{{ merchant.bankcodes?.join(', ') }}</td>
                        <td>{{ merchant.merchantnameLa.join(', ') }}</td>
                        <td>{{ merchant.merchantnameEn.join(', ') }}</td>
                        <td>{{ merchant.Village.join(', ') }}</td>
                        <td>{{ merchant.District.join(', ') }}</td>
                        <td>{{ merchant.Province.join(', ') }}</td>

                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5" class="py-2">
                            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p class="text-sm text-gray-500">
                                        Showing
                                        <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
                                        to
                                        <span class="font-medium">{{ Math.min(currentPage * pageSize,
                                            filteredMerchants.length) }}</span>
                                        of
                                        <span class="font-medium">{{ filteredMerchants.length }}</span>
                                        results
                                    </p>
                                </div>
                                <div>
                                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                        aria-label="Pagination">
                                        <!-- First Page -->
                                        <a href="#" @click.prevent="goToPage(1)" :class="[
                                            currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50',
                                            'relative inline-flex items-center px-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500'
                                        ]">
                                            <span class="sr-only">First</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                            </svg>
                                        </a>
                                        <!-- Previous Page -->
                                        <a href="#" @click.prevent="goToPage(currentPage - 1)" :class="[
                                            currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50',
                                            'relative inline-flex items-center px-2 border border-gray-300 text-sm font-medium text-gray-500'
                                        ]">
                                            <span class="sr-only">Previous</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </a>
                                        <!-- Page Numbers -->
                                        <a v-for="page in displayedPages" :key="page" href="#"
                                            @click.prevent="goToPage(page)" :class="[
                                                page === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'border-gray-300 text-gray-500 hover:bg-gray-50',
                                                'relative inline-flex items-center px-4 py-1 border text-sm font-medium'
                                            ]">
                                            {{ page }}
                                        </a>
                                        <!-- Ellipsis -->
                                        <span
                                            v-if="totalPages > maxPageLinks && currentPage < totalPages - Math.floor(maxPageLinks / 2)"
                                            class="relative inline-flex items-center px-4 py-1 border border-gray-300 text-sm font-medium text-gray-700">
                                            ...
                                        </span>
                                        <!-- Next Page -->
                                        <a href="#" @click.prevent="goToPage(currentPage + 1)" :class="[
                                            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50',
                                            'relative inline-flex items-center px-2 border border-gray-300 text-sm font-medium text-gray-500'
                                        ]">
                                            <span class="sr-only">Next</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                        <!-- Last Page -->
                                        <a href="#" @click.prevent="goToPage(totalPages)" :class="[
                                            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50',
                                            'relative inline-flex items-center px-2 rounded-r-md border border-gray-300 text-sm font-medium text-gray-500'
                                        ]">
                                            <span class="sr-only">Last</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
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
</template>

<script>
import axios from 'axios';
import { ref, computed } from 'vue';
import { buildApiUrl } from '@/config/api';

export default {
    setup() {
        const apiUrl = buildApiUrl('/api', 'base1');
        const merchants = ref([]); // Store all merchants
        const searchQuery = ref('');
        const currentPage = ref(1);
        const pageSize = 14; // 15 records per page
        const maxPageLinks = 5;

        // Reset to first page on search
        const resetToFirstPage = () => {
            currentPage.value = 1;
        };

        // Fetch all merchants from API
        const fetchMerchants = async () => {
            if (!apiUrl) {
                this.$toast.error('API URL is not configured');
                return;
            }

            try {
                const response = await axios.get(`${apiUrl}/merchants/merchant-mapped`);
                console.log('API Response:', response.data); // Debug response
                merchants.value = Array.isArray(response.data.data) ? response.data.data : Array.isArray(response.data) ? response.data : [];
                console.log('Merchants updated:', merchants.value); // Debug data
                // alert('Merchants loaded successfully!');
            } catch (error) {
                console.error('Fetch error:', error);
                merchants.value = [];
                alert('Error fetching merchants: ' + (error.response?.data?.message || error.message));
            }
        };

        // Navigate to a specific page
        const goToPage = (page) => {
            if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
                console.log('Navigating to page:', page); // Debug navigation
                currentPage.value = page;
            }
        };

        // Compute filtered merchants (search by bankcode, iin, merchantname, status)
        const filteredMerchants = computed(() => {
            if (!searchQuery.value) return merchants.value;

            const query = searchQuery.value.toLowerCase();

            return merchants.value.filter(merchant => {
                const statusText = merchant.status ? 'active' : 'inactive';

                return (
                    merchant.bankcodes?.some(code => code?.toLowerCase().includes(query)) ||
                    merchant.merchantnameLa?.toLowerCase().includes(query) ||
                    merchant.merchantnameEn?.toLowerCase().includes(query) ||
                    statusText.includes(query)
                );
            });
        });


        // Compute total pages based on filtered merchants
        const totalPages = computed(() => Math.ceil(filteredMerchants.value.length / pageSize));

        // Compute displayed page numbers
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

        // Compute displayed merchants (paginated)
        const displayedMerchants = computed(() => {
            const start = (currentPage.value - 1) * pageSize;
            const end = start + pageSize;
            console.log('Displaying merchants:', filteredMerchants.value.slice(start, end)); // Debug displayed data
            return filteredMerchants.value.slice(start, end);
        });

        // Fetch data on component mount
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
        };
    },
};
</script>
```
