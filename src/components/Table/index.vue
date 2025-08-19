<template>
  <!-- Use TableSkeleton when loading -->
  <!--	<TableSkeleton
		v-if="loading"
		:rows="rows"
		:skeleton-rows="5"
		:container-class="containerClass"
		:table-class="tableClass"
		:thead-class="theadClass"
		:header-row-class="headerRowClass"
		:header-cell-class="headerCellClass"
		:tbody-class="tbodyClass"
		:row-class="rowClass"
		:cell-class="cellClass"
	/>-->
  <div :class="['overflow-x-auto ', containerClass]">
    <table
      :class="['min-w-full table-auto border border-[#E9ECEF] ', tableClass]"
    >
      <thead :class="['bg-white overflow-hidden', theadClass]">
        <tr :class="['border-b border-[#E9ECEF]', headerRowClass]">
          <th
            v-for="(row, index) in rows"
            :key="index"
            :class="[
              'border-r border-[#E9ECEF] px-4 py-3 font-semibold relative',
              index === 0 ? 'rounded-tl-[12px]' : '',
              index === rows.length - 1 ? 'border-r-0 rounded-tr-[12px]' : '',
              headerCellClass,
            ]"
          >
            <slot name="table-header" :row="row" :index="index" />
          </th>
        </tr>
      </thead>
      <tbody :class="['bg-white', tbodyClass]">
        <!-- Loading Row -->
        <tr v-if="loading" :class="['text-center', loadingRowClass]">
          <td :colspan="rows.length" :class="['py-8', loadingCellClass]">
            <div class="flex justify-center items-center">
              <div
                class="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"
              ></div>
              <span class="ml-2">Loading...</span>
            </div>
          </td>
        </tr>

        <!-- Empty Data Row -->
        <tr
          v-else-if="columns.length === 0"
          :class="['text-center', emptyRowClass]"
        >
          <td
            :colspan="rows.length"
            :class="['py-8 text-gray-500', emptyCellClass]"
          >
            Tidak ada data
          </td>
        </tr>

        <!-- Data Rows -->
        <tr
          v-else
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          :class="[
            'hover:bg-gray-100 transition-colors',
            columnIndex % 2 === 0 ? 'bg-[#3F6AD812]' : 'bg-white',
            columnIndex !== columns.length - 1
              ? 'border-b border-[#E9ECEF]'
              : '',
            rowClass,
          ]"
        >
          <td
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            :class="[
              'px-4 py-2',
              rowIndex !== rows.length - 1 ? 'border-r border-[#E9ECEF]' : '',
              cellClass,
            ]"
          >
            <slot
              name="table-content"
              :row="row"
              :column="column"
              :index="columnIndex"
              :rowIndex="rowIndex"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TableSkeleton from "@/components/Skeleton/TableSkeleton.vue";

export default {
  name: "TableComponent",
  components: {
    TableSkeleton,
  },
  props: {
    rows: {
      type: Array,
      required: true,
      default: () => [],
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // Styling Props
    containerClass: {
      type: String,
      default: "",
    },
    tableClass: {
      type: String,
      default: "",
    },
    theadClass: {
      type: String,
      default: "",
    },
    headerRowClass: {
      type: String,
      default: "",
    },
    headerCellClass: {
      type: String,
      default: "",
    },
    tbodyClass: {
      type: String,
      default: "",
    },
    rowClass: {
      type: String,
      default: "",
    },
    cellClass: {
      type: String,
      default: "",
    },
    loadingRowClass: {
      type: String,
      default: "",
    },
    loadingCellClass: {
      type: String,
      default: "",
    },
    emptyRowClass: {
      type: String,
      default: "",
    },
    emptyCellClass: {
      type: String,
      default: "",
    },
  },
  emits: ["handleSort"],
  methods: {
    handleSort(row) {
      this.$emit("handleSort", row);
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: separate; /* penting supaya border-radius berfungsi */
  border-spacing: 0; /* biar nggak ada jarak antar sel */
}

thead th {
  border-top: 1px solid #e9ecef;
  border-left: 1px solid #e9ecef;
  border-right: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  background: #fff; /* pastikan ada background */
}

thead th:first-child {
  border-top-left-radius: 12px;
}

thead th:last-child {
  border-top-right-radius: 12px;
}
</style>
