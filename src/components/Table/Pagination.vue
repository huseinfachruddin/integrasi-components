<template>
  <div class="flex items-center justify-between mt-4">
    <div class="text-sm text-gray-700">
      Menampilkan {{ startItem || 0 }} sampai {{ endItem || 0 }} dari
      {{ pagination.total || 0 }} data
    </div>

    <div class="flex items-center space-x-1">
      <!-- Far Left - Go to first page -->
      <Button
        variant="none"
        size="xsmall"
        :disabled="currentPage <= 1"
        @click="goToPage(1)"
        class="p-1"
      >
        <IconChevronLeftPipe class="w-[20px] h-[20px]" />
      </Button>

      <!-- Left - Previous page -->
      <Button
        variant="none"
        size="xsmall"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
        class="p-1"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="#71717B"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>

      <div class="flex space-x-1">
        <Button
          v-for="page in visiblePages"
          :key="page"
          :variant="page === currentPage ? 'primary' : 'secondary'"
          size="small"
          @click="goToPage(page)"
          class="p-2 m-1"
        >
          {{ page }}
        </Button>
      </div>

      <!-- Right - Next page -->
      <Button
        variant="none"
        size="xsmall"
        :disabled="currentPage >= (pagination.last_page || 1)"
        @click="goToPage(currentPage + 1)"
        class="p-1"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="#71717B"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>

      <!-- Far Right - Go to last page -->
      <Button
        variant="none"
        size="xsmall"
        :disabled="currentPage >= (pagination.last_page || 1)"
        @click="goToPage(pagination.last_page || 1)"
        class="p-1"
      >
        <IconChevronRightPipe class="w-[20px] h-[20px]" />
      </Button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Button from "@/components/Button/index.vue";
import { IconChevronLeftPipe, IconChevronRightPipe } from "@tabler/icons-vue";

const props = defineProps({
  pagination: {
    type: Object,
    required: true,
    default: () => ({
      page: 1,
      per_page: 10,
      total: 0,
      last_page: 1,
    }),
  },
  defaultLimit: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["pageTo"]);

const currentPage = computed(() => props.pagination.page || 1);

const startItem = computed(() => {
  return (currentPage.value - 1) * props.pagination.per_page + 1;
});

const endItem = computed(() => {
  const end = currentPage.value * props.pagination.per_page;
  return end > props.pagination.total ? props.pagination.total : end;
});

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = props.pagination.last_page || 1;
  const pages = [];

  let start = Math.max(1, current - 2);
  let end = Math.min(total, current + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= (props.pagination.last_page || 1)) {
    emit("pageTo", { page });
  }
};
</script>
