<template>
	<div class="mb-4">
		<label v-if="label" :for="inputId" class="block text-[12px] font-normal font-monserrat text-gray-700 mb-4">
			{{ label }}
			<span v-if="required" class="text-red-500">*</span>
		</label>
		<div class="relative max-w-sm">
			<input
				ref="datepickerRef"
				:id="inputId"
				v-model="localValue"
				type="text"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				:required="required"
				:class="inputClasses"
				@input="handleInput"
				@blur="handleBlur"
				@focus="$emit('focus', $event)"
			/>
			<div class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
				<svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
					<path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
				</svg>
			</div>
		</div>
		<p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
		<p v-if="hint && !error" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Datepicker } from 'flowbite-datepicker'

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: 'Pilih tanggal'
	},
	prefix: {
		type: String,
		default: ''
	},
	suffix: {
		type: String,
		default: ''
	},
	min: {
		type: String,
		default: ''
	},
	max: {
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
	},
	// Legacy prop for backward compatibility
	errorMessage: {
		type: String,
		default: ''
	}
})

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const inputId = ref(`date-${Math.random().toString(36).substr(2, 9)}`)
const localValue = ref(props.modelValue)

const inputClasses = computed(() => {
	const baseClasses = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full '
	const sizeClasses = {
		sm: 'p-2',
		md: 'p-2.5',
		lg: 'p-3'
	}
	const errorState = props.error || props.errorMessage
	const stateClasses = errorState ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500' : ''
	const disabledClasses = props.disabled ? 'cursor-not-allowed opacity-50' : ''
	const darkClasses = 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

	return [
		baseClasses,
		sizeClasses[props.size],
		stateClasses,
		disabledClasses,
		darkClasses
	].filter(Boolean).join(' ')
})

// Support both error prop and legacy errorMessage prop
const error = computed(() => props.error || props.errorMessage)

const datepickerRef = ref(null)
let datepickerInstance = null

onMounted(() => {
	if (datepickerRef.value) {
		const options = {
			autohide: true,
			format: 'yyyy-mm-dd',
			todayBtn: true,
			clearBtn: true,
			todayBtnText: 'Hari ini',
			clearBtnText: 'Hapus',
			nextArrow: '→',
			prevArrow: '←',
		}

		// Add min/max date constraints if provided
		if (props.min) options.minDate = props.min
		if (props.max) options.maxDate = props.max

		datepickerInstance = new Datepicker(datepickerRef.value, options)

		// Listen for date selection
		datepickerRef.value.addEventListener('changeDate', (event) => {
			const selectedDate = event.detail.date
			if (selectedDate) {
				const formattedDate = selectedDate.toISOString().split('T')[0]
				localValue.value = formattedDate
				emit('change', formattedDate)
			}
		})

		// Set initial value if provided
		if (props.modelValue) {
			datepickerInstance.setDate(props.modelValue)
		}
	}
})

onUnmounted(() => {
	if (datepickerInstance) {
		datepickerInstance.destroy()
	}
})

watch(() => props.modelValue, (newValue) => {
	localValue.value = newValue
	if (datepickerInstance && newValue) {
		datepickerInstance.setDate(newValue)
	}
})

watch(localValue, (newValue) => {
	emit('update:modelValue', newValue)
})

const handleInput = (event) => {
	const value = event.target.value
	localValue.value = value
	emit('change', value)
}

const handleBlur = (event) => {
	emit('blur', event.target.value)
}
</script>