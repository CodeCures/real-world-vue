let nextID = 1;

export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  getters: {
    getNotifications: (state) => {
      return state.notifications;
    },
  },
  mutations: {
    PUSH: (state, notification) =>
      state.notifications.push({
        ...notification,
        id: nextID++,
      }),
    REMOVE: (state, notificationToRemove) =>
      (state.notifications = state.notifications.filter(
        (notification) => notification.id !== notificationToRemove
      )),
  },
  actions: {
    add: ({ commit }, notification) => commit("PUSH", notification),
    remove: ({ commit }, notificationToRemove) => commit("PUSH", notificationToRemove),
  },
};
