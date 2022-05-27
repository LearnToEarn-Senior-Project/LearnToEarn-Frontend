<template>
  <div class="about p-8">
    <h1>This is an about page</h1>
    <SubmitButton :click="addReward" />
    <Form :validation-schema="schema" class="mt-4">
      <BaseInput name="name" placeholder="Text Box" type="text" />
      <BaseInput name="textarea" placeholder="Text Area" type="textarea" />
    </Form>
    <div class="flex gap-4 mb-4"><RewardCard /> <ClassroomCard /></div>
    <StudentCard class="mb-4" />
    <AssignmentCard />
  </div>
</template>
<script>
import RewardServices from "@/services/RewardServices.js";
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
  },
};
</script>
