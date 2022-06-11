<template>
  <div class="about p-8">
    {{ msLogin }}
    {{ user }}
    <h1>This is an about page</h1>
    <SubmitButton :click="goToAddRewardPage" class="mr-4" text="Add Reward" />
    <SubmitButton :click="getClassroom" text="Test Get Classroom" />
    <AssignmentCard />
  </div>
</template>
<script>
import StudentCard from "@/components/card/StudentCard";
import AssignmentCard from "@/components/card/AssignmentCard";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
export default {
  components: {
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
