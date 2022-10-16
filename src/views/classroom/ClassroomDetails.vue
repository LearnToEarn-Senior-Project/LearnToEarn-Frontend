<template>
  <div class="p-8" v-if="classroom">
    <div class="flex items-center justify-between">
      <span class="font-bold text-[48px] truncate">{{ classroom.name }}</span>
      <div
        class="flex gap-x-4"
        v-if="role.includes('teacher') && role[0] == 'teacher'"
      >
        <!-- <BaseButton
          text="Token Criteria Statistic"
          class="
            text-primary-900
            bg-secondary-500
            hover:bg-secondary-500 hover:text-shade-white
            active:bg-secondary-300 active:text-shade-white
          "
          :click="
            () =>
              $router.push({
                name: 'classroomCriteriaStatictic',
                params: { id: classroom._id },
              })
          "
        /> -->
        <BaseButton
          text="Send token to the student in classroom"
          class="
            text-primary-900
            bg-secondary-500
            hover:bg-secondary-500 hover:text-shade-white
            active:bg-secondary-300 active:text-shade-white
          "
          :click="
            () => {
              sendTokenToStudent();
            }
          "
        />
        <BaseButton
          text="Token Criteria"
          class="
            text-primary-500
            bg-primary-100
            hover:bg-primary-300 hover:text-shade-white
            active:bg-primary-500 active:text-shade-white
          "
          :click="
            () =>
              $router.push({
                name: 'classroomCriteria',
                params: { id: classroom._id },
              })
          "
        />
      </div>
    </div>

    <div v-if="role.includes('student') && role[0] == 'student'">
      Total Score: {{ currentOverallScore() }} / 100
    </div>

    <div class="text-[32px] text-center font-bold mb-4">Assignment</div>
    <AssignmentCard
      v-for="assignment in classroom.assignment_list"
      :key="assignment"
      :assignment="assignment"
      :role="role"
      class="mb-4"
    />
  </div>
</template>
<script>
import ClassroomServices from "@/services/ClassroomServices";
import AssignmentCard from "@/components/card/AssignmentCard.vue";
import GoogleServices from "@/services/authentication/GoogleServices";
import BaseButton from "@/components/button/BaseButton.vue";
import TokenServices from "@/services/TokenServices";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
export default {
  components: { AssignmentCard, BaseButton },
  data() {
    return {
      classroom: null,
      submission: null,
      role: null,
      text: null,
    };
  },
  methods: {
    currentOverallScore() {
      try {
        let tempScore = 0;
        let tempTotalScore = 0;
        for (
          let index = 0;
          index < this.classroom.assignment_list.length;
          index++
        ) {
          if (this.classroom.assignment_list[index].max_point == null) {
            continue;
          }
          tempScore =
            tempScore +
            this.classroom.assignment_list[index].student_submission[0].score;
          tempTotalScore =
            tempTotalScore + this.classroom.assignment_list[index].max_point;
        }
        return Math.round((100 * tempScore) / tempTotalScore);
      } catch (error) {
        return "-";
      }
    },
    sendTokenToStudent() {
      TokenServices.sendToken(this.classroom._id).then((response) => {
        console.log(response.data);
        if (response.data == "Send the token to the student successfully") {
          showAlert(
            "success",
            "Send token to the student successfully",
            "",
            "Confirm",
            false
          ).then((res) => {
            if (res.isConfirmed) {
              this.$router.go();
            }
          });
        }
      });
    },
  },
  async created() {
    let text = null;
    if (!this.classroom) {
      text = this.$loading.show({
        isFullPage: false,
        canCancel: false,
        lockScroll: true,
        color: "#00017a",
      });
    }
    await ClassroomServices.getClassroomWithAssignment(
      this.$route.params.id
    ).then(async () => {
      text.hide();
      this.role = await this.$store.getters.getRole;
      this.classroom = this.$store.getters.getClassroomWithAssignment;
      GoogleServices.getGoogleData().then(async (response) => {
        for (
          let i = 0;
          i <
          this.$store.getters.getClassroomWithAssignment.assignment_list.length;
          i++
        ) {
          for (
            let j = 0;
            j <
            this.$store.getters.getClassroomWithAssignment.assignment_list[i]
              .student_submission.length;
            j++
          ) {
            if (
              response.data._id ==
              this.$store.getters.getClassroomWithAssignment.assignment_list[i]
                .student_submission[j].user_id
            ) {
              this.submission =
                this.$store.getters.getClassroomWithAssignment.student_submission;
              break;
            }
          }
        }
      });
    });
  },
};
</script>
