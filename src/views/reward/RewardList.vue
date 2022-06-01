<template>
  <div class="p-[32px]">
    <div class="font-bold text-[48px] text-center mb-[32px]">Reward Shop</div>
    <div class="gap-[24px] md:px-[32px] flex flex-wrap items-center">
      <RewardCard v-for="reward in rewards" :key="reward.id" :reward="reward" />
    </div>
  </div>
</template>
<script>
import RewardCard from "@/components/card/RewardCard.vue";
import RewardServices from "@/services/RewardServices.js";
export default {
  components: {
    RewardCard,
  },
  data() {
    return {
      rewards: null,
    };
  },
  created() {
    RewardServices.getRewards().then(() => {
      this.rewards = this.$store.getters.getRewards;
    });
  },
};
</script>
