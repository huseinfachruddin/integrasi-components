<template>
  <div
    v-if="visible"
    :class="[
      'flex items-center justify-between p-4 mb-4 rounded border text-m',
      alertClasses[type].bg,
      alertClasses[type].border,
      alertClasses[type].text,
    ]"
  >
    <div class="flex items-center gap-2">
      <component :is="alertClasses[type].icon" class="w-5 h-5" />
      <span>{{ message }}</span>
    </div>
    <button @click="close" class="font-bold">×</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  IconInfoCircle,
  IconX,
  IconAlertTriangle,
  IconCircleCheck,
} from "@tabler/icons-vue";

const props = defineProps({
  type: {
    type: String,
    default: "info", // info | error | warning | success
  },
  message: {
    type: String,
    required: true,
  },
});

const visible = ref(true);
const close = () => (visible.value = false);

const alertClasses = {
  info: {
    bg: "bg-info-light",
    border: "border-info",
    text: "text-info-dark",
    icon: IconInfoCircle,
  },
  error: {
    bg: "bg-danger-light",
    border: "border-danger",
    text: "text-danger-dark",
    icon: IconX,
  },
  warning: {
    bg: "bg-warning-light",
    border: "border-warning",
    text: "text-warning-dark",
    icon: IconAlertTriangle,
  },
  success: {
    bg: "bg-success-light",
    border: "border-success",
    text: "text-success-dark",
    icon: IconCircleCheck,
  },
};
</script>
