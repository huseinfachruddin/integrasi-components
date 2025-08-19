<template>
  <div class="flex items-center gap-4 mb-4">
    <label class="text-sm text-gray-700">Tampilkan:</label>
    <Select
      :model-value="defaultLimit"
      :options="limitOptionsFormatted"
      label="Pilih limit"
      class="w-[70px]"
      @update:model-value="handleLimitChange"
    />
    <span class="text-sm text-gray-700">data per halaman</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Select from "@/components/Form/Selector.vue";

const props = defineProps({
  defaultLimit: {
    type: Number,
    default: 10,
  },
  limitOptions: {
    type: Array,
    default: () => [10, 25, 50, 100],
  },
});

const emit = defineEmits(["pageTo"]);

const limitOptionsFormatted = computed(() => {
  return props.limitOptions.map((limit) => ({
    label: limit.toString(),
    value: limit,
  }));
});

const handleLimitChange = (newLimit) => {
  emit("pageTo", { limit: newLimit });
};
</script>
