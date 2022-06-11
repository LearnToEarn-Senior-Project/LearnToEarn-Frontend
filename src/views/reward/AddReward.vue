<template>
  <div class="px-[128px] py-[16px]">
    <div class="font-bold text-[48px] text-center mb-[16px]">Add Reward</div>
    <Form @submit="addReward" :validation-schema="schema">
      <div class="flex">
        <div class="w-full space-y-4">
          <div
            v-for="item in AddRewardItems"
            :key="item.name"
            class="flex flex-col"
          >
            <div class="text-[14px] font-medium">{{ item.placeholder }}</div>
            <BaseInput
              :name="item.name"
              :placeholder="item.placeholder"
              :type="item.type"
            />
            <ErrorMessage
              :name="item.name"
              class="text-error-900 text-[12px]"
            />
          </div>
        </div>

        <div class="ml-6 w-full">
          <UploadImages
            :max="1"
            maxError="Can add only one image"
            uploadMsg="Upload Image"
            @changed="handleImages"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <div class="text-[14px] font-medium mt-4">Reward Details</div>
        <BaseInput
          name="details"
          placeholder="Reward Details"
          type="textarea"
        />
        <ErrorMessage name="details" class="text-error-900 text-[12px]" />
      </div>
      <div class="flex gap-4 mt-4 w-full">
        <SubmitButton text="Add" class="w-full" />
        <CancelButton class="w-full" :click="() => this.$router.go(-1)" />
      </div>
    </Form>
  </div>
</template>
<script>
import AddRewardItems from "@/views/reward/AddRewardItem.js";
import BaseInput from "@/components/input/BaseInput.vue";
import SubmitButton from "@/components/button/children/SubmitButton.vue";
import CancelButton from "@/components/button/children/CancelButton.vue";
import RewardServices from "@/services/RewardServices.js";
import UploadImages from "vue-upload-drop-images";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
import { Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  components: {
    BaseInput,
    SubmitButton,
    CancelButton,
    Form,
    ErrorMessage,
    UploadImages,
  },
  data() {
    const schema = yup.object().shape({
      name: yup.string().required("Reward name is required!"),
      price: yup.string().required("Reward price is required!"),
      amount: yup.string().required("Reward amount is required!"),
      details: yup.string().required("Reward details is required!"),
    });
    return {
      schema,
      AddRewardItems,
      img: [],
    };
  },
  methods: {
    handleImages(event) {
      this.img = event;
    },
    addReward(data) {
      showAlert(
        "confirm",
        "Do you want to add new reward",
        "You can edit in next time",
        "Confirm"
      ).then((response) => {
        if (response.isConfirmed) {
          showAlert(
            "success",
            "Add new reward successfully",
            "",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              Promise.all(
                this.img.map((file) => {
                  return RewardServices.uploadImage(file);
                })
              )
                .then((response) => {
                  RewardServices.addReward(
                    data.name,
                    data.details,
                    data.amount,
                    data.price,
                    JSON.parse(JSON.stringify(response.map((r) => r.data)))[0]
                  );
                })
                .then(() => {
                  this.$router.go(-1);
                });
            }
          });
        }
      });
    },
  },
};
</script>
