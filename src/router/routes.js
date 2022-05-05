import CONSTANT_ROUTES from "@/constants/routes";
const routes = [
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
];
export default routes;
