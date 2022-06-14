<template>
  <div class="py-8 px-28" v-if="rewards">
    <div class="font-bold text-[48px] text-center mb-8">Reward Shop</div>
    <div class="gap-[32px] flex flex-wrap items-center">
      <div
        v-if="totalRewards == 0"
        class="w-full h-full text-center text-error-700 text-[24px]"
      >
        The reward are not available at now, please come again later.
      </div>
      <RewardCard v-for="reward in rewards" :key="reward.id" :reward="reward" />
    </div>
    <Pagination
      :page="page"
      :totalPage="totalPage"
      routes="rewardList"
      v-if="totalRewards > 0"
    />
  </div>
</template>
<script>
import Pagination from "@/components/pagination/BasePagination.vue";
import RewardCard from "@/components/card/RewardCard.vue";
import RewardServices from "@/services/RewardServices.js";
export default {
  components: {
    RewardCard,
    Pagination,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      rewards: null,
      totalRewards: 0,
      totalPage: 1,
    };
  },
  async created() {
    await RewardServices.getRewardsWithPagination(this.page).then(() => {
      this.totalRewards = this.$store.getters.getRewards.total_rewards;
      if (this.totalRewards > 0) {
        this.totalPage = Math.ceil(this.totalRewards / 10);
      }
      this.rewards = this.$store.getters.getRewards.reward_list;
    });
  },
  beforeRouteUpdate(routeTo) {
    RewardServices.getRewardsWithPagination(
      parseInt(routeTo.query.page) || 1
    ).then(() => {
      this.rewards = this.$store.getters.getRewards.reward_list;
    });
  },
};
</script>
