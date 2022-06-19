import apiClient from "@/services/axios/AxiosClient.js";
import router from "@/router";

export default {
  async login(code) {
    const responseGetToken = await apiClient.post("/login/" + code);
    const responseGetData = await apiClient.get(
      "/credentials/" + responseGetToken.data.access_token
    );
    let userObject = null;
    try {
      userObject = {
        id: responseGetData.data.student_id,
        email: responseGetData.data.cmuitaccount,
        firstname: responseGetData.data.firstname_EN,
        lastname: responseGetData.data.lastname_EN,
        role: "student",
      };
    } catch (error) {
      userObject = {
        id: "teacher_id",
        email: responseGetData.data.Email,
        firstname: responseGetData.data.NameEng,
        lastname: responseGetData.data.MiddleNameEng,
        role: "teacher",
      };
    }
    let responseGetUserByID = await apiClient.get("/getUser/" + userObject.id);
    if (responseGetUserByID.data.length == 0) {
      await apiClient.post("/addUser", userObject);
      console.log("Add user success");
      responseGetUserByID = await apiClient.get("/getUser/" + userObject.id);
    }
    localStorage.setItem("user", JSON.stringify(responseGetUserByID.data[0]));
    setTimeout(() => {
      window.location.href = "http://localhost:3000/";
    }, 100);
  },
  MSLogin() {
    setTimeout(() => {
      router.push({ name: "beforeLogin" });
    }, 100);
  },
  async getRole() {
    let role = await apiClient.get(
      "/getRole/" + JSON.parse(localStorage.getItem("user"))._id
    );
    return role.data;
  },
  async swapRole() {
    let role = await apiClient.get(
      "/swapRole/" + JSON.parse(localStorage.getItem("user"))._id
    );
    return role.data;
  },
  logout() {
    localStorage.removeItem("user");
    router.push({ name: "beforeLogin" });
  },
};
