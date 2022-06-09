<template>
  <div
    class="w-[359px] h-[171px] rounded-[20px] border-[2.5px] border-neutral-400 card-shadow bg-shade-white hover:cursor-pointer p-[10px]"
  >
    <div
      class="px-[15px] py-[10px] font-bold text-[28px] justify-between flex items-center"
    >
      <div class="truncate w-full mr-2">{{ classroom.name }}</div>
      <div class="flex items-center gap-[12px]">
        <Member /> <span>{{ classroom.total_member }}</span>
      </div>
    </div>
    <div
      class="px-[15px] py-[10px] text-[14px] flex items-center font-semibold"
    >
      <div>By: {{ classroom.teacher.name }}</div>
    </div>
    <div class="h-[20px]"></div>
    <div
      class="text-[14px] flex items-center font-semibold justify-end text-primary-500"
    >
      Go to the classroom <Right />
    </div>
  </div>
</template>
<script>
import Member from "@/assets/icons/member.svg?inline";
import Right from "@/assets/icons/chevron-right.svg?inline";
export default {
  components: {
    Member,
    Right,
  },
  props: {
    classroom: {
      type: Object,
      required: true,
    },
  },
};
</script>
