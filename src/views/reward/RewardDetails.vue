<template>
  <div class="px-[128px] py-[64px]" v-if="reward">
    <div class="flex flex-wrap">
      <div>
        <expandable-image
          v-if="reward.image"
          :src="reward.image"
          class="w-[300px] h-[300px]"
        />
        <expandable-image
          v-else
          :src="require('@/assets/reward.png')"
          class="w-[300px] h-[300px]"
        />
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
        text="Redeem"
        class="w-full"
        v-if="role[0] == 'student'"
        :disabled="token < reward.price || Number(reward.amount) <= 0"
        :click="redeem"
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
        class="
          w-full
          text-shade-white
          bg-error-700
          hover:bg-error-800
          active:bg-error-900
        "
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
      token: 0,
      tokenHistoryId: null,
    };
  },
  methods: {
    deleteReward() {
      showAlert(
        "confirm",
        "Do you want to delete this reward?",
        "",
        "Confirm"
      ).then((response) => {
        if (response.isConfirmed) {
          RewardServices.deleteRewardByID(this.$route.params.id).then(() => {
            showAlert(
              "success",
              "Delete this reward successfully",
              "",
              "Confirm",
              false
            )
              .then((response) => {
                if (response.isConfirmed) {
                  this.$router.go(-1);
                }
              })
              .catch(() => {
                showAlert(
                  "error",
                  "Cannot delete this reward",
                  "Found the unexpected problem please try again later",
                  "Confirm",
                  false
                );
              });
          });
        }
      });
    },
    redeem() {
      showAlert(
        "confirm",
        "Redeem Confirmation",
        `Do you want to redeem '${this.reward.name}' for ${this.reward.price} token?`,
        "Redeem"
      ).then((response) => {
        if (response.isConfirmed) {
          RewardServices.redeem(this.reward).then(() => {
            this.tokenHistoryId = this.$store.getters.getTokenHistoryId;
            showAlert("success", "Redeem Success!!", "", "Confirm", false).then(
              (response) => {
                if (response.isConfirmed) {
                  this.$router.push({
                    name: "redeemSuccess",
                    params: {
                      tokenHistory_id: this.tokenHistoryId,
                      reward_id: this.reward._id,
                    },
                  });
                }
              }
            );
          });
        }
      });
    },
  },
  async created() {
    this.role = await this.$store.getters.getRole;
    this.token = await this.$store.getters.getCurrentToken;
    RewardServices.getRewardByID(this.$route.params.id).then(() => {
      this.reward = this.$store.getters.getReward;
    });
  },
};
</script>
