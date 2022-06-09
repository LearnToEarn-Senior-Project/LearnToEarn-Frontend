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
  async uploadImage(file) {
    let formData = new FormData();
    formData.append("file", file);
    return apiClient.post("/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async getRewardsWithPagination(page) {
    const getAllRewards = await apiClient.get("/rewards/page=" + page);
    store.dispatch("setRewards", getAllRewards.data);
  },
  async getRewardByID(id) {
    const getRewardByID = await apiClient.get("/reward/" + id);
    store.dispatch("setReward", getRewardByID.data[0]);
  },
  async updateRewardByID(id, name, detail, amount, price, image) {
    return apiClient.patch("/updateReward/" + id, {
      name: name,
      detail: detail,
      amount: amount,
      price: price,
      image: image,
    });
  },
  async deleteRewardByID(id) {
    await apiClient.delete("/deleteReward/" + id);
  },
};
