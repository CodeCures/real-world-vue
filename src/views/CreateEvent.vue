<template>
  <div>
    <h1>Create An Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Categories"
        :options="categories"
        v-model="event.category"
      />
      <h3>Name & Describe your event</h3>
      <BaseInput
        type="text"
        placeholder="Add an Event title"
        label="Title"
        v-model="event.title"
      />

      <BaseInput
        type="text"
        placeholder="Add a Description"
        label="Description"
        v-model="event.description"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        type="text"
        placeholder="Add a Location"
        label="Location"
        v-model="event.location"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label for="title">Date</label>
        <Datepicker v-model="event.date" placeholder="Select A date" />
      </div>

      <BaseSelect label="Time" :options="times" v-model="event.time" />

      <!-- <input type="submit" value="submit" class="button -fill-gradient" /> -->
      <BaseButton type="submit" className="-fill-gradient">
        Submit
      </BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapState } from "vuex";
import Nprogress from "nprogress";
import BaseSelect from "../components/BaseSelect.vue";

export default {
  components: {
    Datepicker,
    BaseSelect,
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
      Nprogress.start();
      this.$store
        .dispatch("createEvent", this.event)
        .then(() => {
          Nprogress.done();
          this.$router.push({
            name: "show-event",
            params: {
              id: this.event.id,
            },
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => {
          Nprogress.done();
        });
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