import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';
import authModule from './modules/auth/index';
const store = createStore({
  modules: {
    coachesModule, requestsModule, authModule
  },
 });

export default store;