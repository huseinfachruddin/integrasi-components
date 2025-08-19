// src/components/ui/TableSkeleton.vue
<template>
	<div :class="['overflow-x-auto', containerClass]">
		<table :class="['min-w-full table-auto', tableClass]">
			<thead :class="['bg-white overflow-hidden', theadClass]">
			<tr :class="['border-b border-[#E9ECEF]', headerRowClass]">
				<th v-for="(row, index) in rows"
						:key="index"
						:class="[
                'border-r border-[#E9ECEF] px-4 py-3 font-semibold relative',
                index === 0 ? 'rounded-tl-[12px]' : '',
                index === rows.length - 1 ? 'border-r-0 rounded-tr-[12px]' : '',
                headerCellClass
              ]"
				>
					<div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
				</th>
			</tr>
			</thead>
			<tbody :class="['bg-white', tbodyClass]">
			<tr v-for="(_, columnIndex) in skeletonRows"
					:key="columnIndex"
					:class="[
              'hover:bg-gray-100 transition-colors',
              columnIndex % 2 === 0 ? 'bg-[#3F6AD812]' : 'bg-white',
              columnIndex !== skeletonRows - 1 ? 'border-b border-[#E9ECEF]' : '',
              rowClass
            ]"
			>
				<td v-for="(row, rowIndex) in rows"
						:key="rowIndex"
						:class="[
                'px-4 py-3',
                rowIndex !== rows.length - 1 ? 'border-r border-[#E9ECEF]' : '',
                cellClass
              ]"
				>
					<div class="animate-pulse">
						<div v-if="row.type === 'text'" class="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
						<div v-else-if="row.type === 'badge'" class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
						<div v-else-if="row.type === 'avatar'" class="flex items-center space-x-3">
							<div class="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
							<div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
						</div>
						<div v-else-if="row.type === 'date'" class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
						<div v-else class="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
					</div>
				</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'TableSkeleton',
	props: {
		rows: {
			type: Array,
			required: true,
			default: () => []
		},
		skeletonRows: {
			type: Number,
			default: 5
		},
		// Styling Props
		containerClass: {
			type: String,
			default: ''
		},
		tableClass: {
			type: String,
			default: ''
		},
		theadClass: {
			type: String,
			default: ''
		},
		headerRowClass: {
			type: String,
			default: ''
		},
		headerCellClass: {
			type: String,
			default: ''
		},
		tbodyClass: {
			type: String,
			default: ''
		},
		rowClass: {
			type: String,
			default: ''
		},
		cellClass: {
			type: String,
			default: ''
		}
	}
}
</script>

<style scoped>
table {
	border-collapse: separate;
	border-spacing: 0;
}

thead th {
	border-top: 1px solid #E9ECEF;
	border-left: 1px solid #E9ECEF;
	border-right: 1px solid #E9ECEF;
	border-bottom: 1px solid #E9ECEF;
	background: #fff;
}

thead th:first-child {
	border-top-left-radius: 12px;
}

thead th:last-child {
	border-top-right-radius: 12px;
}
</style>