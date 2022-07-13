import apiClient from "@/services/axios/AxiosClient.js";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  async login(code) {
    let userObject = null;
    await apiClient.post("/login/" + code).then(async (responseToken) => {
      await apiClient
        .get("/credentials/" + responseToken.data.access_token)
        .then((responseData) => {
          try {
            userObject = {
              id: responseData.data.student_id,
              email: responseData.data.cmuitaccount,
              firstname: responseData.data.firstname_EN,
              lastname: responseData.data.lastname_EN,
              role: "student",
            };
          } catch (error) {
            userObject = {
              id: "teacher_id",
              email: responseData.data.Email,
              firstname: responseData.data.NameEng,
              lastname: responseData.data.MiddleNameEng,
              role: "teacher",
            };
          }
        });
    });
    await apiClient
      .get("/getUser/" + userObject.id)
      .then(async (responseUser) => {
        if (responseUser.data.length == 0) {
          await Swal.fire({
            title: "Terms and conditions",
            input: "checkbox",
            showCancelButton: true,
            inputValue: 1,
            inputPlaceholder:
              "I agree with the <a href='http://localhost:3000/terms_and_conditions' target='_blank'><u>terms and conditions</u></a>",
            confirmButtonText: "Accept",
            inputValidator: (result) => {
              return !result && "You need to agree with T&C";
            },
          }).then(async (response) => {
            if (response.isConfirmed) {
              await apiClient.post("/addUser", userObject);
              responseUser = await apiClient.get("/getUser/" + userObject.id);
              localStorage.setItem(
                "user",
                JSON.stringify(responseUser.data[0])
              );
            } else {
              router.push({ name: "beforeLogin" });
            }
          });
        } else {
          localStorage.setItem("user", JSON.stringify(responseUser.data[0]));
        }
      });
    setTimeout(() => {
      window.location.href = "http://localhost:3000/";
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
    router.go();
  },
};
