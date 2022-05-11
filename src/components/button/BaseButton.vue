<template>
  <button class="rounded-lg font-medium px-4 py-2 text-sm" @click="click">
    {{ text }}
  </button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    click: {
      type: Function,
    },
  },
};
</script>
