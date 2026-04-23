<template>
  <div>
    <!-- Toast Notification -->
    <div
      v-if="toast.show"
      :class="[
        'fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white transition-all',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500',
      ]"
    >
      {{ toast.message }}
    </div>

    <div class="max-w-5xl mx-auto mt-8">
      <h2 class="text-2xl text-gray-600 text-center font-bold">
        {{ editingMemberId ? "Edit Member" : "Add Member" }}
      </h2>
      <form @submit.prevent="sendToApi" class="mt-4 space-y-2">
        <div>
          <label for="bankcode" class="text-gray-600 block mb-1">Bank Code:</label>
          <input
            type="text"
            id="bankcode"
            v-model="bankcode"
            class="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label for="iin" class="text-gray-600 block mb-1">IIN:</label>
          <input
            type="text"
            id="iin"
            v-model="iin"
            class="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label for="bankname" class="text-gray-600 block mb-1">Bank Name:</label>
          <input
            type="text"
            id="bankname"
            v-model="bankname"
            class="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>

        <!-- Country Checkbox List -->
        <div>
          <label class="text-gray-600 block mb-1">Available Countries:</label>
          <div class="grid grid-cols-3 gap-2">
            <div v-for="country in countries" :key="country.id" class="flex items-center">
              <input
                type="checkbox"
                :id="'country-' + country.id"
                :value="country.countryCode"
                v-model="selectedCountries"
                class="mr-2"
              />
              <label :for="'country-' + country.id">{{ country.country }}</label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          {{ editingMemberId ? "Update Member" : "Add Member" }}
        </button>
      </form>

      <!-- Members Table -->
      <table class="w-full mt-4 table-auto border border-gray-300">
        <thead>
          <tr>
            <th class="text-left bg-gray-800 text-white border border-gray-300 px-3 py-2">
              No
            </th>
            <th class="text-left bg-gray-800 text-white border border-gray-300 px-3 py-2">
              Bank Code
            </th>
            <th class="text-left bg-gray-800 text-white border border-gray-300 px-3 py-2">
              IIN
            </th>
            <th class="text-left bg-gray-800 text-white border border-gray-300 px-3 py-2">
              Name
            </th>
            <th class="text-left bg-gray-800 text-white border border-gray-300 px-3 py-2">
              Countries
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(bank, index) in paginatedBanks"
            :key="bank.id"
            class="odd:bg-gray-50 even:bg-white cursor-pointer hover:bg-gray-100"
            @click="editMember(bank)"
          >
            <td class="border border-gray-300 px-3 py-2">
              {{ (currentPage - 1) * rowsPerPage + index + 1 }}
            </td>
            <td class="border border-gray-300 px-3 py-2">{{ bank.bankcode }}</td>
            <td class="border border-gray-300 px-3 py-2">{{ bank.iin }}</td>
            <td class="border border-gray-300 px-3 py-2">{{ bank.bankname }}</td>
            <td class="border border-gray-300 px-3 py-2">
              <span
                v-for="(c, i) in bank.country || []"
                :key="i"
                class="inline-block bg-gray-200 px-2 py-1 m-1 rounded"
              >
                {{ c }}
              </span>
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
          >
            &laquo;
          </button>
          <button
            class="px-2 py-1 rounded hover:bg-gray-200"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            &lt;
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            class="px-3 py-1 rounded"
            :class="page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button
            class="px-2 py-1 rounded hover:bg-gray-200"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            &gt;
          </button>
          <button
            class="px-2 py-1 rounded hover:bg-gray-200"
            :disabled="currentPage === totalPages"
            @click="goToPage(totalPages)"
          >
            &raquo;
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { buildApiUrl } from "@/config/api";

const apiUrl = buildApiUrl("/api", "base1");

export default {
  data() {
    return {
      bankcode: "",
      iin: "",
      bankname: "",
      banks: [],
      countries: [],
      selectedCountries: [],
      editingMemberId: null,
      currentPage: 1,
      rowsPerPage: 8,
      toast: { show: false, message: "", type: "success" },
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.banks.length / this.rowsPerPage) || 1;
    },
    paginatedBanks() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return this.banks.slice(start, start + this.rowsPerPage);
    },
  },
  methods: {
    showToast(message, type = "success") {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => {
        this.toast.show = false;
      }, 2500);
    },
    async fetchMembers() {
      try {
        const response = await axios.get(`${apiUrl}/members`);
        this.banks = response.data;
      } catch (error) {
        console.error(error);
        this.showToast("Failed to load members.", "error");
      }
    },
    async fetchCountries() {
      try {
        const response = await axios.get(`${apiUrl}/crossborder`);
        this.countries = response.data;
      } catch (error) {
        console.error(error);
        this.showToast("Failed to load countries.", "error");
      }
    },
    editMember(member) {
      this.editingMemberId = member.id;
      this.bankcode = member.bankcode;
      this.iin = member.iin;
      this.bankname = member.bankname;
      this.selectedCountries = member.country ? [...member.country] : [];
      this.showToast("Editing member " + member.bankname, "success");
    },
    async sendToApi() {
      if (!this.bankcode.trim() || !String(this.iin).trim() || !this.bankname.trim()) {
        this.showToast("Please fill in Bank Code, IIN, and Bank Name.", "error");
        return;
      }

      

      try {
        if (this.editingMemberId) {
          // Update
          await axios.put(`${apiUrl}/members/${this.editingMemberId}`, {
            bankcode: this.bankcode,
            iin: Number(this.iin),
            bankname: this.bankname,
            country: this.selectedCountries,
          });
          this.showToast("Member updated successfully!", "success");
        } else {
          // Create
          await axios.post(`${apiUrl}/members`, {
            bankcode: this.bankcode,
            iin: Number(this.iin),
            bankname: this.bankname,
            country: this.selectedCountries,
          });
          this.showToast("Member added successfully!", "success");
        }

        // Reset form
        this.bankcode = "";
        this.iin = "";
        this.bankname = "";
        this.selectedCountries = [];
        this.editingMemberId = null;

        this.fetchMembers();
      } catch (error) {
        console.error("API Error:", error);
        this.showToast(error.response?.data?.message || error.message, "error");
      }
    },
    goToPage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchMembers();
    this.fetchCountries();
  },
};
</script>
