<template>
  <div>
    <label v-if="label" :for="id" class="block text-[12px] font-normal font-monserrat text-gray-700 mb-4">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <div v-if="prefix" class="absolute inset-y-0 left-0 flex items-center">
        <span class="px-3 py-2  text-sm">
          {{ prefix }}
        </span>
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <div v-if="suffix" class="absolute inset-y-0 right-0 flex items-center">
        <span class="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-gray-500 text-sm">
          {{ suffix }}
        </span>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="hint && !error" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
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
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    }
  },
  emits: ['update:modelValue', 'blur', 'focus'],
  computed: {
    inputClasses() {
      const baseClasses = 'block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
      const sizeClasses = {
        sm: 'px-2 py-1 text-sm',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base'
      }
      const roundingClasses = this.prefix ? 'rounded-r-md' : this.suffix ? 'rounded-l-md' : 'rounded-md'
      const stateClasses = this.error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
      const disabledClasses = this.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''

      // Add padding and text alignment for prefix/suffix
      const prefixClasses = this.prefix ? 'pl-20 text-right' : ''
      const suffixClasses = this.suffix && !this.prefix ? 'pr-20' : ''

      return [
        baseClasses,
        sizeClasses[this.size],
        roundingClasses,
        stateClasses,
        disabledClasses,
        prefixClasses,
        suffixClasses
      ].filter(Boolean).join(' ')
    }
  }
}
</script>
