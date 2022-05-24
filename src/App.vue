<template>
  <NavBar class="select-none" v-if="this.$store.getters.getCurrentUser" />
  <router-view class="select-none" />
</template>
<script>
import NavBar from "@/components/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>
