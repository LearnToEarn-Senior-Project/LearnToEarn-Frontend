<template>
  <div class="px-[128px] py-[64px]" v-if="reward">
    <div class="flex flex-wrap">
      <div>
        <img
          v-if="reward.image"
          :src="reward.image"
          class="min-w-[300px] h-[300px]"
        />
        <img v-else src="@/assets/reward.png" class="min-w-[300px] h-[300px]" />
        <div class="flex justify-center items-center gap-2 mt-4">
          <Coin />
          <span class="text-[24px] font-bold">{{
            Number(reward.price).toLocaleString()
          }}</span>
        </div>
      </div>
      <div class="w-1/2 ml-8">
        <div
          class="font-bold text-[48px] text-center mb-[32px] truncate"
          data-tooltip-target="tooltip-name"
        >
          {{ reward.name }}
        </div>
        <div class="mb-4">
          <div class="font-bold text-[20px]">Detail</div>
          <div class="ml-10 break-words">{{ reward.detail }}</div>
        </div>
        <div class="text-[20px] flex gap-2">
          <div class="font-bold">Amount:</div>
          <div class="text-primary-500">
            {{ Number(reward.amount).toLocaleString() }}
          </div>
          left
        </div>
      </div>
    </div>
    <div class="flex mt-4 w-full gap-4">
      <SubmitButton
        text="Purchase"
        class="w-full"
        v-if="role[0] == 'student'"
        :click="maintain"
      />
      <SubmitButton
        text="Edit"
        class="w-full"
        v-if="role.includes('admin') && role[0] == 'admin'"
        :click="
          () =>
            this.$router.push({
              name: 'rewardEdit',
            })
        "
      />
      <BaseButton
        text="delete"
        class="w-full text-shade-white bg-error-700 hover:bg-error-800 active:bg-error-900"
        :click="deleteReward"
        v-if="role.includes('admin') && role[0] == 'admin'"
      />
    </div>
  </div>
</template>
<script>
import RewardServices from "@/services/RewardServices.js";
import SubmitButton from "@/components/button/children/SubmitButton.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
import Coin from "@/assets/icons/coin/coin_md.svg?inline";
export default {
  components: {
    Coin,
    SubmitButton,
    BaseButton,
  },
  data() {
    return {
      role: null,
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
              RewardServices.deleteRewardByID(this.$route.params.id).then(
                () => {
                  this.$router.go(-1);
                }
              );
            }
          });
        }
      });
    },
    maintain() {
      showAlert(
        "Maintain",
        "This feature is not available at now!!",
        "",
        "confirm",
        false
      );
    },
  },
  async created() {
    this.role = await this.$store.getters.getRole;
    RewardServices.getRewardByID(this.$route.params.id).then(() => {
      this.reward = this.$store.getters.getReward;
    });
  },
};
</script>
