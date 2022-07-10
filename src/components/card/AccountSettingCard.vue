<template>
  <div
    class="border-[1px] border-neutral-400 px-8 py-2 flex items-center justify-between rounded-[10px] mb-8"
  >
    <div class="flex items-center justify-between">
      <img
        v-if="auth"
        :src="img"
        class="w-[72px] h-[72px] rounded-full border-[1px] border-neutral-400 mr-8"
      />
      <img
        v-else
        :src="require(`@/assets/icons/logo/${img}`)"
        class="w-[72px] h-[72px] rounded-full border-[1px] border-neutral-400 mr-8"
      />
      <div class="grid items-center" v-if="auth">
        <div class="text-[32px] font-bold">{{ name }}</div>
        <div class="text-[16px]">
          {{ description }}
        </div>
      </div>
      <div class="grid items-center" v-else>
        <div class="text-[32px] font-bold">{{ name }} Account</div>
        <div class="text-[16px]">
          Bind the {{ name }} Account to get the {{ description }} Data
        </div>
      </div>
    </div>
    <SubmitButton v-if="!auth" text="Bind" :click="bind" />
    <CancelButton v-else text="Unbind" :click="unbind" />
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
    auth: {
      type: Boolean,
    },
  },
};
</script>
