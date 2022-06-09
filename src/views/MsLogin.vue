<template></template>
<script>
export default {
  async created() {
    if (!this.$msal.isAuthenticated()) {
      await this.$msal.signIn();
    }
  },
};
</script>
