<template>
  <NavBar class="select-none" />
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
