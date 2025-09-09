<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	value: {
		type: Boolean,
		default: false
	},
	data: {
		type: Object,
		default: null
	},
	index: {
		type: Number,
		default: null
	},
	isDisabled: {
		type: Boolean,
		default: false
	},
	isLabel: {
		type: Boolean,
		default: true
	},
  title: {
    type: String,
    default: ''
  }
})

const isActive = ref(props.value)
const bufferData = ref(props.data)

watch(isActive, (val) => {
	isActive.value = val
})

const emit = defineEmits(['handleToggle'])

const handleToggle = (data) => {
	bufferData.value = {
		...data,
		is_active: isActive.value,
		index: props.index
	}
	emit('handleToggle', bufferData.value)
}
</script>

<template>
	<div class="flex items-center justify-center gap-2">
		<span v-if="isLabel" class="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">{{ title }}</span>
		<label class="relative inline-flex items-center cursor-pointer">
			<input :disabled="isDisabled" @change="handleToggle(data)" type="checkbox" v-model="isActive" :checked="isActive" class="sr-only peer" />
			<div
				class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
			></div>
		</label>
	</div>
</template>
