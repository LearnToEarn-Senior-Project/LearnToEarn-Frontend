import apiClient from "@/services/axios/AxiosClient.js";
import store from "@/store";

export default {
  addReward(name, detail, amount, price, image) {
    return apiClient.post("/addReward", {
      name: name,
      detail: detail,
      amount: amount,
      price: price,
      image: image,
    });
  },
  async getRewards() {
    const getAllRewards = await apiClient.get("/rewards");
    store.dispatch("setRewards", getAllRewards.data);
  },
  async getRewardByID(id) {
    const getRewardByID = await apiClient.get("/reward/" + id);
    store.dispatch("setReward", getRewardByID.data[0]);
  },
  async deleteRewardByID(id) {
    await apiClient.delete("/deleteReward/" + id);
  },
};
