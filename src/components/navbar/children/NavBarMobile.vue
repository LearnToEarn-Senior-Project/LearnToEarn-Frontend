<template>
  <div class="flex items-center justify-between">
    <div @click="menuOpen = false">
      <router-link
        :to="{ name: 'beforeLogin' }"
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
      {{ token.toFixed(2) }}
    </div>
    <div @click="menuOpen = false">
      <div v-if="user.role[0] != 'admin'">
        <router-link
          v-for="item in NavBarItems"
          :key="item.id"
          :to="{ name: item.pageName }"
          class="text-shade-white text-sm font-bold flex items-center justify-center rounded-[20px] px-2 py-1 hover:bg-secondary-100 hover:text-primary-900 mt-2"
        >
          {{ item.title }}
        </router-link>
      </div>
      <div v-if="user.role[0] != 'admin'">
        <router-link
          :to="{ name: 'accountSetting' }"
          class="text-shade-white text-sm font-bold flex items-center justify-center rounded-[20px] px-2 py-1 hover:bg-secondary-100 hover:text-primary-900 mt-2"
        >
          Account Setting
        </router-link>
      </div>

      <router-link
        v-if="user.role.includes('admin') && user.role[0] != 'admin'"
        :to="{ name: 'adminConsole' }"
        class="text-shade-white text-sm font-bold flex items-center justify-center rounded-[20px] px-2 py-1 hover:bg-secondary-100 hover:text-primary-900 mt-2"
      >
        <div @click="swap">Go to Admin Console</div>
      </router-link>
      <router-link
        v-if="user.role.includes('admin') && user.role[1] == 'student'"
        :to="{ name: 'rewardList' }"
        class="text-shade-white text-sm font-bold flex items-center justify-center rounded-[20px] px-2 py-1 hover:bg-secondary-100 hover:text-primary-900 mt-2"
      >
        <div @click="swap">Go to student site</div>
      </router-link>
      <router-link
        v-if="user.role.includes('admin') && user.role[1] == 'teacher'"
        :to="{ name: 'rewardList' }"
        class="text-shade-white text-sm font-bold flex items-center justify-center rounded-[20px] px-2 py-1 hover:bg-secondary-100 hover:text-primary-900 mt-2"
      >
        <div @click="swap">Go to teacher site</div>
      </router-link>
      <div
        class="text-shade-white text-sm font-bold flex items-center justify-center rounded-[20px] px-2 py-1 hover:bg-secondary-100 hover:text-primary-900 hover:cursor-pointer mt-2"
        @click="logout"
      >
        Logout
      </div>
    </div>
  </div>
</template>
<script>
import NavBarItem from "@/components/navbar/children/items/NavBarItemMobile";
import NavBarProps from "@/components/navbar/children/items/NavBarProps";
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
    };
  },
  props: NavBarProps,
};
</script>
