<template>
  <div class="relative h-max" @mouseenter="show" @mouseleave="hide">
    <slot />
    <div
      v-if="visible"
      :class="[
        'absolute whitespace-nowrap px-2 py-1 bg-gray-700 text-white text-[10px] rounded',
        positionClasses,
      ]"
    >
      {{ content }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom", "left", "right"].includes(value),
  },
});

const visible = ref(false);

const show = () => {
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

const positionClasses = ref("");

onMounted(() => {
  switch (props.position) {
    case "top":
      positionClasses.value = "bottom-0 left-1/2 ";
      break;
    case "bottom":
      positionClasses.value = "top-full left-0";
      break;
    case "left":
      positionClasses.value = "right-full top-1/2 transform -translate-y-1/2";
      break;
    case "right":
      positionClasses.value = "left-full top-1/2 transform -translate-y-1/2";
      break;
  }
});
</script>

<style scoped>
/* Additional styles can be added here for better customization */
</style>
