<template>
  <div
    class="
      border-[1px] border-neutral-400
      px-8
      py-2
      flex
      items-center
      justify-between
      rounded-[10px]
      mb-4
    "
  >
    <div class="flex items-center justify-between">
      <img
        referrerpolicy="no-referrer"
        :src="isAuth ? img : require(`@/assets/icons/logo/${img}`)"
        class="
          w-[72px]
          h-[72px]
          rounded-full
          border-[1px] border-neutral-400
          mr-8
        "
      />
      <div class="grid items-center">
        <div class="text-[32px] font-bold">
          {{ name }} <span v-if="!isAuth"> Account</span>
        </div>
        <div class="text-[16px]">
          <span v-if="!isAuth"> Bind the {{ name }} Account to get the</span>
          {{ description }}
          <span v-if="!isAuth"> Data</span>
        </div>
      </div>
    </div>
    <component
      :is="isAuth ? 'CancelButton' : 'SubmitButton'"
      :text="isAuth ? 'Unbind' : 'Bind'"
      :click="isAuth ? unbind : bind"
    />
  </div>
</template>
<script>
import SubmitButton from "../button/children/SubmitButton.vue";
import CancelButton from "../button/children/CancelButton.vue";
export default {
  components: { SubmitButton, CancelButton },
  props: {
    name: {
      type: String,
    },
    img: {
      type: String,
    },
    description: {
      type: String,
    },
    bind: {
      type: Function,
    },
    unbind: {
      type: Function,
    },
    isAuth: {
      type: Boolean,
    },
  },
};
</script>
