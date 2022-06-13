<template>
  <div class="about p-8">
    {{ msLogin }}
    {{ user }}
  </div>
</template>
<script>
import StudentCard from "@/components/card/StudentCard";

export default {
  components: {
    StudentCard,
  },
  data() {
    return {
      user: this.$msal.data.accessToken,
      msLogin: this.$msal.isAuthenticated(),
    };
  },
  async created() {
    if (this.$msal.isAuthenticated) {
      this.user = await this.$msal.data.graph.profile;
    }
  },
};
</script>
