import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);
// $store.state
// $store.commit
// $store.dispatch
export default new Vuex.Store({
  state: {
    info: {},
    oldPhoneToken: ""
  },
  actions,
  mutations,
  strict: process.env.NODE_ENV !== "production"
});
