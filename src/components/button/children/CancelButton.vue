<template>
  <span
    class="text-shade-white bg-neutral-500 hover:bg-neutral-700 active:bg-neutral-900 rounded-lg font-medium md:px-4 md:py-2 md:text-sm xs:px-2 xs:py-1 xs:text-xs text-center hover:cursor-pointer select-none"
    @click="click"
  >
    {{ text }}
  </span>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "Cancel",
    },
    click: {
      type: Function,
      default: "Cancel",
    },
  },
};
</script>
