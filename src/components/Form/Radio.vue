<template>
  <div>
    <fieldset>
      <legend v-if="label" class="block text-[12px] font-normal font-monserrat text-gray-700 mb-4">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </legend>
      <div :class="containerClasses">
        <div
          v-for="option in options"
          :key="option.value"
          class="flex items-center"
        >
          <input
            :id="`${name}-${option.value}`"
            :name="name"
            type="radio"
            :value="option.value"
            :checked="modelValue === option.value"
            :disabled="disabled || option.disabled"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            @change="$emit('update:modelValue', option.value)"
          />
          <label
            :for="`${name}-${option.value}`"
            class="ml-2 block text-sm text-gray-900 cursor-pointer"
          >
            {{ option.label }}
          </label>
        </div>
      </div>
    </fieldset>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="hint && !error" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseRadio',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true,
      default: () => []
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
    inline: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  computed: {
    containerClasses() {
      return this.inline ? 'flex space-x-4' : 'space-y-2'
    }
  }
}
</script>

