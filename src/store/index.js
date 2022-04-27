import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";
import permission from "./modules/permission";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer(val) {
    return {
      user: val.user, // 这里只对user模块作数据持久化
      permission: val.permission,
    };
  },
});
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
  },
  getters,
  plugins: [vuexLocal.plugin],
});

export default store;
