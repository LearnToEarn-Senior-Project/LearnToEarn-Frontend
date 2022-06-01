<template>
  <div class="px-[128px] py-[64px]" v-if="reward">
    <div class="flex">
      <div>
        <img src="@/assets/case.png" class="min-w-[300px] h-[300px]" />
        <div class="flex justify-center items-center gap-2 mt-4">
          <Coin /> <span class="text-[36px] font-bold">{{ reward.price }}</span>
        </div>
      </div>
      <div class="w-full ml-8">
        <div class="font-bold text-[48px] text-center mb-[32px]">
          {{ reward.name }}
        </div>
        <div class="font-bold text-[24px]">Detail</div>
        <div class="ml-10">{{ reward.detail }}</div>
        <div class="text-[24px]">
          <span class="font-bold"> Amount:</span> {{ reward.amount }} left
        </div>
      </div>
    </div>
    <div class="flex mt-4 w-full gap-4">
      <SubmitButton text="Purchase" class="w-full" v-if="!isAdmin" />
      <SubmitButton text="Edit" class="w-full" v-if="isAdmin" />
      <SubmitButton
        text="delete"
        class="w-full bg-error-700 hover:bg-error-800 active:bg-error-900"
        :click="deleteReward"
        v-if="isAdmin"
      />
    </div>
  </div>
</template>
<script>
import RewardServices from "@/services/RewardServices.js";
import SubmitButton from "@/components/button/children/SubmitButton.vue";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
import Coin from "@/assets/icons/coin/coin_lg.svg?inline";
export default {
  components: {
    Coin,
    SubmitButton,
  },
  data() {
    return {
      isAdmin: true,
      reward: null,
    };
  },
  methods: {
    deleteReward() {
      showAlert(
        "confirm",
        "Do you want to delete this reward",
        "",
        "Confirm"
      ).then((response) => {
        if (response.isConfirmed) {
          showAlert(
            "success",
            "Delete this reward successfully",
            "",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              this.$router.go(-1);
            }
          });
        }
        RewardServices.deleteRewardByID(this.$route.params.id);
      });
    },
  },
  async created() {
    RewardServices.getRewardByID(this.$route.params.id).then(() => {
      this.reward = this.$store.getters.getReward;
    });
  },
};
</script>
