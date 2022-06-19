import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import store from "@/store";
import AuthServices from "@/services/authentication/AuthServices";
import TokenServices from "@/services/TokenServices";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  to.matched.some((record) => {
    record.meta.requiresAuth;
    record.meta.studentOnly;
    record.meta.teacherOnly;
    record.meta.adminOnly;
    record.meta.adminAndStudent;
    record.meta.adminAndTeacher;
  });
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("user") == null) {
      next({ name: "beforeLogin" });
    } else {
      store.dispatch("setRole", AuthServices.getRole());
      store.dispatch("setCurrentToken", TokenServices.getStudentToken());
      let role = await store.getters.getRole;
      if (to.matched.some((record) => record.meta.adminOnly)) {
        if (role.includes("admin") && role[0] == "admin") {
          next();
        } else {
          next({ name: "accountSetting" });
        }
      } else if (to.matched.some((record) => record.meta.studentOnly)) {
        if (role.includes("student") && role[0] == "student") {
          next();
        } else {
          next({ name: "accountSetting" });
        }
      } else if (to.matched.some((record) => record.meta.teacherOnly)) {
        if (role.includes("teacher") && role[0] == "teacher") {
          next();
        } else {
          next({ name: "accountSetting" });
        }
      } else if (to.matched.some((record) => record.meta.adminAndStudent)) {
        if (role.includes("admin") && role.includes("student")) {
          next();
        } else {
          next({ name: "accountSetting" });
        }
      } else if (to.matched.some((record) => record.meta.adminAndTeacher)) {
        if (role.includes("admin") && role.includes("teacher")) {
          next();
        } else {
          next({ name: "accountSetting" });
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
export default router;
