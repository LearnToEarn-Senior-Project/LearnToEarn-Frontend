import CONSTANT_ROUTES from "@/constants/routes";
const routes = [
  /*================== ALL ==================*/
  {
    path: CONSTANT_ROUTES.HOME,
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: CONSTANT_ROUTES.ABOUT,
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  /*========== STUDENT AND TEACHER ==========*/
  {
    path: CONSTANT_ROUTES.CLASSROOM_LIST,
    name: "classroomList",
    component: () => import("../views/classroom/ClassroomList.vue"),
  },
  /*=========== STUDENT AND ADMIN ===========*/
  {
    path: CONSTANT_ROUTES.REWARD_LIST,
    name: "rewardList",
    component: () => import("../views/reward/RewardList.vue"),
  },
  /*================ STUDENT ================*/

  /*================ TEACHER ================*/

  /*================= ADMIN =================*/
];
export default routes;
