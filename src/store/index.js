import Vue from "vue";
import Vuex from "vuex";

import * as user from '@/store/modules/user'
import event from '@/store/modules/event'
import notification from '@/store/modules/notification'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ]
  },
  modules: {
    user,
    event,
    notification
  },
});
