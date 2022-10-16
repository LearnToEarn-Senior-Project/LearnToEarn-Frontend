import apiClient from "@/services/axios/AxiosClient.js";
import store from "@/store";
import CryptoJS from "crypto-js";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
import router from "@/router";

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
    await apiClient.get(`/reward/${id}`).then((response) => {
      if (response.data.length == 0) {
        showAlert(
          "error",
          "Reward not found",
          "This reward is not found, please try again later.",
          "Confirm",
          false
        ).then((response) => {
          if (response.isConfirmed) {
            router.go(-1);
          }
        });
      } else {
        store.dispatch("setReward", response.data[0]);
      }
    });
  },
  async updateRewardByID(id, name, detail, amount, price, image) {
    return apiClient.patch(`/updateReward/${id}`, {
      name: name,
      detail: detail,
      amount: amount,
      price: price,
      image: image,
    });
  },
  async deleteRewardByID(id) {
    await apiClient.delete(`/deleteReward/${id}`);
  },
  async redeem(reward) {
    await apiClient
      .patch(
        `/redeem/${CryptoJS.AES.decrypt(
          localStorage.getItem("user"),
          "uwvuvvwevwewvwe onyetenyevwe"
        ).toString(CryptoJS.enc.Utf8)}`,
        reward
      )
      .then((response) => {
        if (response.data == "Cannot redeem this reward" || response.data == "Reward not found" || response.data == "Student not found") {
          showAlert(
            "error",
            "Cannot redeem this reward not found",
            "Found unexpected problem, please try again later.",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              router.go(-1);
            }
          });
        } else {
          store.dispatch("setTokenHistoryId", response.data._id);
        }
      });

  },
};
