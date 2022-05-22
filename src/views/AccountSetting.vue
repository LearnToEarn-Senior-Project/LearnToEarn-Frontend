<template>
  <div class="justify-center items-center grid grid-rows-2 mt-10">
    <notBind v-if="isBind == false" />
    <alreadyBind v-if="isBind == true" />
    <h1>Is Authorized: {{ isBind }}</h1>
  </div>
  <footer
    v-if="isBind == true"
    class="min-w-full text-error-600 text-[20px] font-semibold hover:cursor-pointer text-right"
  >
    <span class="mr-6" @click="unbindGoogleAccount">
      Disconnect this account</span
    >
  </footer>
</template>
<script>
import notBind from "@/components/accountSetting/notBind.vue";
import alreadyBind from "@/components/accountSetting/alreadyBind.vue";
export default {
  components: {
    notBind,
    alreadyBind,
  },
  data() {
    return {
      isBind: this.$gAuth.isAuthorized,
      googleData: this.$gAuth.GoogleAuth,
    };
  },
  methods: {
    async unbindGoogleAccount() {
      await this.$gAuth.signOut();
      this.$router.go();
    },
  },
};
</script>
