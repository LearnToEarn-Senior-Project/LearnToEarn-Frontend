<template>
  <nav class="bg-primary-900 p-2">
    <NavBarDesktop />
    <NavBarMobile />
  </nav>
</template>
<script>
import NavBarDesktop from "@/components/navbar/children/NavBarDesktop";
import NavBarMobile from "@/components/navbar/children/NavBarMobile";
export default {
  components: {
    NavBarDesktop,
    NavBarMobile,
  },
};
</script>
