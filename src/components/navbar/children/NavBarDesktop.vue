<template>
  <div class="flex items-center justify-between">
    <div class="flex gap-x-16">
      <router-link
        :to="{ name: 'beforeLogin' }"
        class="text-secondary-500 font-bold text-2xl hidden md:block"
        ><img src="@/assets/icons/logo/LTELogo.png" class="h-8" />
      </router-link>
      <div class="flex items-center gap-x-10" v-if="isCurrentStudent">
        <router-link
          v-for="item in NavBarItems"
          :key="item.id"
          :to="{ name: item.pageName }"
          class="
            text-shade-white text-sm
            font-bold
            hidden
            md:block
            rounded-[20px]
            px-2
            py-1
            hover:bg-secondary-100 hover:text-primary-900
          "
          exact-active-class="bg-secondary-100 text-primary-900"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
    <div class="hidden md:block">
      <div class="flex items-center gap-x-6">
        <div
          class="flex items-center gap-x-2.5 text-shade-white font-bold text-sm"
          v-if="isCurrentStudent"
        >
          <Coin />
          {{ token.toFixed(2) }}
        </div>
        <div class="ml-4 md:block flex items-center relative">
          <button
            class="
              max-w-xs
              text-sm
              flex
              items-center
              bg-secondary-500
              rounded-3xl
              px-1
              py-2.5
              h-9
              text-shade-white
              focus:outline-none focus:shadow-solid
            "
            id="user-menu"
            aria-label="User menu"
            aria-haspopup="true"
          >
            <div class="px-2.5 text-primary-900 font-bold text-sm">
              {{ user.firstname }} {{ user.lastname }}
            </div>
            <DropdownIcon />
          </button>
          <div
            id="user-menu-dropdown"
            class="
              origin-top-right
              absolute
              right-0
              mt-2
              w-48
              rounded-md
              z-40
              py-1
              rounded-md
              text-center
              bg-shade-white
              shadow-xs
              border-2 border-neutral-400
            "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <router-link
              v-if="isNotAdmin"
              :to="{ name: 'accountSetting' }"
              class="w-full justify-center text-sm font-bold text-shade-black"
            >
              <div class="hover:bg-neutral-100 py-2">Account Setting</div>
            </router-link>
            <router-link
              v-if="user.role.includes('admin')"
              :to="
                isNotAdmin
                  ? { name: 'adminConsole' }
                  : isStudent
                  ? { name: 'rewardList' }
                  : isTeacher
                  ? { name: 'rewardList' }
                  : null
              "
              class="w-full justify-center text-sm font-bold text-shade-black"
            >
              <div class="hover:bg-neutral-100 py-2" @click="swap">
                <span v-if="isNotAdmin">Go to Admin Console</span>
                <span v-if="isStudent">Go to student site</span>
                <span v-if="isTeacher">Go to teacher site</span>
              </div>
            </router-link>
            <button
              class="
                w-full
                justify-center
                py-2
                text-sm
                font-bold
                text-shade-black
                hover:bg-neutral-100
              "
              @click="logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBarItem from "@/components/navbar/children/items/NavBarItemDesktop";
import NavBarProps from "@/components/navbar/children/items/NavBarProps";
import DropdownIcon from "@/assets/icons/chevron-down.svg?inline";
import Coin from "@/assets/icons/coin/coin_md.svg?inline";
export default {
  components: {
    DropdownIcon,
    Coin,
  },
  data() {
    return {
      NavBarItems: NavBarItem,
      isNotAdmin: this.user.role[0] != "admin",
      isStudent: this.user.role[1] == "student",
      isTeacher: this.user.role[1] == "teacher",
      isCurrentStudent:
        this.user.role.includes("student") && this.user.role[0] == "student",
    };
  },
  props: NavBarProps,
};
</script>
