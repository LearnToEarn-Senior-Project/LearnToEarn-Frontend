<template>
  <div class="py-4 grid gap-y-[32px]" v-if="rewards">
    <div class="px-8 flex items-center justify-between">
      <span class="font-bold text-[44px]">Reward management</span>
      <div class="flex gap-x-[32px] items-center">
        <div
          @click="() => this.$router.push({ name: 'addToken' })"
          class="font-bold hover:cursor-pointer"
        >
          + Add Token
        </div>
        <SubmitButton
          text="Add new Reward"
          class="bg-success-700 hover:bg-success-800 active:bg-success-900"
          :click="() => this.$router.push({ name: 'addReward' })"
        />
        <SubmitButton
          text="Bill Approval"
          :click="() => this.$router.push({ name: 'billApproval' })"
        />
      </div>
    </div>
    <table>
      <thead class="text-[28px]">
        <tr>
          <th class="py-4 w-1/6">No</th>
          <th class="w-1/6">Name</th>
          <th class="w-1/6">Price</th>
          <th class="w-1/6">Amount</th>
          <th class="w-1/6">Image</th>
        </tr>
      </thead>
      <tbody class="text-center" v-if="rewards.length > 0">
        <tr v-for="(reward, index) in rewards" :key="index">
          <td class="text-[28px] font-bold py-2">{{ index + 1 }}</td>
          <td>{{ reward.name }}</td>
          <td>{{ reward.price }}</td>
          <td>{{ reward.amount }}</td>
          <td class="flex justify-center">
            <expandable-image
              class="h-10 w-10 object-cover border-2 border-neutral-300 rounded-lg"
              v-if="reward.image"
              :src="reward.image"
            />
            <expandable-image
              class="h-10 w-10 object-cover border-2 border-neutral-300 rounded-lg"
              v-else
              :src="require('@/assets/reward.png')"
            />
          </td>
          <td>
            <SubmitButton
              text="detail"
              :click="
                () =>
                  this.$router.push({
                    name: 'rewardDetails',
                    params: { id: reward._id },
                  })
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
    <Pagination :page="page" :totalPage="totalPage" routes="adminConsole" />
  </div>
</template>
<script>
import SubmitButton from "@/components/button/children/SubmitButton";
import Pagination from "@/components/pagination/BasePagination.vue";
import RewardServices from "@/services/RewardServices.js";
export default {
  components: {
    SubmitButton,
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
