import AuthServices from "@/services/authentication/AuthServices.js";
import router from ".";
import { showAlert } from "@/hooks/sweet-alert/sweet-alert";
export default [
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
    path: "/terms_and_conditions",
    name: "termAndConditions",
    component: () => import("../views/TermsAndConditions.vue"),
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
    path: "/reward_shop",
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
  {
    path: "/token_history",
    name: "tokenHistory",
    component: () =>
      import("../views/user/students/TokenTransactionHistory.vue"),
    meta: {
      requiresAuth: true,
      studentOnly: true,
    },
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    }),
  },
  {
    path: "/success/wql:transaction_id+w:reward_id",
    name: "purchaseSuccess",
    component: () => import("../views/user/students/PurchaseSuccess.vue"),
    meta: {
      requiresAuth: true,
      studentOnly: true,
    },
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
    path: "/admin_console",
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
    path: "/add_reward",
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
    path: "/add_token",
    name: "addToken",
    component: () => import("../views/user/admin/TokenManagement.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
  },
];
