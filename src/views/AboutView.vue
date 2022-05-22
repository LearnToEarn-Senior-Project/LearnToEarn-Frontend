<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SubmitButton :click="addReward" />
    <Form :validation-schema="schema" class="mt-4">
      <BaseInput name="name" placeholder="Text Box" type="text" />
      <BaseInput name="textarea" placeholder="Text Area" type="textarea" />
    </Form>
  </div>
</template>
<script>
import RewardServices from "@/services/RewardServices.js";
import SubmitButton from "@/components/button/children/SubmitButton";
import BaseInput from "@/components/input/BaseInput";
export default {
  components: {
    SubmitButton,
    BaseInput,
  },
  methods: {
    addReward() {
      RewardServices.addReward();
    },
  },
};
</script>
