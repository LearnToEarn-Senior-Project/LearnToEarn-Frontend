<template>
  <span class="justify-center flex font-bold text-[48px] my-8">
    Account Setting
  </span>
  <div class="mx-12">
    <div v-for="(items, index) in user" :key="items">
      <AccountSettingCard
        v-if="items != null"
        class="w-full"
        :name="items.firstname + ' ' + items.lastname"
        :img="items.image_url"
        :isAuth="true"
        :unbind="unbind[index]"
        :description="items.email"
      />
    </div>
    <div v-for="(items, index) in AccountSettingItem" :key="items.name">
      <AccountSettingCard
        v-if="user[index] == null"
        class="w-full"
        :name="items.name"
        :img="items.img"
        :isAuth="false"
        :bind="bind[index]"
        :description="items.description"
      />
    </div>
  </div>
</template>
<script>
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
import GoogleServices from "@/services/authentication/GoogleServices.js";
import AccountSettingItem from "@/views/account/items/AccountSettingItems";
import AccountSettingCard from "@/components/card/AccountSettingCard.vue";
export default {
  components: { AccountSettingCard },
  data() {
    return {
      AccountSettingItem,
      bind: [this.bindGoogleAccount, null],
      unbind: [this.unbindGoogleAccount, null],
      user: [null, null],
    };
  },
  created() {
    GoogleServices.getGoogleData().then((response) => {
      this.user[0] = response.data;
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
