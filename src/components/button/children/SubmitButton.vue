<template>
  <BaseButton
    :text="text"
    class="text-shade-white bg-primary-400 hover:bg-primary-700 active:bg-primary-900"
  />
</template>
<script>
import BaseButton from "../BaseButton";
export default {
  components: { BaseButton },
  props: {
    text: {
      type: String,
      required: false,
      default: "Save",
    },
  },
};
</script>
