<template>
  <div class="px-[128px] py-[16px]" v-if="reward">
    <div class="font-bold text-[48px] text-center mb-[16px]">Update Reward</div>
    <Form @submit="updateReward" :validation-schema="schema">
      <div class="flex">
        <div class="w-full space-y-4">
          <div class="flex flex-col">
            <div class="text-[14px] font-medium">Reward Name</div>
            <BaseInput
              name="name"
              placeholder="Reward Name"
              type="text"
              v-model="reward.name"
            />
            <ErrorMessage name="name" class="text-error-900 text-[12px]" />

            <div class="text-[14px] font-medium">Reward Price</div>
            <BaseInput
              name="price"
              placeholder="Reward Price"
              type="number"
              v-model="reward.price"
            />
            <ErrorMessage name="price" class="text-error-900 text-[12px]" />

            <div class="text-[14px] font-medium">Reward Amount</div>
            <BaseInput
              name="amount"
              placeholder="Reward Amount"
              type="number"
              v-model="reward.amount"
            />
            <ErrorMessage name="amount" class="text-error-900 text-[12px]" />
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
      <div class="flex">
        <div class="w-1/2">
          <div class="text-[14px] font-medium mt-4">Reward Details</div>
          <BaseInput
            name="details"
            placeholder="Reward Details"
            type="textarea"
            v-model="reward.detail"
          />
          <ErrorMessage name="details" class="text-error-900 text-[12px]" />
        </div>
        <div class="w-1/2 ml-6">
          <div class="text-[14px] font-medium mt-4">Current Image</div>
          <img v-if="reward.image" :src="reward.image" class="h-40" />
          <img v-else src="@/assets/reward.png" class="h-40" />
        </div>
      </div>
      <div class="flex gap-4 mt-4 w-full">
        <SubmitButton text="Update" class="w-1/2" />
        <CancelButton class="w-1/2" :click="() => this.$router.go(-1)" />
      </div>
    </Form>
  </div>
</template>
<script>
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
      price: yup
        .string()
        .required("Reward price is required!")
        .test(
          "",
          "Token amount must be zero or possitive number",
          (value) => value >= 0
        ),
      amount: yup
        .string()
        .required("Reward amount is required!")
        .test(
          "",
          "Token amount must be zero or possitive number",
          (value) => value >= 0
        ),
      details: yup.string().required("Reward details is required!"),
    });
    return {
      schema,
      reward: null,
      img: [],
    };
  },
  methods: {
    handleImages(event) {
      this.img = event;
    },
    updateReward(data) {
      showAlert(
        "confirm",
        "Do you want to update this reward?",
        "You can edit in next time",
        "Confirm"
      ).then((response) => {
        if (response.isConfirmed) {
          showAlert(
            "success",
            "Update reward successfully",
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
                  RewardServices.updateRewardByID(
                    this.$route.params.id,
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
  async created() {
    await RewardServices.getRewardByID(this.$route.params.id);
    this.reward = this.$store.getters.getReward;
  },
};
</script>
