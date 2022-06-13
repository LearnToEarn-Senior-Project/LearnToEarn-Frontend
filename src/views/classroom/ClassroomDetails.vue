<template>
  <div class="p-8" v-if="classroom">
    <div class="flex items-center justify-between">
      <span class="font-bold text-[48px]">{{ classroom.name }}</span>
      <div class="flex gap-x-4">
        <BaseButton
          v-if="role.includes('teacher') && role[0] == 'teacher'"
          text="Token Criteria"
          class="text-primary-500 bg-primary-100 hover:bg-primary-300 hover:text-shade-white active:bg-primary-500 active:text-shade-white"
        />
        <SubmitButton text="Classroom Rank" />
      </div>
    </div>
    <div>
      <div>Total Score: 1/2</div>
      <div>Your Rank: 1</div>
    </div>
    <div class="text-[32px] text-center font-bold mb-4">Assignment</div>
    <AssignmentCard
      v-for="assignment in classroom.assignment_list"
      :key="assignment"
      :assignment="assignment"
      class="mb-4"
    />
    <!-- {{ classroom.assignment_list }} -->
    <!--  {{ submission }} -->
  </div>
</template>
<script>
import ClassroomServices from "@/services/ClassroomServices";
import SubmitButton from "@/components/button/children/SubmitButton.vue";
import AssignmentCard from "@/components/card/AssignmentCard.vue";
import GoogleServices from "@/services/authentication/GoogleServices";
import BaseButton from "@/components/button/BaseButton.vue";
export default {
  components: { SubmitButton, AssignmentCard, BaseButton },
  data() {
    return {
      classroom: null,
      submission: null,
      role: null,
    };
  },
  created() {
    ClassroomServices.getClassroomById(this.$route.params.id).then(async () => {
      this.role = await this.$store.getters.getRole;
      this.classroom = this.$store.getters.getClassroom;
      GoogleServices.getGoogleData().then((response) => {
        for (
          let i = 0;
          i < this.$store.getters.getClassroom.assignment_list.length;
          i++
        ) {
          for (
            let j = 0;
            j <
            this.$store.getters.getClassroom.assignment_list[i]
              .student_submission.length;
            j++
          ) {
            if (
              response.data._id ==
              this.$store.getters.getClassroom.assignment_list[i]
                .student_submission[j].user_id
            ) {
              this.submission =
                this.$store.getters.getClassroom.student_submission;
              break;
            }
          }
        }
      });
    });
  },
};
</script>
