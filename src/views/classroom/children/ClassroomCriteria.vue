<template>
  <div class="p-8" v-if="classroom && criteria">
    <div class="flex items-center justify-between">
      <span class="font-bold text-[48px] truncate">
        "{{ classroom.name }}" Token Criteria
      </span>
    </div>
    <Form @submit="AddCriteria" class="grid gap-y-4 mt-8">
      <div class="flex items-center">
        <input
          type="checkbox"
          name="first"
          class="h-8 w-8 mx-4"
          v-model="criteria.first"
        />
        <div class="text-[20px]">Submit work on time</div>
      </div>
      <div class="flex items-center">
        <div class="mx-4 h-8 w-8">
          <span @click="() => checkSecond()" class="h-8 w-8">
            <input
              type="checkbox"
              name="second"
              value="true"
              class="h-8 w-8"
              v-model="criteria.second.value"
            />
          </span>
        </div>
        <div>
          <span class="text-[20px]">
            Submit work on time continuously
            <span v-if="CheckedSecond">
              <input
                type="Number"
                name="count"
                class="w-16 h-8 text-sm w-full border-[3px] border-neutral-500 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500 focus:text-primary-500 focus:ring-2 focus:ring-primary-400 focus:text-primary-400 focus:border-[3px] focus:placeholder:text-primary-400 active:outline-primary-400 active:border-primary-400 active:outline-2 active:text-primary-400 active:border-[3px] disabled:bg-neutral-100 disabled:text-500 active:placeholder:text-primary-400"
                v-model="criteria.second.count"
                min="1"
              />
              <span> times</span>
            </span>
          </span>
        </div>
      </div>
      <div class="flex items-center">
        <input
          type="checkbox"
          name="third"
          class="h-8 w-8 mx-4"
          v-model="criteria.third"
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
import { Form } from "vee-validate";
import BaseInput from "@/components/input/BaseInput.vue";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
import ClassroomServices from "@/services/ClassroomServices";
import CancelButton from "@/components/button/children/CancelButton.vue";
import SubmitButton from "@/components/button/children/SubmitButton.vue";
export default {
  components: {
    Form,
    BaseInput,
    SubmitButton,
    CancelButton,
  },
  data() {
    return {
      CheckedSecond: false,
      classroom: null,
      criteria: null,
    };
  },
  async created() {
    await ClassroomServices.getClassroomCriteria(this.$route.params.id).then(
      () => {
        this.criteria = JSON.parse(
          JSON.stringify(this.$store.getters.getCriteria)
        );
        if (this.criteria.second.value == true) {
          this.CheckedSecond = true;
        }
      }
    );
    await ClassroomServices.getClassroom(this.$route.params.id).then(() => {
      this.classroom = this.$store.getters.getClassroom;
    });
  },
  methods: {
    AddCriteria() {
      let criteriaObject = {
        first: this.criteria.first,
        second: {
          value: this.criteria.second.value,
          count: parseInt(this.criteria.second.count),
        },
        third: this.criteria.third,
      };
      if (criteriaObject.second.value == false) {
        criteriaObject.second.count = null;
      }
      if (
        criteriaObject.second.value == true &&
        (criteriaObject.second.count <= 0 || this.criteria.second.count == null)
      ) {
        showAlert(
          "error",
          "The second criteria field must contain positive number!!",
          "",
          "Confirm",
          false
        );
      } else {
        showAlert(
          "confirm",
          "Do you want setup the criteria for this classroom?",
          "",
          "Yes"
        ).then((response) => {
          if (response.isConfirmed) {
            ClassroomServices.setClassroomCriteria(
              this.$route.params.id,
              criteriaObject
            ).then(() => {
              showAlert(
                "success",
                "Setup criteria successfully!!",
                "",
                "Confirm",
                false
              ).then((response2) => {
                if (response2.isConfirmed) {
                  this.$router.push({
                    name: "classroomDetail",
                    params: { id: this.$route.params.id },
                  });
                }
              });
            });
          }
        });
      }
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
