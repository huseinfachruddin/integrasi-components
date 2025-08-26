<template>
  <div class="relative">
    <div class="flex items-center gap-2">
      <div class="relative flex-1">
        <!-- Input Search -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari.."
          class="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          @input="handleSearchInput"
          @keydown.enter="performSearch"
        />

        <!-- Icon Search (kiri) -->
        <IconSearch
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        />

        <!-- Tombol Clear (kanan) -->
        <button
          v-if="searchQuery"
          type="button"
          @click="clearSearch"
          :disabled="loading"
          :class="[ 
            'absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer',
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-600'
          ]"
          :title="loading ? 'Loading...' : 'Clear Search'"
        >
          <IconX class="w-4 h-4" />
        </button>
      </div>

      <!-- Tombol Search -->
      <Button
        variant="primary"
        type="button"
        @click="performSearch"
        :custom-class="`py-3 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`"
        :disabled="loading"
      >
        <IconSearch class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { IconSearch, IconX } from "@tabler/icons-vue"
import Button from "@/components/Button/index.vue"

// Props biar bisa pakai v-model
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
})

// Emit untuk search & update modelValue
const emit = defineEmits(["search", "update:modelValue"])

const searchQuery = ref(props.modelValue)
const loading = ref(false)

// Sinkronkan saat props berubah
watch(
  () => props.modelValue,
  (newValue) => {
    searchQuery.value = newValue
  }
)

// Fungsi input
const handleSearchInput = () => {
  emit("update:modelValue", searchQuery.value) // update v-model parent
  emit("search", searchQuery.value)           // trigger event search
}

const performSearch = () => {
  emit("search", searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ""
  emit("update:modelValue", "") // reset v-model parent
  emit("search", "")            // kasih tahu parent
}
</script>
