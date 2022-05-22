import apiClient from "@/services/axios/AxiosClient.js";

export default {
  addReward() {
    return apiClient.post("/addReward", {
      reward_name: "hi",
      detail: "Test add",
      amount: 20,
      price: 2,
      image: "hi",
    });
  },
};
