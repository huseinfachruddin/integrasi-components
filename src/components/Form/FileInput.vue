<!-- FileInput.vue -->
<template>
  <div class="input-file-wrapper">
    <span class="input-file-text">{{ fileName || placeholder }}</span>
    <label :for="id" class="input-file-btn cursor-pointer">Browse</label>
    <input
      :id="id"
      type="file"
      class="input-file hidden"
      :accept="accept"
      @change="handleFileChange"
    />

    <!-- Pesan error -->
    <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: { type: String, default: "file" },
  accept: { type: String, default: ".png,.jpg,.jpeg" },
  maxSize: { type: Number, default: 2 * 1024 * 1024 }, // 2 MB
  placeholder: { type: String, default: "Pilih file..." },
  uploadUrl: { type: String, default: "" }, // jika ingin langsung upload ke server
});

const emit = defineEmits(["update:modelValue", "error"]);

const fileName = ref("");
const error = ref("");

// Handle file change
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const extension = file.name.split(".").pop().toLowerCase();
  const allowedExtensions = props.accept.replace(/\./g, "").split(",");

  // validasi extension
  if (!allowedExtensions.includes(extension)) {
    error.value = `File harus berupa: ${allowedExtensions.join(", ")}`;
    emit("error", error.value);
    e.target.value = null;
    return;
  }

  // validasi size
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

  let fileUrl = "";
  if (props.uploadUrl) {
    // contoh upload dengan fetch (bisa ganti axios)
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(props.uploadUrl, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      fileUrl = data.url || ""; // sesuaikan dengan response server
    } catch (err) {
      error.value = "Upload gagal";
      emit("error", error.value);
      return;
    }
  } else {
    // fallback: fake url
    fileUrl = `https://example.com/uploads/${file.name}`;
  }

  const fileData = {
    extension,
    size: file.size,
    file_name: file.name,
    file_url: fileUrl,
  };

  emit("update:modelValue", fileData);
};
</script>

<style scoped>
.input-file-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-file-text {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 200px;
}

.input-file-btn {
  background: #4f46e5;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
}

.input-file-btn:hover {
  background: #4338ca;
}
</style>
