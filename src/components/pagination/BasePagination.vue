<template>
  <footer
    class="min-w-full flex items-center gap-[30px] justify-center pt-8 text-[14px] hover:cursor-pointer text-right"
  >
    <DoubleLeft /><Left />1/2<Right class="fill-shade-black" /><DoubleRight />
  </footer>
</template>

<script>
import Right from "@/assets/icons/chevron-right-black.svg?inline";
import Left from "@/assets/icons/chevron-left.svg?inline";
import DoubleRight from "@/assets/icons/chevron-double-right.svg?inline";
import DoubleLeft from "@/assets/icons/chevron-double-left.svg?inline";
export default {
  components: {
    Right,
    Left,
    DoubleRight,
    DoubleLeft,
  },
};
</script>
