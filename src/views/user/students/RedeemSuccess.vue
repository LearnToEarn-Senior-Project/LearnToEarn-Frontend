<template>
  <div class="py-8">
    <div class="font-bold text-[48px] text-center">Reward Redeem Evidence</div>
  </div>
  <div class="mx-auto w-1/3">
    <expandable-image
      :src="image"
      class="border-2 mb-8"
      :close-on-background-click="true"
    />
    <SubmitButton text="Save as image" :click="saveImage" class="w-full mb-8" />
  </div>
</template>
<script>
import TokenServices from "@/services/TokenServices";
import SubmitButton from "@/components/button/children/SubmitButton.vue";

export default {
  components: { SubmitButton },
  data() {
    return {
      image: null,
      tokenHistory_id: null,
    };
  },
  methods: {
    saveImage() {
      var a = document.createElement("a");
      a.href = this.image;
      a.download = this.tokenHistory_id + ".png";
      a.click();
    },
  },
  async created() {
    this.tokenHistory_id = this.$route.params.tokenHistory_id;
    if (Array.isArray(this.tokenHistory_id)) {
      this.tokenHistory_id = this.tokenHistory_id[0];
    }

    await TokenServices.getStudentStatementImage(
      this.tokenHistory_id,
      this.$route.params.reward_id
    ).then(() => {
      this.image =
        "data:image/png;base64," + this.$store.getters.getTokenHistory;
    });
  },
};
</script>
