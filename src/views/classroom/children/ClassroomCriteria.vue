<template>
  <div class="p-8" v-if="classroom">
    <div class="flex items-center justify-between">
      <span class="font-bold text-[48px] truncate"
        >"{{ classroom.name }}" Token Criteria</span
      >
    </div>
    <Form
      @submit="AddCriteria"
      class="grid gap-y-4 mt-8"
      :validation-schema="schema"
    >
      <div class="flex items-center">
        <BaseInput
          type="checkbox"
          value="FirstChecked"
          name="first"
          class="h-8 w-8 mx-4"
        />
        <div class="text-[20px]">Submit work on time</div>
      </div>
      <div class="flex items-center">
        <div class="mx-4 h-8 w-8">
          <span @click="() => checkSecond()" class="h-8 w-8">
            <BaseInput
              type="checkbox"
              value="SecondChecked"
              name="second"
              class="h-8 w-8"
            />
          </span>
        </div>

        <div>
          <span class="text-[20px]">
            Submit work on time continuously
            <BaseInput
              type="Number"
              name="count"
              class="w-16 h-8"
              v-if="CheckedSecond"
            />
            <span v-if="CheckedSecond"> times</span>
          </span>
          <div v-if="CheckedSecond">
            <ErrorMessage name="count" class="text-error-900 text-[12px]" />
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <BaseInput
          type="checkbox"
          value="ThirdChecked"
          name="third"
          class="h-8 w-8 mx-4"
        />
        <div class="text-[20px]">
          <div>Checking Attendance</div>
          <div>(Assignment name must contain the "Attendance" word)</div>
        </div>
      </div>
      <div class="flex gap-4 mt-4 w-full">
        <SubmitButton text="Save" class="w-full" />
        <CancelButton class="w-full" :click="() => this.$router.go(-1)" />
      </div>
    </Form>
  </div>
</template>
<script>
import * as yup from "yup";
import { Form, ErrorMessage } from "vee-validate";
import BaseInput from "@/components/input/BaseInput.vue";
import ClassroomServices from "@/services/ClassroomServices";
import CancelButton from "@/components/button/children/CancelButton.vue";
import SubmitButton from "@/components/button/children/SubmitButton.vue";
import ClassroomCriteriaItem from "@/views/classroom/children/ClassroomCriteriaItem";
export default {
  components: {
    Form,
    BaseInput,
    ErrorMessage,
    SubmitButton,
    CancelButton,
  },
  data() {
    const schema = yup.object().shape({
      second: yup.string(),
      count: yup.number().when("second", {
        is: (second) => second == "SecondChecked",
        then: yup
          .number()
          .required("Work counting is required!!")
          .test("", "Work counting must more than 0", (value) => value >= 0),
      }),
    });
    return {
      schema,
      CheckedSecond: false,
      classroom: null,
      ClassroomCriteriaItem,
    };
  },
  created() {
    ClassroomServices.getClassroomById(this.$route.params.id).then(() => {
      this.classroom = this.$store.getters.getClassroom;
    });
  },
  methods: {
    AddCriteria(Criteria) {
      console.log(Criteria);
    },
    checkSecond() {
      if (this.CheckedSecond == false) {
        this.CheckedSecond = true;
      } else {
        this.CheckedSecond = false;
      }
    },
  },
};
</script>
