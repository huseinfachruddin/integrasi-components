<template>
	<div class="relative">
		<!-- Label above select -->
		<label v-if="showLabel" class="block text-[12px] font-normal font-monserrat text-gray-700 mb-4">
			{{ label }}
		</label>

		<div class="relative h-[38px]">
			<button
				type="button"
				class="w-full h-[38px] px-2 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-blue-600 flex justify-between items-center"
				@click="toggleDropdown"
			>
				<span :class="{ 'text-gray-400': !selectedLabel }">
					{{ selectedLabel || (showLabel ? 'Pilih opsi' : label) }}
				</span>
				<IconChevronDown
					class="w-4 h-4 transition-transform duration-200"
					:class="{ 'rotate-180': isOpen }"
				/>
			</button>

			<div
				v-if="isOpen"
				class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
			>
				<!-- Search input inside dropdown (conditional) -->
				<div v-if="searchable" class="p-3 border-b border-gray-200">
					<input
						ref="searchInput"
						v-model="searchTerm"
						type="text"
						class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
						placeholder="Cari..."
						@keydown.escape="closeDropdown"
						@keydown.enter.prevent="selectFirstOption"
						@keydown.up.prevent="navigateUp"
						@keydown.down.prevent="navigateDown"
					/>
				</div>

				<!-- Options list -->
				<div class="max-h-48 overflow-y-auto">
					<div v-if="filteredOptions.length === 0" class="px-4 py-3 text-gray-500 text-sm">
						Tidak ada data ditemukan
					</div>
					<div
						v-for="(option, index) in filteredOptions"
						:key="option.value"
						class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
						:class="{
							'bg-blue-50 text-blue-600': option.value === selectedValue,
							'bg-gray-100': index === highlightedIndex
						}"
						@click="selectOption(option)"
						@mouseenter="highlightedIndex = index"
					>
						{{ option.label }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { IconChevronDown } from '@tabler/icons-vue'

const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: ''
	},
	options: {
		type: Array,
		required: true
	},
	label: {
		type: String,
		default: 'Pilih opsi'
	},
	searchable: {
		type: Boolean,
		default: false  // Changed default to false
	},
	showLabel: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedValue = ref(props.modelValue)
const searchTerm = ref('')
const searchInput = ref(null)
const highlightedIndex = ref(-1)

const selectedLabel = computed(() => {
	const option = props.options.find(opt => opt.value === selectedValue.value)
	return option ? option.label : ''
})

const filteredOptions = computed(() => {
	// Only filter if searchable is enabled and there's a search term
	if (!props.searchable || !searchTerm.value) {
		return props.options
	}

	return props.options.filter(option =>
		option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
	)
})

const toggleDropdown = async () => {
	isOpen.value = !isOpen.value
	if (isOpen.value) {
		searchTerm.value = ''
		highlightedIndex.value = -1
		await nextTick()
		// Only focus search input if searchable is enabled
		if (props.searchable && searchInput.value) {
			searchInput.value.focus()
		}
	}
}

const closeDropdown = () => {
	isOpen.value = false
	searchTerm.value = ''
	highlightedIndex.value = -1
}

const selectOption = (option) => {
	selectedValue.value = option.value
	emit('update:modelValue', option.value)
	closeDropdown()
}

const selectFirstOption = () => {
	if (filteredOptions.value.length > 0) {
		if (highlightedIndex.value >= 0) {
			selectOption(filteredOptions.value[highlightedIndex.value])
		} else {
			selectOption(filteredOptions.value[0])
		}
	}
}

const navigateDown = () => {
	if (highlightedIndex.value < filteredOptions.value.length - 1) {
		highlightedIndex.value++
	}
}

const navigateUp = () => {
	if (highlightedIndex.value > 0) {
		highlightedIndex.value--
	}
}

const handleClickOutside = (event) => {
	if (!event.target.closest('.relative')) {
		closeDropdown()
	}
}

// Watch for changes in modelValue prop
watch(() => props.modelValue, (newValue) => {
	selectedValue.value = newValue
})

// Reset highlighted index when filtered options change
watch(filteredOptions, () => {
	highlightedIndex.value = -1
})

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>
