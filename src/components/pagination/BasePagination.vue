<template>
  <footer
    class="min-w-full flex items-center gap-[30px] justify-center pt-8 text-[16px] font-bold text-right"
  >
    <div class="flex gap-[30px]" v-if="page != 1">
      <router-link :to="{ name: routes, query: { page: 1 } }">
        <DoubleLeft class="hover:cursor-pointer" />
      </router-link>
      <router-link :to="{ name: routes, query: { page: page - 1 } }">
        <Left class="hover:cursor-pointer" />
      </router-link>
    </div>
    {{ page }} / {{ totalPage }}
    <div class="flex gap-[30px]" v-if="page < totalPage">
      <router-link :to="{ name: routes, query: { page: page + 1 } }">
        <Right class="fill-shade-black hover:cursor-pointer" />
      </router-link>
      <router-link :to="{ name: routes, query: { page: totalPage } }">
        <DoubleRight class="hover:cursor-pointer" />
      </router-link>
    </div>
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
  props: {
    totalPage: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    routes: {
      type: String,
      required: true,
    },
  },
};
</script>
