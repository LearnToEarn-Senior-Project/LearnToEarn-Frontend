import router from "@/router";
import apiClient from "@/services/axios/AxiosClient.js";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";

apiClient.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          showAlert(
            "error",
            "400 Bad Request",
            "Your request resulted in an error",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              router.go();
            }
          });
        case 401:
          showAlert(
            "error",
            "401 Unauthorized",
            "Sorry your request could not be processed.",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              router.go();
            }
          });
        case 403:
          showAlert(
            "error",
            "403 Forbidden",
            "You don't have permission to access on this server.",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              router.go();
            }
          });
        case 405:
          showAlert(
            "error",
            "405 Method Not Allowed",
            "The method is not allowed for the URL.",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              router.go();
            }
          });
        case 500:
          showAlert(
            "error",
            "500 Internal Server Error",
            "The server encountered an internal error or misconfiguration and was unable to complete your request.",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              router.go();
            }
          });
        case 502:
          showAlert(
            "error",
            "502 Bad Gateway",
            "The server encountered a temporary error and could not complete your request.",
            "Confirm",
            false
          ).then((response) => {
            if (response.isConfirmed) {
              router.go();
            }
          });
      }
      return Promise.reject(error.response);
    } else {
      showAlert(
        "error",
        "Unexpected problem",
        "Found unexpected problem, please try again later.",
        "Confirm",
        false
      ).then((response) => {
        if (response.isConfirmed) {
          router.go();
        }
      });
    }
  }
);

