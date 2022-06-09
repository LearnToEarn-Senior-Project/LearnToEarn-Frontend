<template></template>
<script>
import AuthServices from "@/services/authentication/AuthServices.js";
export default {
  created() {
    if (!this.$msal.isAuthenticated()) {
      this.$msal.signIn();
    }
  },
};
</script>
