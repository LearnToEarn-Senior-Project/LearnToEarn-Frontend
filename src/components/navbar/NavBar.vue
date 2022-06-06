<template>
  <nav class="bg-primary-900 p-2">
    <NavBarDesktop :logout="() => logout()" />
    <NavBarMobile :logout="() => logout()" />
  </nav>
</template>
<script>
import NavBarDesktop from "@/components/navbar/children/NavBarDesktop";
import NavBarMobile from "@/components/navbar/children/NavBarMobile";
import AuthServices from "@/services/authentication/AuthServices.js";
export default {
  components: {
    NavBarDesktop,
    NavBarMobile,
  },
  methods: {
    logout() {
      AuthServices.logout();
      this.$msal.signOut();
    },
  },
};
</script>
