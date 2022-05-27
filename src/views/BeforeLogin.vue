<template>
  <div
    class="bg-cover min-h-screen grid grid-rows-6 py-auto grid-flow-col items-center justify-center bg-primary-900 px-8"
  >
    <div class="md:text-5xl sm:text-2xl font-bold text-shade-white row-start-3">
      Welcome To <span class="text-secondary-500 font-bold">LearnToEarn</span>
    </div>

    <BaseButton
      :click="goToCMULogin"
      :text="'Sign in with CMU Account'"
      class="bg-primary-100 text-primary-500 hover:bg-primary-200 active:bg-primary-300"
    />
  </div>
</template>

<script>
import BaseButton from "@/components/button/BaseButton";
import AuthServices from "@/services/AuthServices.js";
export default {
  name: "HomeView",
  components: {
    BaseButton,
  },
  methods: {
    goToCMULogin() {
      window.location.href =
        "https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code&client_id=DfQ7tTs1Qua9Jktfz5UupXN3uvZHsD1HUtYq617r&redirect_uri=http:/localhost:3000/redirect&scope=cmuitaccount.basicinfo&state=xyz";
    },
  },
};
</script>
