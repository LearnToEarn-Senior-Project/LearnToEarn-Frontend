<template>
  <div class="py-8 px-28">
    <div class="font-bold text-[48px] text-center mb-8">Classroom List</div>
    <div class="gap-[32px] flex flex-wrap items-center">
      <div
        v-if="totalClassrooms == 0"
        class="w-full h-full text-center text-error-700 text-[24px]"
      >
        Please wait for classroom data loading...
      </div>
      <ClassroomCard
        v-for="classroom in classrooms"
        :key="classroom.id"
        :classroom="classroom"
      />
    </div>
    <Pagination
      :page="page"
      :totalPage="totalPage"
      routes="classroomList"
      v-if="totalClassrooms > 0"
    />
  </div>
</template>
<script>
import ClassroomCard from "@/components/card/ClassroomCard.vue";
import Pagination from "@/components/pagination/BasePagination.vue";
import ClassroomServices from "@/services/ClassroomServices.js";
export default {
  components: {
    ClassroomCard,
    Pagination,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      classrooms: null,
      totalClassrooms: 0,
      totalPage: 1,
    };
  },
  async created() {
    await ClassroomServices.getAllClassroom(this.page).then(() => {
      this.totalClassrooms = this.$store.getters.getClassrooms.total_classrooms;
      if (this.totalClassrooms > 0) {
        this.totalPage = Math.ceil(this.totalClassrooms / 4);
      }
      this.classrooms = this.$store.getters.getClassrooms.classroom_list;
    });
  },
  beforeRouteUpdate(routeTo) {
    ClassroomServices.getAllClassroom(parseInt(routeTo.query.page) || 1).then(
      () => {
        this.classrooms = this.$store.getters.getClassrooms.classroom_list;
      }
    );
  },
};
</script>
