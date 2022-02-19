import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';

const store = createStore({
  plugins: [createPersistedState()],
  modules: {
    coachesModule, requestsModule
  },
  state(){
    return {
      userId: 'c3'
    }
  },
  getters: {
    userId : (state) => state.userId,
  }
});

export default store;