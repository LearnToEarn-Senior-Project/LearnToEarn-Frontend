<template>
  <div class="font-prompt">
    <NavBar
      class="select-none"
      v-if="
        this.$store.getters.getCurrentUser &&
        this.$store.getters.getCurrentToken &&
        this.$store.getters.getRole
      "
    />
    <router-view />
  </div>
</template>
<script>
import NavBar from "@/components/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>
