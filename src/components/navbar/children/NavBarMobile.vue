<template>
  <div class="flex items-center justify-between">
    <div @click="menuOpen = false">
      <router-link
        :to="{ name: 'home' }"
        class="text-secondary-500 font-bold text-2xl md:hidden"
        >LearnToEarn
      </router-link>
    </div>
    <div @click="menuOpen = !menuOpen" class="hover:cursor-pointer md:hidden">
      <MenuIcon />
    </div>
  </div>
  <div
    v-if="menuOpen == true"
    class="min-h-screen bg-primary-900 md:hidden mt-10"
  >
    <div
      class="text-secondary-500 font-bold text-md flex items-center justify-center border-shade-white"
    >
      {{ user.firstname }} {{ user.lastname }}
    </div>
    <div
      class="flex items-center gap-x-2.5 text-shade-white font-bold justify-center text-sm border-b pb-2"
    >
      Current Token
      <img src="@/assets/icons/coin/coin_md.png" />
      <!-- Var -->
      10
    </div>
    <div @click="menuOpen = false">
      <router-link
        v-for="item in NavBarItems"
        :key="item.id"
        :to="{ name: item.pageName }"
        class="text-shade-white text-sm font-bold flex items-center justify-center rounded-[20px] px-2 py-1 hover:bg-secondary-100 hover:text-primary-900 mt-2"
      >
        {{ item.title }}
      </router-link>
      <div
        class="text-shade-white text-sm font-bold flex items-center justify-center rounded-[20px] px-2 py-1 hover:bg-secondary-100 hover:text-primary-900 hover:cursor-pointer"
        @click="logout"
      >
        Logout
      </div>
    </div>
  </div>
</template>
<script>
import NavBarItem from "@/components/navbar/children/items/NavBarItemMobile";
import CoinLG from "@/assets/icons/coin/coin_md.svg?inline";
import MenuIcon from "@/assets/icons/menu.svg?inline";
export default {
  components: {
    MenuIcon,
    CoinLG,
  },
  data() {
    return {
      menuOpen: false,
      NavBarItems: NavBarItem,
      user: null,
    };
  },
  props: {
    logout: {
      type: Function,
      required: true,
    },
  },
  async created() {
    this.user = {
      firstname: this.$store.getters.getCurrentUser.firstname,
      lastname: this.$store.getters.getCurrentUser.lastname,
    };
  },
};
</script>
