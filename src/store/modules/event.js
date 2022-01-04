import EventService from "@/services/EventService";

export default {
  state: {
    events: [],
    event: null,
    eventsTotal: 0,
    perPage: 3
  },
  mutations: {
    GET_EVENTS: (state, events) => (state.events = events),
    GET_EVENT: (state, event) => (state.event = event),
    SET_EVENT: (state, event) => state.events.push(event),
    SET_EVENTS_TOTAL: (state, total) => (state.eventsTotal = total),
  },
  actions: {
    createEvent({ commit, dispatch }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit("SET_EVENTS", event);
          let notification = {
            type: "success",
            message: "Your event was created successfully!",
          };
          dispatch("notification/add", notification, { root: true });
        })
        .catch((error) => {
          let notification = {
            type: "error",
            message: "There was an error creating event: " + error.message,
          };
          dispatch("notification/add", notification, { root: true });
          throw error;
        });
    },
    fetchEvents({ commit, dispatch, state }, {page }) {
      return EventService.getEvents(state.perPage, page)
        .then((response) => {
          commit("GET_EVENTS", response.data);
          commit("SET_EVENTS_TOTAL", response.headers["x-total-count"]);
        })
        .catch((error) => {
          let notification = {
            type: "error",
            message: "There was an error fetching events: " + error.message,
          };
          dispatch("notification/add", notification, { root: true });
        });
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id);
      if (event) {
        commit("GET_EVENT", event);
        return event;
      } else {
        return EventService.getEvent(id)
          .then((res) => {
            commit("GET_EVENT", res.data);
            return res.data;
          });
      }
    },
  },
  getters: {
    getEvents: (state) => state.events,
    getEventById: (state) => (id) =>
      state.events.find((event) => event.id === id),
  },
};
