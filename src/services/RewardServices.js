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
    await apiClient.get("/rewards/page=" + page).then((response) => {
      store.dispatch("setRewards", response.data);
    });
  },
  async getRewardByID(id) {
    await apiClient.get("/reward/" + id).then((response) => {
      store.dispatch("setReward", response.data[0]);
    });
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
