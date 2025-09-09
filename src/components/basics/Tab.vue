<template>
	<div
		class="grid grid-flow-col auto-cols-auto overflow-x-auto tab-wrapper"
		:class="{ 'w-full': width === 'full', 'w-fit': width !== 'full', 'rounded-lg bg-netral-20 dark:bg-netral-80': type === 'fill' }"
	>
		<div v-for="(tab, index) in props.tabList" :key="index" class="flex" :class="{ 'flex-1': width === 'full' }">
			<div
				class="cursor-pointer w-full flex flex-col"
				:class="{
					'rounded-lg bg-primary hover:bg-primary-semi-dark dark:bg-primary-dark': activeTab === tab && type === 'fill',
					'rounded-lg bg-netral-20 hover:bg-netral-40 dark:bg-netral-80': activeTab !== tab && type === 'fill',
					'border-b': activeTab !== tab && type === 'border',
					'w-auto': width !== 'full'
				}"
				@click="handleTab(tab)"
			>
				<p
					class="px-4 py-2 text-center"
					:class="{
						'text-netral-10 dark:text-netral-100': activeTab === tab && type === 'fill',
						'text-netral-100 ': activeTab !== tab && type === 'fill',
						'text-netral-100 dark:text-netral-10': activeTab === tab && type === 'border',
						'text-netral-80 my-auto': activeTab !== tab && type === 'border',
						'my-auto': activeTab === tab && type === 'border',
						'text-body': textSize === 'default',
						'text-body-medium': textSize === 'medium'
					}"
				>
					{{ tab }}
				</p>
				<div class="h-[3px] bg-primary rounded" v-if="activeTab === tab && type === 'border'"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	tabList: Array,
	activeTab: String,
	width: String,
	type: { type: String, default: 'fill' },
	textSize: { type: String, default: 'default' }
})
const emit = defineEmits(['selectedTab'])
const handleTab = (event) => {
	emit('selectedTab', event)
}
</script>

<style>
.tab-wrapper::-webkit-scrollbar {
	height: 7px;
}

.tab-wrapper::-webkit-scrollbar-track {
	background-color: #eee;
}

.tab-wrapper::-webkit-scrollbar-thumb {
	@apply bg-primary rounded-full
	/* background-color: rgb(138, 133, 133); */;
}
</style>
