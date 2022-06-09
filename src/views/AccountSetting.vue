<template>
  <div class="justify-center items-center grid grid-rows-2 mt-10">
    <div class="row-start-1 text-center" v-if="user == null">
      <span class="font-bold text-[40px]">Account Setting</span>
      <img
        class="h-[127px] w-[377px] mt-2"
        src="@/assets/user/google_logo.png"
      />
      <div
        @click="bindGoogleAccount"
        class="text-[20px] text-primary-500 font-bold hover:cursor-pointer"
      >
        Click here to connect Google Account
      </div>
    </div>

    <div class="row-start-1 text-center" v-if="user != null">
      <div class="flex justify-center">
        <img
          class="h-[150px] w-[150px] mt-2 rounded-full border-4 border-primary-900"
          :src="user.image_url"
        />
      </div>
      <div class="text-[28px] text-shade-black font-bold">
        Hello, {{ user.firstname }} {{ user.lastname }}
      </div>
      <div class="text-[20px] text-shade-black">{{ user.email }}</div>
    </div>
  </div>
  <footer
    v-if="user != null"
    class="min-w-full pt-8 text-error-600 text-[20px] font-bold hover:cursor-pointer text-right"
  >
    <span class="mr-6" @click="unbindGoogleAccount">
      Disconnect this account</span
    >
  </footer>
</template>
<script>
import GoogleServices from "@/services/authentication/GoogleServices.js";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
export default {
  data() {
    return {
      isBind: this.$gAuth.isAuthorized,
      user: null,
    };
  },
  created() {
    GoogleServices.getGoogleData().then((response) => {
      this.user = response.data;
    });
  },
  methods: {
    async bindGoogleAccount() {
      const googleUser = await this.$gAuth.getAuthCode();
      if (!googleUser) {
        return null;
      }
      GoogleServices.bindGoogleAccount(googleUser).then(() => {
        this.$router.go();
      });
    },
    unbindGoogleAccount() {
      showAlert(
        "confirm",
        "Do you want to disconnect?",
        "You can reconnect the Google Account to the LearnToEarn system anytime!!!",
        "Confirm"
      ).then((response) => {
        if (response.isConfirmed) {
          showAlert(
            "success",
            "Disconnect the Google Account successfully!!!",
            "",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              this.$gAuth.signOut();
              GoogleServices.unbindGoogleAccount();
              this.$router.go();
            }
          });
        }
      });
    },
  },
};
</script>
