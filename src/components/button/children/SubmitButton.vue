<template>
  <BaseButton
    :text="text"
    :click="confirmation"
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
      default: "Save",
    },
  },
  methods: {
    confirmation() {
      this.$swal({
        icon: "question",
        iconColor: "#1425ff",
        title: "Do you want to...",
        text: "text text",
        showCancelButton: true,
        confirmButtonText: "Purchase",
      });
    },
  },
};
</script>
