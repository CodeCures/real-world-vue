<template>
  <div>
    <h1>Create An Event</h1>
    <form @submit.prevent="createEvent">
      <label for="categories">Categories</label>
      <select v-model="event.category">
        <option v-for="(cat, i) in categories" :key="i">{{ cat }}</option>
      </select>
      <h3>Name & Describe your event</h3>
      <div class="field">
        <label for="title">Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an Event title"
        />
      </div>
      <div class="field">
        <label for="description">Description</label>
        <input
          v-model="event.description"
          type="text"
          id="description"
          placeholder="Add a Description"
        />
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <label for="title">Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a Location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label for="title">Date</label>
        <Datepicker v-model="event.date" placeholder="Select A date" />
      </div>
      <div class="field">
        <label for="title">Select Time</label>
        <select v-model="event.time">
          <option v-for="(time, i) in times" :key="i">{{ time }}</option>
        </select>
      </div>
      <input type="submit" value="submit" class="button -fill-gradient" />
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapState } from "vuex";

export default {
  components: {
    Datepicker,
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      event: this.createFreshEventObject(),
    };
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch("createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "show-event",
            params: {
              id: this.event.id,
            },
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => {});
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id,
        user,
        organizer: user.name,
        category: "",
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: [],
      };
    },
  },
  computed: {
    ...mapState(["categories"]),
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>