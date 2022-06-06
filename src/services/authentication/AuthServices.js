import apiClient from "@/services/axios/AxiosClient.js";
import msal from "vue-msal";

export default {
  async login(code) {
    const responseGetToken = await apiClient.post("/login", { code: code });
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
        id: responseGetData.data.OrganizationID1,
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
    /* localStorage.setItem(
      "token",
      JSON.stringify({
        access_token: responseGetToken.data.access_token,
        refresh_token: responseGetToken.data.refresh_token,
      })
    ); */
    localStorage.setItem("user", JSON.stringify(responseGetUserByID.data[0]));
    setTimeout(() => {
      location.replace("http://localhost:3000/auth");
    }, 100);
  },
  msLogin(id_token) {},
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    location.replace("http://localhost:3000/");
  },
};
