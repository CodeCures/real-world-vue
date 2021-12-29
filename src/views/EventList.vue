<template>
  <div>
      <h1>Event Listing for {{ user.user.name }}</h1>
      <EventCard v-for="event in event.events" :key="event.id" :event="event" />
      <template v-if="page != 1">
              <router-link :to="{ name: 'events', query: { page: page - 1 } }">Previous Page</router-link> | 
      </template>
      <template v-if="hasNextPage">
            <router-link :to="{ name: 'events', query: { page: page + 1 } }">Next Page</router-link>
      </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';

export default {
    components: {
        EventCard,
    },
    created(){
       this.$store.dispatch('fetchEvents', {
           perPage: 3,
           page: this.page
       });
    },
    computed: {
        page(){
            return parseInt(this.$route.query.page) || 1;
        },
        ...mapState(['event', 'user']),
        hasNextPage(){
            return this.event.eventsTotal > this.page * 3;
        },
    },
}
</script>
