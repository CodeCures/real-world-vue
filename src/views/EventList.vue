<template>
  <div>
    <h1>Event Listing for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'events', query: { page: page - 1 } }"
        >Previous Page</router-link
      >
      |
    </template>
    <template v-if="hasNextPage">
      <router-link :to="{ name: 'events', query: { page: page + 1 } }"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store/index.js";

function getPageEvents(to, next) {
  const currentPage = to.query.page || 1;
  store
    .dispatch("fetchEvents", {
      page: currentPage,
    })
    .then(() => {
      to.params.page = currentPage;
      next();
    })
    .catch(error => {
        console.log(error);
    });
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next);
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next);
  },
  components: {
    EventCard,
  },
  computed: {
    ...mapState(["event", "user"]),
    hasNextPage() {
      return this.event.eventsTotal > this.page * 3;
    },
  },
};
</script>
