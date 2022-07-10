import AuthServices from "@/services/authentication/AuthServices.js";
import router from ".";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
const routes = [
  /*================== ALL ==================*/
  {
    path: "/",
    name: "beforeLogin",
    component: () => import("../views/BeforeLogin.vue"),
    beforeEnter: async () => {
      if (localStorage.getItem("user") != null) {
        let role = await AuthServices.getRole();
        if (role[0] == "admin") {
          router.push({ name: "adminConsole" });
        } else {
          router.push({ name: "classroomList" });
        }
      }
    },
  },
  {
    path: "/redirect",
    name: "OAuthRedirect",
    beforeEnter: (route) => {
      return AuthServices.login(route.query.code);
    },
  },
  {
    path: "/auth",
    name: "msOAuth",
    component: () => import("../views/MsLogin.vue"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: () => {
      AuthServices.MSLogin();
    },
  },
  {
    path: "/test_component",
    name: "testComponents",
    component: () => import("../views/AboutView.vue"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: () => {
      showAlert(
        "Maintain",
        "This feature is not available at now!!",
        "",
        "confirm",
        false
      ).then((response) => {
        if (response.isConfirmed) {
          router.go(-1);
        }
      });
    },
  },
  /*========== STUDENT AND TEACHER ==========*/
  {
    path: "/account_setting",
    name: "accountSetting",
    component: () => import("../views/account/AccountSetting.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/classrooms",
    name: "classroomList",
    component: () => import("../views/classroom/ClassroomList.vue"),
    meta: {
      requiresAuth: true,
    },
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    }),
  },
  {
    path: "/classroom/:id",
    name: "classroomDetail",
    component: () => import("../views/classroom/ClassroomDetails.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  /*=========== STUDENT AND ADMIN ===========*/
  {
    path: "/reward/:id/",
    name: "rewardDetails",
    component: () => import("../views/reward/RewardDetails.vue"),
    meta: {
      requiresAuth: true,
      adminAndStudent: true,
    },
  },

  /*================ STUDENT ================*/
  {
    path: "/rewardShop",
    name: "rewardList",
    component: () => import("../views/reward/RewardList.vue"),
    meta: {
      requiresAuth: true,
      studentOnly: true,
    },
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    }),
  },
  /*================ TEACHER ================*/
  {
    path: "/classroom/:id/criteria",
    name: "classroomCriteria",
    component: () =>
      import("../views/classroom/children/ClassroomCriteria.vue"),
    meta: {
      requiresAuth: true,
      teacherOnly: true,
    },
  },
  /*================= ADMIN =================*/
  {
    path: "/adminConsole",
    name: "adminConsole",
    component: () => import("../views/user/admin/AdminRewardList.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    }),
  },
  {
    path: "/addRewards",
    name: "addReward",
    component: () => import("../views/reward/AddReward.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
  },
  {
    path: "/reward/:id/edit",
    name: "rewardEdit",
    component: () => import("../views/reward/children/RewardEdit.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
  },
  {
    path: "/addToken",
    name: "addToken",
    component: () => import("../views/user/admin/TokenManagement.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
  },
];
export default routes;
