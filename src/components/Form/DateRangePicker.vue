<template>
	<div id="date-range-picker" date-rangepicker class="flex items-center gap-2">
		<div class="form w-full sm:w-[200px]">
			<label v-if="startLabel" class="mb-1 label text-primary block">
				{{ startLabel }}
			</label>
			<div class="relative">
				<input
					id="datepicker-range-start"
					name="start"
					type="text"
					v-model="localStartDate"
					class="input input-primary rounded-[6px] w-full h-[40px] pe-10"
					:placeholder="startPlaceholder"
					@input="handleStartDateChange"
				>
				<div class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
					<svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
						<path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
					</svg>
				</div>
			</div>
		</div>

		<span class="mx-2 text-gray-500 mt-6" v-if="showConnector">to</span>

		<div class="form w-full sm:w-[200px]">
			<label v-if="endLabel" class="mb-1 label text-primary block">
				{{ endLabel }}
			</label>
			<div class="relative">
				<input
					id="datepicker-range-end"
					name="end"
					type="text"
					v-model="localEndDate"
					class="input input-primary rounded-[6px] w-full h-[40px] pe-10"
					:placeholder="endPlaceholder"
					@input="handleEndDateChange"
				>
				<div class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
					<svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
						<path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Datepicker } from 'flowbite-datepicker'

const props = defineProps({
	modelValue: {
		type: Object,
		default: () => ({ startDate: '', endDate: '' })
	},
	startLabel: {
		type: String,
		default: 'Tanggal Mulai'
	},
	endLabel: {
		type: String,
		default: 'Tanggal Selesai'
	},
	startPlaceholder: {
		type: String,
		default: 'Pilih tanggal mulai'
	},
	endPlaceholder: {
		type: String,
		default: 'Pilih tanggal selesai'
	},
	showConnector: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['update:modelValue', 'change'])

const localStartDate = ref('')
const localEndDate = ref('')
let startDatePicker = null
let endDatePicker = null

const formatDateForDisplay = (dateString) => {
	if (!dateString) return ''
	const date = new Date(dateString)
	return date.toLocaleDateString('id-ID')
}

const formatDateForAPI = (dateString) => {
	if (!dateString) return ''
	const date = new Date(dateString)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

const handleStartDateChange = () => {
	const startDate = formatDateForAPI(localStartDate.value)

	// Update end date picker's minDate
	if (endDatePicker && startDate) {
		endDatePicker.setOptions({
			minDate: new Date(startDate)
		})

		// Clear end date if it's before start date
		if (localEndDate.value) {
			const endDate = formatDateForAPI(localEndDate.value)
			if (endDate < startDate) {
				localEndDate.value = ''
				emit('update:modelValue', { startDate, endDate: '' })
				emit('change', { startDate, endDate: '' })
				return
			}
		}
	}

	emit('update:modelValue', {
		startDate,
		endDate: formatDateForAPI(localEndDate.value)
	})
	emit('change', {
		startDate,
		endDate: formatDateForAPI(localEndDate.value)
	})
}

const handleEndDateChange = () => {
	const endDate = formatDateForAPI(localEndDate.value)

	// Update start date picker's maxDate
	if (startDatePicker && endDate) {
		startDatePicker.setOptions({
			maxDate: new Date(endDate)
		})

		// Clear start date if it's after end date
		if (localStartDate.value) {
			const startDate = formatDateForAPI(localStartDate.value)
			if (startDate > endDate) {
				localStartDate.value = ''
				emit('update:modelValue', { startDate: '', endDate })
				emit('change', { startDate: '', endDate })
				return
			}
		}
	}

	emit('update:modelValue', {
		startDate: formatDateForAPI(localStartDate.value),
		endDate
	})
	emit('change', {
		startDate: formatDateForAPI(localStartDate.value),
		endDate
	})
}

const initDatePickers = () => {
	const startInput = document.getElementById('datepicker-range-start')
	const endInput = document.getElementById('datepicker-range-end')

	if (startInput && endInput) {
		startDatePicker = new Datepicker(startInput, {
			format: 'dd/mm/yyyy',
			autohide: true,
			orientation: 'bottom auto'
		})

		endDatePicker = new Datepicker(endInput, {
			format: 'dd/mm/yyyy',
			autohide: true,
			orientation: 'bottom auto'
		})

		// Set initial values if provided
		if (props.modelValue.startDate) {
			localStartDate.value = formatDateForDisplay(props.modelValue.startDate)
		}
		if (props.modelValue.endDate) {
			localEndDate.value = formatDateForDisplay(props.modelValue.endDate)
		}
	}
}

watch(() => props.modelValue, (newValue) => {
	if (newValue.startDate !== formatDateForAPI(localStartDate.value)) {
		localStartDate.value = formatDateForDisplay(newValue.startDate)
	}
	if (newValue.endDate !== formatDateForAPI(localEndDate.value)) {
		localEndDate.value = formatDateForDisplay(newValue.endDate)
	}
}, { deep: true })

onMounted(() => {
	initDatePickers()
})

onUnmounted(() => {
	if (startDatePicker) startDatePicker.destroy()
	if (endDatePicker) endDatePicker.destroy()
})
</script>