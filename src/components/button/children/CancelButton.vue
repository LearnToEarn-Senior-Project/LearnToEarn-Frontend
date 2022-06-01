<template>
  <BaseButton
    :text="text"
    :popup="popup"
    class="text-shade-white bg-neutral-500 hover:bg-neutral-700 active:bg-neutral-900"
  />
</template>
<script>
import BaseButton from "../BaseButton";
export default {
  components: { BaseButton },
  props: {
    text: {
      type: String,
      default: "Cancel",
    },
    popup: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
