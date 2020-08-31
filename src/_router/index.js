import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../modules/Dashboard.vue";
import Masuk from "../modules/Masuk.vue";
Vue.use(VueRouter);
const routes = [
  { path: "/", component: Dashboard },
  { path: "/masuk", component: Masuk },
  // Di arahkan ke dashboard
  { path: "*", redirect: "/" }
];
const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  // Diarahkan ke halaman masuk jika tidak login dan mencoba mengakses halaman yang tidak diperbolehkan
  const publicPages = ["/masuk"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (authRequired && !loggedIn) {
    return next("/masuk");
  }
  next();
});
export default router;
