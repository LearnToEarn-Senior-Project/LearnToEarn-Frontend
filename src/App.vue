<template>
  <NavBar />
  <router-view />
</template>
<script>
import NavBar from "@/components/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>
