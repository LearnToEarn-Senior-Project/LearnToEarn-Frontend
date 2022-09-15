<template>
  <div class="py-8" v-if="histories">
    <div class="font-bold text-[48px] text-center mb-8">Token History</div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="text-[24px]">
          <tr>
            <th class="py-4 w-1/6">No</th>
            <th class="w-1/6">Reward Name</th>
            <th class="w-1/6">Date</th>
            <th class="w-1/6">Amount of coins</th>
            <th class="w-1/6">Statement</th>
          </tr>
        </thead>
        <tbody class="text-center" v-if="histories.length > 0">
          <tr v-for="(history, index) in histories" :key="index" class="">
            <td class="text-[28px] font-bold py-2">
              {{ index + 1 }}
            </td>
            <td class="truncate">{{ rewards[index] }}</td>
            <td>{{ history.date }}</td>
            <td>
              <div class="flex items-center justify-center">
                <Coin class="mr-2" />
                <span
                  class="font-bold"
                  :class="[
                    history.amountOfCoin < 0 && 'text-error-700',
                    history.amountOfCoin > 0 && 'text-success-600',
                  ]"
                >
                  <span v-if="history.amountOfCoin > 0">+</span>
                  <span>{{ history.amountOfCoin }}</span>
                </span>
              </div>
            </td>
            <td>
              <SubmitButton
                text="See Details"
                class="w-1/2"
                :disabled="
                  !(history.reward_id != null && history.amountOfCoin < 0)
                "
                :click="
                  () => {
                    this.$router.push({
                      name: 'redeemSuccess',
                      params: {
                        tokenHistory_id: history._id,
                        reward_id: history.reward_id,
                      },
                    });
                  }
                "
              />
            </td>
          </tr>
        </tbody>
        <tbody class="text-center" v-else>
          <td colspan="6" class="text-error-600 font-bold text-[24px]">
            Data Not found
          </td>
        </tbody>
      </table>
    </div>
    <Pagination :page="page" :totalPage="totalPage" routes="tokenHistory" />
  </div>
</template>
<script>
import Pagination from "@/components/pagination/BasePagination.vue";
import TokenServices from "@/services/TokenServices";
import RewardServices from "@/services/RewardServices";
import Coin from "@/assets/icons/coin/coin_md.svg?inline";
import SubmitButton from "@/components/button/children/SubmitButton.vue";
export default {
  components: {
    Pagination,
    Coin,
    SubmitButton,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      histories: null,
      rewards: [],
      totalHistory: 0,
      totalPage: 1,
    };
  },
  created() {
    TokenServices.getAllTokenHistory(this.page, true).then(() => {
      this.totalHistory = this.$store.getters.getTokenHistories.total_histories;
      if (this.totalHistory > 0) {
        this.totalPage = Math.ceil(this.totalHistory / 10);
      }
      this.histories = this.$store.getters.getTokenHistories.token_history_list;
      for (let index = 0; index < this.histories.length; index++) {
        RewardServices.getRewardByID(this.histories[index].reward_id).then(
          () => {
            this.rewards[index] = this.$store.getters.getReward.name;
          }
        );
      }
    });
  },
  beforeRouteUpdate(routeTo) {
    TokenServices.getAllTokenHistory(
      parseInt(routeTo.query.page) || 1,
      true
    ).then(() => {
      this.histories = this.$store.getters.getTokenHistories.token_history_list;
      for (let index = 0; index < this.histories.length; index++) {
        RewardServices.getRewardByID(this.histories[index].reward_id).then(
          () => {
            this.rewards[index] = this.$store.getters.getReward.name;
          }
        );
      }
    });
  },
};
</script>
