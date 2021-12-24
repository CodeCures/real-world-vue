import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "events",
    component: EventList,
  },
  {
    path: "/events/:id",
    name: "show-event",
    props: true,
    component: () =>
      import(/* webpackChunkName: "show-event" */ "../views/EventShow.vue"),
  },
  {
    path: "/event-create",
    name: "event-create",
    component: () =>
      import(/* webpackChunkName: "create-event" */ "../views/CreateEvent.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
