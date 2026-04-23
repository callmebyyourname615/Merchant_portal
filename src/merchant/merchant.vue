```vue
<template>
    <div class="flex justify-between px-4 mt-4 sm:px-8">
        <h2 class="text-2xl text-gray-600">All Merchant</h2>

        <div class="flex items-center space-x-1 text-xs">
            <router-link to="/" class="font-bold text-indigo-700">Home</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600">Merchant</span>
        </div>
    </div>

    <div class="px-4 mt-8 sm:px-8">
        <div class="p-4 bg-white rounded">
            <div class="flex justify-between items-center mb-4">
                <!-- Left: Search -->
                <div class="relative text-gray-400 w-64">
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

                <!-- Right: Button -->
                <button @click="generateReport"
                    class="px-4 py-2 bg-indigo-600 text-white text-sm rounded shadow hover:bg-indigo-700">
                    Download Report
                </button>
            </div>

            <div v-if="displayedMerchants.length === 0" class="text-center text-gray-500 mt-4">
                No merchants found
            </div>
            <table v-else class="w-full mt-2 text-gray-500">
                <thead class="border-b">
                    <tr>
                        <th class="text-left text-gray-600">Merchant Name Lao</th>
                        <th class="text-left text-gray-600">Merchant Name Eng</th>
                        <th class="text-left text-gray-600">Village</th>
                        <th class="text-left text-gray-600">District</th>
                        <th class="text-left text-gray-600">Province</th>
                        <th class="text-left text-gray-600">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(merchant, index) in displayedMerchants" :key="index">
                        <td>
                            {{ Array.isArray(merchant.merchantnameLa) ? merchant.merchantnameLa.join(', ') :
                                merchant.merchantnameLa }}
                        </td>
                        <td>
                            {{ Array.isArray(merchant.merchantnameEn) ? merchant.merchantnameEn.join(', ') :
                                merchant.merchantnameEn }}
                        </td>
                        <td>{{ merchant.Village }}</td>
                        <td>{{ merchant.District }}</td>
                        <td>{{ merchant.Province }}</td>
                        <td>
                            <span
                                :class="merchant.status ? 'px-2 py-1 rounded text-xs text-white bg-green-500' : 'px-2 py-1 rounded text-xs text-white bg-red-500'">
                                {{ merchant.status ? 'Active' : 'Inactive' }}
                            </span>
                        </td>
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
import { ref, computed, onMounted } from 'vue';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import unorm from 'unorm';
import phetsarathTTF from '@/assets/fonts/Phetsarath-Regular.ttf?url';
import '@/assets/fonts/NotoSansLao.js';
import { buildApiUrl } from '@/config/api';

export default {
    setup() {
        const apiUrl = buildApiUrl('/api', 'base1');
        const merchants = ref([]);
        const searchQuery = ref('');
        const currentPage = ref(1);
        const pageSize = 14;
        const maxPageLinks = 5;

        const resetToFirstPage = () => {
            currentPage.value = 1;
        };

        function transformSingleMerchantData(item) {
            if (!item) return null;

            return {
                merchantnameLa: Array.isArray(item.merchantnameLa)
                    ? item.merchantnameLa
                    : [item.merchantnameLa || 'N/A'],
                merchantnameEn: Array.isArray(item.merchantnameEn)
                    ? item.merchantnameEn
                    : [item.merchantnameEn || 'N/A'],
                Village: item.Village || 'N/A',
                District: item.District || 'N/A',
                Province: item.Province || 'N/A',
                bankcodes: item.bankcodes || 'N/A',
                sources: item.sources || 'N/A',
                status: !!item.status,
                SupportCrossBorder: !!item.SupportCrossBorder,
                recordIds: item.recordIds || [],
                isDuplicate: !!item.isDuplicate,
                count: item.count || 1,
            };
        }

        const fetchMerchants = async () => {
            if (!apiUrl) {
                alert('API URL is not configured');
                return;
            }

            try {
                const response = await axios.get(`${apiUrl}/records/all-unique-merchants`);
                const rawData = Array.isArray(response.data?.data) ? response.data.data : [];
                merchants.value = rawData
                    .map(transformSingleMerchantData)
                    .filter(Boolean);
            } catch (error) {
                console.error('Fetch error:', error);
                merchants.value = [];
                alert('Error fetching merchants: ' + (error.response?.data?.message || error.message));
            }
        };

        onMounted(() => {
            fetchMerchants();
        });

        const goToPage = (page) => {
            if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
                currentPage.value = page;
            }
        };

        const filteredMerchants = computed(() => {
            if (!searchQuery.value) return merchants.value;
            const query = searchQuery.value.toLowerCase();
            return merchants.value.filter((merchant) => {
                const statusText = merchant.status ? 'active' : 'inactive';
                const merchantNames = [
                    ...(Array.isArray(merchant.merchantnameLa) ? merchant.merchantnameLa : []),
                    ...(Array.isArray(merchant.merchantnameEn) ? merchant.merchantnameEn : []),
                ].join(' ').toLowerCase();
                return (
                    merchantNames.includes(query) ||
                    statusText.includes(query) ||
                    (merchant.LocationAddress && merchant.LocationAddress.toLowerCase().includes(query))
                );
            });
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
            return filteredMerchants.value.slice(start, end);
        });

        // ---------------------- Fixed generateReport ----------------------
        const generateReport = () => {
            const doc = new jsPDF();

            // Use the imported font
            doc.setFont("NotoSansLao", "normal");

            // Margins (2.5 cm)
            const margin = 2.5 * 10.5; // 1 cm ≈ 28.35 pt
            const pageWidth = doc.internal.pageSize.getWidth();

            // Title
            const title = "ລາຍງານ";
            const textWidth = doc.getTextWidth(title);
            doc.setFontSize(16);
            doc.text(title, (pageWidth - textWidth) / 2, margin); // top margin

            // New text below title
            const subtitle = "ລາຍງານທຂໍ້ມູນຮ້ານຄ້າທັງໝົດຂອງສະມາຊີກ"; // example subtitle
            doc.setFontSize(12);
            const subtitleWidth = doc.getTextWidth(subtitle);
            const subtitleY = margin + 10; // 10pt below title
            doc.text(subtitle, (pageWidth - subtitleWidth) / 2, subtitleY);

            // Normalize text
            const normalizedMerchants = merchants.value.map(m => ({
                merchantnameLa: Array.isArray(m.merchantnameLa)
                    ? m.merchantnameLa.map(t => unorm.nfc(t)).join(", ")
                    : unorm.nfc(m.merchantnameLa),
                merchantnameEn: Array.isArray(m.merchantnameEn)
                    ? m.merchantnameEn.join(", ")
                    : m.merchantnameEn,
                Village: m.Village,
                District: m.District,
                Province: m.Province,
                status: m.status ? "Active" : "Inactive"
            }));

            autoTable(doc, {
                startY: subtitleY + 10, // start below subtitle
                margin: { top: margin, bottom: margin, left: margin, right: margin },
                head: [[
                    "Merchant Name Lao",
                    "Merchant Name Eng",
                    "Village",
                    "District",
                    "Province",
                    "Status"
                ]],
                body: normalizedMerchants.map(m => [
                    m.merchantnameLa,
                    m.merchantnameEn,
                    m.Village,
                    m.District,
                    m.Province,
                    m.status
                ]),
                styles: { font: "NotoSansLao", fontSize: 9 },
                headStyles: { fillColor: [79, 70, 229], textColor: 255 }
            });

            doc.save("merchant-report.pdf");
        };


        // -------------------------------------------------------------------

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
            maxPageLinks,
            generateReport,
        };
    },
};
</script>




<style scoped>
/* Add any custom styles here */
</style>

```
