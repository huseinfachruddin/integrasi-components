<!-- FileInput.vue -->
<template>
  <div class="flex items-center gap-2">
    <!-- Input text read-only untuk menampilkan nama file -->
    <input
      type="text"
      :value="fileName || placeholder"
      readonly
      class="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />

    <!-- Tombol Browse -->
    <label
      :for="id"
      class="bg-blue-600 text-white px-4 py-2 text-sm rounded-r-md cursor-pointer hover:bg-blue-700"
    >
      Browse
    </label>

    <!-- Input file hidden -->
    <input
      :id="id"
      type="file"
      class="hidden"
      :accept="accept"
      @change="handleFileChange"
    />
  </div>

  <!-- Pesan error -->
  <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: { type: String, default: "file" },
  accept: { type: String, default: ".png,.jpg,.jpeg" },
  maxSize: { type: Number, default: 2 * 1024 * 1024 }, // 2MB
  placeholder: { type: String, default: "Select" },
});

const emit = defineEmits(["update:modelValue", "error"]);

const fileName = ref("");
const error = ref("");

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const extension = file.name.split(".").pop().toLowerCase();
  const allowedExtensions = props.accept.replace(/\./g, "").split(",");

  // Validasi ekstensi
  if (!allowedExtensions.includes(extension)) {
    error.value = `File harus berupa: ${allowedExtensions.join(", ")}`;
    emit("error", error.value);
    e.target.value = null;
    return;
  }

  // Validasi ukuran
  if (file.size > props.maxSize) {
    error.value = `Ukuran maksimal ${(props.maxSize / (1024 * 1024)).toFixed(
      1
    )} MB`;
    emit("error", error.value);
    e.target.value = null;
    return;
  }

  error.value = "";
  fileName.value = file.name;
  emit("update:modelValue", file);
};
</script>

<style scoped>
/* Opsional: hilangkan outline default di Chrome */
input:focus {
  outline: none;
}
</style>
