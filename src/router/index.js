import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import Nprogress from "nprogress";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "events",
    props: true,
    component: EventList,
  },
  {
    path: "/events/:id",
    name: "show-event",
    props: true,
    beforeEnter: (to, from, next) => {
      store
        .dispatch("fetchEvent", to.params.id)
        .then((event) => {
          to.params.event = event;
          next();
        })
        .catch((error) => {
          error.response && error.response.status == 404
            ? next({ name: "404", params: { resource: "Event" } })
            : next({ name: "network-issue"});
        });
    },
    component: () =>
      import(/* webpackChunkName: "show-event" */ "../views/EventShow.vue"),
  },
  {
    path: "/event-create",
    name: "event-create",
    component: () =>
      import(/* webpackChunkName: "create-event" */ "../views/CreateEvent.vue"),
  },
  {
    path: "/404",
    name: "404",
    props: true,
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/NotFound.vue"),
  },
  {
    path: "/network-issue",
    name: "network-issue",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "network-issue" */ "../views/NetworkIssue.vue"
      ),
  },
  {
    path: "*",
    redirect: "404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
