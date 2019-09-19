import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    citycode: "075"
  },
  mutations: {
    changeCitycode(state, value) {
      state.citycode = value;
    }
  },
  actions: {
    setCitycode({ commit }, value) {
      commit("changeCitycode", value);
    }
  }
});
