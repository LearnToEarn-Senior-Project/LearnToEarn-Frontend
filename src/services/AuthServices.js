import apiClient from "@/services/axios/AxiosClient.js";

export default {
  async login(code) {
    const responseGetToken = await apiClient.post("/login", { code: code });
    const responseGetData = await apiClient.get(
      "/credentials/" + responseGetToken.data.access_token
    );
    const userObject = {
      id: responseGetData.data.student_id,
      email: responseGetData.data.cmuitaccount,
      firstname: responseGetData.data.firstname_EN,
      lastname: responseGetData.data.lastname_EN,
      role: responseGetData.data.itaccounttype_id,
    };
    let responseGetUserByID = await apiClient.get(
      "/getUser/" + responseGetData.data.student_id
    );
    if (responseGetUserByID.data.length == 0) {
      await apiClient.post("/addUser", userObject);
      console.log("Add user success");
      responseGetUserByID = await apiClient.get(
        "/getUser/" + responseGetData.data.student_id
      );
    }
    localStorage.setItem("token", responseGetToken.data.access_token);
    localStorage.setItem("user", JSON.stringify(responseGetUserByID.data[0]));
    setTimeout(() => {
      location.replace("http://localhost:3000/about");
    }, 500);
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    location.replace("http://localhost:3000/");
  },
  bindGoogleAccount(access_token, firstname, lastname, email, image_url) {
    return apiClient.post("/google_login", {
      id: JSON.parse(localStorage.getItem("user"))._id,
      access_token: access_token,
      firstname: firstname,
      lastname: lastname,
      email: email,
      image_url: image_url,
    });
  },
  unbindGoogleAccount() {
    return apiClient.post("/google_logout", {
      id: JSON.parse(localStorage.getItem("user"))._id,
    });
  },
  getGoogleData() {
    return apiClient.get(
      "/googleGetData/" + JSON.parse(localStorage.getItem("user"))._id
    );
  },
};
