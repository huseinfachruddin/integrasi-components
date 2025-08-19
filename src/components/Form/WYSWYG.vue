<script setup>
import { ref, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const content = ref("");

const emit = defineEmits(["update:value", "handleInput", "handleKeyup"]);
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Isi konten...",
  },
  value: {
    type: String,
    default: null,
  },
  error: {
    type: String,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.value,
  (val) => {
    content.value = val;
  }
);

const handleInput = (e) => {
  emit("update:value", content.value);
  emit("handleInput", content.value);
};

const handleKeyup = () => {
  emit("handleKeyup");
};
</script>

<template>
  <QuillEditor
    v-model:content="content"
    contentType="html"
    @input="handleInput"
    @keyup="handleKeyup"
    theme="snow"
    :placeholder="placeholder"
    toolbar="essential"
    style="height: 350px; border-radius: 7px"
  />
</template>
<script>
export default { name: "WYSWYG" };
</script>
