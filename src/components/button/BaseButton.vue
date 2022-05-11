<template>
  <button
    class="rounded-lg font-medium md:px-4 md:py-2 md:text-sm xs:px-2 xs:py-1 xs:text-xs"
    @click="click"
  >
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
