<template>
  <div class="row-start-1 text-center">
    <span class="font-semibold text-[40px]">Account Setting</span>
    <img class="h-[127px] w-[377px] mt-2" src="@/assets/user/google_logo.png" />
    <div
      @click="bindGoogleAccount"
      class="text-[20px] text-primary-500 font-semibold hover:cursor-pointer"
    >
      Click here to connect Google Account
    </div>
  </div>
</template>
<script>
import AuthServices from "@/services/AuthServices.js";
export default {
  methods: {
    async bindGoogleAccount() {
      const googleUser = await this.$gAuth.signIn();
      if (!googleUser) {
        return null;
      }
      AuthServices.addGoogleUser(
        googleUser["xc"]["access_token"],
        googleUser.getBasicProfile().getGivenName(),
        googleUser.getBasicProfile().getFamilyName(),
        googleUser.getBasicProfile().getEmail(),
        googleUser.getBasicProfile().getImageUrl()
      );
    },
  },
};
</script>
