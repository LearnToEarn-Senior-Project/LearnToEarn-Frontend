<template>
  <div
    class="w-[195px] h-[206px] rounded-[10px] card-shadow bg-neutral-500 hover:cursor-pointer"
  >
    <div
      class="bg-[url('@/assets/case.png')] w-[195px] h-[175px] pt-[7px] pr-[6px] flex justify-end"
    >
      <div
        class="h-[25px] bg-secondary-300 border-[2px] rounded-[20px] border-secondary-600 px-[7px] py-[1px]"
      >
        <div class="flex items-center">
          <Coin class="mr-[4px]" />
          <span class="text-neutral-900 text-[14px] font-bold">20</span>
        </div>
      </div>
    </div>
    <div class="text-shade-white text-center font-bold text-[14px] pt-1">
      CAMT Pencil Case
    </div>
  </div>
</template>
<script>
import Coin from "@/assets/icons/coin/coin_sm.svg?inline";
export default {
  components: {
    Coin,
  },
};
</script>
