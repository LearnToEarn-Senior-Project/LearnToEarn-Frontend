<template>
  <div class="py-8 px-28" v-if="rewards">
    <div class="font-bold text-[48px] text-center mb-8">Reward Shop</div>
    <div class="gap-[32px] flex flex-wrap items-center">
      <RewardCard v-for="reward in rewards" :key="reward.id" :reward="reward" />
    </div>
    <Pagination :page="page" :totalPage="totalPage" routes="rewardList" />
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
      totalPage: 0,
    };
  },
  async created() {
    await RewardServices.getRewardsWithPagination(this.page).then(() => {
      this.totalRewards = this.$store.getters.getRewards.total_rewards;
      this.totalPage = Math.ceil(this.totalRewards / 10);
      this.rewards = this.$store.getters.getRewards.reward_list;
    });
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    RewardServices.getRewardsWithPagination(
      parseInt(routeTo.query.page) || 1
    ).then((response) => {
      next((computed) => {
        computed.rewards = response;
      });
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
