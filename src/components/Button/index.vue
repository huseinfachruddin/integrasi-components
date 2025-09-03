<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[buttonClasses, customClass]"
    @click="handleClick"
  >
    <div
      v-if="loading"
      class="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"
    ></div>
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "secondary",
        "danger",
        "warning",
        "download",
        "cyan",
        "none",
        "success",
        "outline",
      ].includes(value),
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) =>
      ["small", "medium", "big", "xsmall", "long"].includes(value),
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: "",
  },
  fontWeight: {
    type: String,
    default: "medium",
    validator: (value) =>
      ["light", "normal", "medium", "semibold", "bold", "extrabold"].includes(
        value
      ),
  },
});

const emit = defineEmits(["click"]);

const buttonClasses = computed(() => {
  const base =
    "inline-flex items-center text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-blue-300 disabled:hover:scale-100";

  const fonts = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  const variants = {
    success: "btn btn-success",
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    danger: "btn btn-danger",
    warning: "btn btn-warning",
    download: "btn btn-download",
    cyan: "btn btn-blue-light",
    none: " text-[black] ",
    outline: "btn btn-outline",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    big: "px-6 py-3 text-base btn-big",
    xsmall: "p-1 m-1",
    long: "px-4 py-2 text-sm w-full",
  };

  const disabledClasses =
    props.disabled || props.loading
      ? "opacity-50 cursor-not-allowed"
      : "cursor-pointer";

  return [
    base,
    fonts[props.fontWeight],
    variants[props.variant],
    sizes[props.size],
    disabledClasses,
  ].join(" ");
});

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>
