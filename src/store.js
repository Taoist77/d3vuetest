import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    graphData: []
  },
  getters: {
    graphData: state => state.graphData
  },
  mutations: {
    data_get(state, graphData) {
      state.graphData = graphData;
    }
  },
  actions: {
    graphData_get({
      commit
    }) {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await axios.get('http://nameless-waters-28486.herokuapp.com/');
          let graphData = response.data;
          commit("data_get", graphData);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }
  }
})