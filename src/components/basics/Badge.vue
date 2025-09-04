<script setup>
const props = defineProps({
	badgeType: {
		type: String,
		default: 'primary'
	},
	label: {
		type: String,
		default: ''
	},
	badgeSize: {
		type: String,
		default: 'small'
	}
})
</script>

<template>
	<button
		v-if="badgeType === 'primary'"
		class="text-nowrap bg-primary-light text-primary font-semibold flex items-center justify-center rounded-md border border-primary-dark"
		:class="{ ' px-[10px] py-[6px] text-s': badgeSize === 'large', ' px-2 py-1 text-xs': badgeSize === 'small' }"
	>
		{{ label }}
	</button>
	<button
		v-if="badgeType === 'success'"
		class="text-nowrap bg-success-light text-success text-sm font-medium me-2 rounded-md border border-success-dark"
		:class="{ ' px-[10px] py-[6px] text-s': badgeSize === 'large', ' px-2 py-1 text-xs': badgeSize === 'small' }"
	>
		{{ label }}
	</button>
	<button
		v-if="badgeType === 'warning'"
		class="text-nowrap bg-warning-light text-warning text-sm font-medium me-2 rounded-md border border-warning-dark"
		:class="{ ' px-[10px] py-[6px] text-s': badgeSize === 'large', ' px-2 py-1 text-xs': badgeSize === 'small' }"
	>
		{{ label }}
	</button>
	<button
		v-if="badgeType === 'error'"
		class="text-nowrap bg-danger-light text-danger text-sm font-medium me-2 rounded-md border border-danger-dark"
		:class="{ ' px-[10px] py-[6px] text-s': badgeSize === 'large', ' px-2 py-1 text-xs': badgeSize === 'small' }"
	>
		{{ label }}
	</button>
	<button
		v-if="badgeType === 'netral'"
		class="text-nowrap bg-netral-200 dark:bg-dark-200 text-netral-600 dark:text-dark-600 text-sm font-medium me-2 rounded-md border border-netral-400 dark:border-dark-400"
		:class="{ ' px-[10px] py-[6px] text-s': badgeSize === 'large', ' px-2 py-1 text-xs': badgeSize === 'small' }"
	>
		{{ label }}
	</button>
	<button
		v-if="badgeType === 'disable'"
		class="text-nowrap bg-netral-300 dark:bg-dark-300 text-netral-800 dark:text-dark-800 text-sm font-medium me-2 rounded-md border border-netral-500 dark:border-dark-500"
		:class="{ ' px-[10px] py-[6px] text-s': badgeSize === 'large', ' px-2 py-1 text-xs': badgeSize === 'small' }"
	>
		{{ label }}
	</button>

	<button v-if="badgeType === null"></button>
</template>
