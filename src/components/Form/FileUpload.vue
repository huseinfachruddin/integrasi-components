<template>
  <div>
    <label v-if="label" :for="id" class="block text-[12px] font-normal font-monserrat text-gray-700 mb-4">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div
      :class="dropzoneClasses"
      @dragover.prevent
      @dragenter.prevent
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <input
        ref="fileInput"
        :id="id"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        class="hidden"
        @change="handleFileSelect"
      />

      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="mt-4">
          <p class="text-sm text-gray-600">
            <button type="button" class="font-medium text-blue-600 hover:text-blue-500">
              Upload a file
            </button>
            or drag and drop
          </p>
          <p class="text-xs text-gray-500">{{ acceptText }}</p>
        </div>
      </div>
    </div>

    <!-- File Preview -->
    <div v-if="selectedFiles.length > 0" class="mt-2 space-y-2">
      <div
        v-for="(file, index) in selectedFiles"
        :key="index"
        class="flex items-center justify-between p-2 bg-gray-50 rounded-md"
      >
        <div class="flex items-center">
          <svg class="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-gray-900">{{ file.name }}</span>
          <span class="text-xs text-gray-500 ml-2">({{ formatFileSize(file.size) }})</span>
        </div>
        <button
          type="button"
          class="text-red-600 hover:text-red-800"
          @click="removeFile(index)"
        >
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="hint && !error" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseFileUpload',
  props: {
    modelValue: {
      type: [File, Array],
      default: null
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024 // 10MB
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selectedFiles: []
    }
  },
  computed: {
    dropzoneClasses() {
      const baseClasses = 'mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer transition-colors'
      const stateClasses = this.error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
      const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : ''

      return [baseClasses, stateClasses, disabledClasses].filter(Boolean).join(' ')
    },
    acceptText() {
      if (this.accept) {
        return `Accepted: ${this.accept}`
      }
      return 'All file types accepted'
    }
  },
  methods: {
    handleFileSelect(event) {
      const files = Array.from(event.target.files)
      this.processFiles(files)
    },
    handleDrop(event) {
      if (this.disabled) return
      const files = Array.from(event.dataTransfer.files)
      this.processFiles(files)
    },
    processFiles(files) {
      const validFiles = files.filter(file => this.validateFile(file))

      if (this.multiple) {
        this.selectedFiles = [...this.selectedFiles, ...validFiles]
        this.$emit('update:modelValue', this.selectedFiles)
      } else {
        this.selectedFiles = validFiles.slice(0, 1)
        this.$emit('update:modelValue', this.selectedFiles[0] || null)
      }
    },
    validateFile(file) {
      if (file.size > this.maxSize) {
        this.$emit('error', `File ${file.name} is too large. Maximum size is ${this.formatFileSize(this.maxSize)}`)
        return false
      }
      return true
    },
    removeFile(index) {
      this.selectedFiles.splice(index, 1)

      if (this.multiple) {
        this.$emit('update:modelValue', this.selectedFiles)
      } else {
        this.$emit('update:modelValue', null)
      }
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
  }
}
</script>

