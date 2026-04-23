<template>
  <div class="bg-gray px-12 pt-6 w-full">
    <!-- Toast Notification -->
    <div
      v-if="toast.show"
      :class="[
        'fixed top-6 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-semibold transition-all duration-300',
        {
          'bg-green-500': toast.type === 'success',
          'bg-red-500': toast.type === 'error',
          'bg-blue-600': toast.type === 'info',
        },
      ]"
    >
      {{ toast.message }}
    </div>

    <div class="max-w-3xl mx-auto w-full">
      <h2 class="text-center text-3xl font-bold text-gray-800 mb-6">
        Upload Merchant Info
      </h2>

      <!-- Tabs + Download Button -->
      <div class="flex border-b mb-6 items-center justify-between">
        <div class="flex">
          <button
            class="px-4 py-2 focus:outline-none"
            :class="activeTab === 'manual'
              ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
              : 'text-gray-500'"
            @click="setActiveTab('manual')"
          >
            Manual Entry
          </button>
          <button
            class="px-4 py-2 focus:outline-none"
            :class="activeTab === 'auto'
              ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
              : 'text-gray-500'"
            @click="setActiveTab('auto')"
          >
            Excel Upload
          </button>
        </div>

        <!-- Download Template Button -->
        <button
          @click="downloadExcelTemplate"
          type="button"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-sm transition"
        >
          Download Template
        </button>
      </div>

      <!-- Manual Entry Form -->
      <form
        v-if="activeTab === 'manual'"
        @submit.prevent="submitMerchant"
        class="max-w-5xl mx-auto space-y-8 bg-white p-12 rounded-lg shadow-lg mb-8"
      >
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <!-- All input fields -->
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">Account Name</label>
            <input v-model="form.fullname" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">Account No</label>
            <input v-model="form.accountNo" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">IDCard</label>
            <input v-model="form.idCard" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">Passport No</label>
            <input v-model="form.passportNo" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">Business license No</label>
            <input v-model="form.blId" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">FamilyBook No</label>
            <input v-model="form.fbNo" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-gray-700 mb-1 text-sm font-medium">Contract</label>
            <input v-model="form.contract" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">Merchant Name (Lao)</label>
            <input v-model="form.merchantnameLa" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">Merchant Name (Eng)</label>
            <input v-model="form.merchantnameEn" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-gray-700 mb-1 text-sm font-medium">QR-Payload</label>
            <input v-model="form.qrpaylaod" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">Province</label>
            <select v-model="form.Province" @change="fetchDistrictsById" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
              <option disabled value="">Select Province</option>
              <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">District</label>
            <select v-model="form.District" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
              <option disabled value="">Select District</option>
              <option v-for="district in districts" :key="district.id" :value="district.name">{{ district.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">Village</label>
            <input v-model="form.Village" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1 text-sm font-medium">Status</label>
            <select v-model="form.status" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
              <option disabled value="">Select Option</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded disabled:opacity-50 text-sm transition mt-4">
          <span v-if="loading">Submitting...</span>
          <span v-else>Submit Merchant</span>
        </button>
      </form>

      <!-- Auto (Excel Upload) -->
      <div v-if="activeTab === 'auto'" class="relative bg-white p-8 rounded-lg shadow-lg">
        <div class="flex items-center space-x-4">
          <label
            for="file-upload"
            class="cursor-pointer inline-flex items-center px-3 py-1 bg-indigo-600 border border-transparent rounded font-semibold text-white hover:bg-indigo-700 transition text-sm"
          >
            <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v16h16V4H4zm8 4v4m0 0v4m0-4h4m-4 0H8" />
            </svg>
            Choose File
          </label>
          <input id="file-upload" type="file" class="hidden" ref="fileInput" @change="handleFileUpload" />
          <span class="text-xs text-gray-600 truncate max-w-xs">{{ selectedFileName || "No file chosen" }}</span>
        </div>
        <div class="mt-4">
          <button @click="uploadFile" type="button" :disabled="loading || !selectedFile" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 text-sm transition">
            <span v-if="loading">Uploading...</span>
            <span v-else>Upload Excel</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { buildApiUrl } from "@/config/api";
import merchantTemplate from "@/assets/excel-file/Merchant_Info.xlsx?url"; // ✅ import Excel file path

const apiUrl = buildApiUrl("/api", "base1");

export default {
  data() {
    return {
      selectedFile: null,
      selectedFileName: null,
      loading: false,
      activeTab: "manual",
      members: [],
      toast: {
        show: false,
        type: "",
        message: "",
      },
      form: {
        merchantnameLa: "",
        merchantnameEn: "",
        accountNo: "",
        fullname: "",
        Village: "",
        District: "",
        Province: "",
        idCard: "",
        passportNo: "",
        blId: "",
        fbNo: "",
        qrpaylaod: "",
        contract: "",
        status: "",
      },
      provinces: [],
      districts: [],
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    showToast(type, message) {
      this.toast = { show: true, type, message };
      setTimeout(() => { this.toast.show = false; }, 3000);
    },
    downloadExcelTemplate() {
      const link = document.createElement("a");
      link.href = merchantTemplate; // file path from assets
      link.download = "Merchant_Info.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.showToast("success", "Template downloaded!");
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files?.[0] || null;
      if (this.selectedFile && !this.selectedFile.name.match(/\.(xlsx|xls)$/)) {
        this.showToast("error", "Please select an Excel file (.xlsx or .xls)");
        this.selectedFile = null;
        this.selectedFileName = null;
        this.$refs.fileInput.value = "";
        return;
      }
      this.selectedFileName = this.selectedFile ? this.selectedFile.name : null;
      if (this.selectedFile) this.showToast("info", `Selected file: ${this.selectedFileName}`);
    },
    async uploadFile() {
      if (!this.selectedFile) { this.showToast("error", "No file selected"); return; }
      if (!apiUrl) { this.showToast("error", "API URL is not configured"); return; }
      this.loading = true;
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      const memberId = parseInt(localStorage.getItem("memberId"), 10) || null;
      if (memberId !== null) formData.append("memberId", memberId);

      try {
        await axios.post(`${apiUrl}/records/upload-excel`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        this.showToast("success", "Excel file uploaded successfully!");
        this.resetForm();
      } catch (error) {
        this.showToast("error", "Error uploading file: " + (error.response?.data?.message || error.message));
      } finally { this.loading = false; }
    },
    async fetchProvinces() {
      try {
        const res = await axios.get(`${apiUrl}/location`);
        this.provinces = res.data;
      } catch (error) { console.error("Failed to fetch provinces:", error); }
    },
    async fetchDistrictsById() {
      this.form.District = "";
      if (!this.form.Province) return;
      try {
        const res = await axios.get(`${apiUrl}/location/${this.form.Province}/districts`);
        this.districts = res.data;
      } catch (error) { console.error("Failed to fetch districts:", error); }
    },
    async submitMerchant() {
      const requiredFields = ["merchantnameLa", "Province", "District", "Village", "status"];
      for (const field of requiredFields) { if (!this.form[field]) { this.showToast("error", `Please fill in ${field}`); return; } }
      if (!apiUrl) { this.showToast("error", "API URL is not configured"); return; }

      const provinceObj = this.provinces.find((p) => p.id === this.form.Province);
      const provinceName = provinceObj ? provinceObj.name : "";
      const districtName = this.form.District;

      const payload = {
        data: {
          fullname: this.form.fullname || null,
          accountNo: this.form.accountNo || null,
          idCard: this.form.idCard || null,
          passportNo: this.form.passportNo || null,
          blId: this.form.blId || null,
          fbNo: this.form.fbNo || null,
          merchantnameLa: this.form.merchantnameLa,
          merchantnameEn: this.form.merchantnameEn || null,
          qrpaylaod: this.form.qrpaylaod || null,
          contract: this.form.contract || null,
          Village: this.form.Village,
          District: districtName,
          Province: provinceName,
          status: this.form.status === "1",
        },
        memberId: parseInt(localStorage.getItem("memberId"), 10) || null,
        mapped: "f",
        source: "manual",
      };

      try {
        await axios.post(`${apiUrl}/records/add-merchant`, payload);
        this.showToast("success", "Merchant added successfully!");
        this.form = {
          fullname: "", accountNo: "", idCard: "", passportNo: "",
          blId: "", fbNo: "", merchantnameLa: "", merchantnameEn: "",
          qrpaylaod: "", Village: "", District: "", Province: "",
          status: "", contract: ""
        };
      } catch (error) {
        this.showToast("error", "Error adding merchant: " + (error.response?.data?.message || error.message));
      }
    },
    resetForm() { this.selectedFile = null; this.selectedFileName = null; this.$refs.fileInput.value = ""; },
  },
  mounted() { this.fetchProvinces(); },
};
</script>
