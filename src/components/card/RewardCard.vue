<template>
  <div
    class="w-[195px] h-[206px] rounded-[10px] card-shadow hover:cursor-pointer"
    :class="[
      enoughOrNot == true && 'bg-neutral-500 text-shade-white',
      enoughOrNot == false && 'bg-secondary-500 text-neutral-900',
    ]"
  >
    <router-link :to="{ name: 'rewardDetails', params: { id: reward._id } }">
      <div class="w-[195px] h-[175px] flex justify-end rounded-t-[10px]">
        <img
          v-if="reward.image"
          :src="reward.image"
          class="object-cover w-full rounded-t-[10px] bg-secondary-100"
        />
        <img
          v-else
          src="@/assets/reward.png"
          class="object-cover w-full rounded-t-[10px] bg-secondary-100"
        />
        <div
          class="h-[25px] bg-secondary-300 border-[2px] rounded-[20px] border-secondary-600 px-[7px] py-[1px] mt-[7px] mr-[6px] absolute"
        >
          <div class="flex items-center">
            <Coin class="mr-[4px]" />
            <span class="text-neutral-900 text-[14px] font-bold">{{
              reward.price
            }}</span>
          </div>
        </div>
      </div>
      <div class="text-center font-bold text-[14px] pt-1 truncate px-2">
        {{ reward.name }}
      </div>
    </router-link>
  </div>
</template>
<script>
import Coin from "@/assets/icons/coin/coin_sm.svg?inline";
export default {
  components: {
    Coin,
  },
  props: {
    reward: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      token: 0,
    };
  },
  computed: {
    enoughOrNot() {
      if (this.token < this.reward.price) {
        return true;
      } else {
        return false;
      }
    },
  },
  async created() {
    this.token = await this.$store.getters.getCurrentToken;
  },
};
</script>
