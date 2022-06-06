<template>
  <div class="about p-8">
    {{ msLogin }}
    {{ user }}
    <h1>This is an about page</h1>
    <SubmitButton :click="goToAddRewardPage" class="mr-4" text="Add Reward" />
    <SubmitButton :click="getClassroom" text="Test Get Classroom" />
    <div class="mt-4">
      <BaseInput name="name" placeholder="Text Box" type="text" />
      <BaseInput name="textarea" placeholder="Text Area" type="textarea" />
    </div>
    <ClassroomCard />
    <!-- <div class="flex gap-4 mb-4"><RewardCard /> </div> -->
    <StudentCard class="mb-4" />
    <AssignmentCard />
  </div>
</template>
<script>
import ClassroomServices from "@/services/ClassroomServices.js";
import SubmitButton from "@/components/button/children/SubmitButton";
import BaseInput from "@/components/input/BaseInput";
import RewardCard from "@/components/card/RewardCard";
import ClassroomCard from "@/components/card/ClassroomCard";
import StudentCard from "@/components/card/StudentCard";
import AssignmentCard from "@/components/card/AssignmentCard";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
export default {
  components: {
    SubmitButton,
    BaseInput,
    RewardCard,
    ClassroomCard,
    StudentCard,
    AssignmentCard,
  },
  data() {
    return {
      user: this.$msal.data.accessToken,
      msLogin: this.$msal.isAuthenticated(),
    };
  },
  methods: {
    addReward() {
      showAlert(
        "confirm",
        "Do you want to add...",
        "text text",
        "Confirm"
      ).then((response) => {
        if (response.isConfirmed) {
          showAlert("success", "Add... Successfully", "", "Confirm", false);
          RewardServices.addReward();
        }
      });
    },
    getClassroom() {
      ClassroomServices.getAllClassroom();
    },
    goToAddRewardPage() {
      this.$router.push({ name: "addReward" });
    },
  },
 /*  async created() {
    console.log(this.$msal.data);
    if (this.$msal.isAuthenticated) {
      this.user = await this.$msal.data.graph.profile;
    }
  }, */
};
</script>
