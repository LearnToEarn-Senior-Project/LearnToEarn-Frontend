<template>
  <div class="flex p-8 justify-center">
    <div class="w-1/2">
      <div class="font-bold text-[44px] mb-4 text-center">Add Token</div>
      <div class="font-bold text-[20px] mb-4">
        Current Token in the pool:
        <span class="text-primary-500">{{ allToken.toFixed(4) }}</span>
      </div>
      <Form @submit="addToken" :validation-schema="schema">
        <div class="flex flex-col">
          <div class="text-[14px] font-medium">Token amount</div>
          <BaseInput
            name="token"
            placeholder="Token amount"
            type="number"
            regex="0"
          />
          <ErrorMessage name="token" class="text-error-900 text-[12px]" />
        </div>
        <div class="flex gap-4 mt-6 w-full">
          <SubmitButton text="Add" class="w-1/2" />
          <CancelButton
            class="w-1/2"
            :click="() => this.$router.push({ name: 'adminConsole' })"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/input/BaseInput.vue";
import SubmitButton from "@/components/button/children/SubmitButton.vue";
import CancelButton from "@/components/button/children/CancelButton.vue";
import TokenServices from "@/services/TokenServices.js";
import * as yup from "yup";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
import { Form, ErrorMessage } from "vee-validate";
export default {
  components: { Form, ErrorMessage, BaseInput, SubmitButton, CancelButton },
  data() {
    const schema = yup.object().shape({
      token: yup
        .string()
        .required("Token amount is required!")
        .test(
          "",
          "Token amount must be zero or possitive number",
          (value) => value >= 0
        ),
    });
    return {
      schema,
      allToken: 0,
    };
  },
  methods: {
    addToken(data) {
      showAlert(
        "confirm",
        "Do you want to add the token to the pool?",
        "",
        "Confirm"
      ).then((response) => {
        if (response.isConfirmed) {
          showAlert(
            "success",
            "Add token to the pool successfully",
            "",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              this.$router.go(-1);
            }
          });
          TokenServices.addToken(data.token);
        }
      });
    },
  },
  async created() {
    this.allToken = await TokenServices.getAllToken();
  },
};
</script>
