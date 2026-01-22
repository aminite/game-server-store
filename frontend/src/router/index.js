import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import StoreView from "../views/Store.vue";
import ProfileView from "../views/Profile.vue";
import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/store", name: "Store", component: StoreView },
  { path: "/profile", name: "Profile", component: ProfileView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;