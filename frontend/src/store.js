import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showDrawer: false,
    minifyDrawer: false,
    user: {}
  },
  mutations: {
    showDrawer(state, val) {
      state.showDrawer = val;
    },
    minifyDrawer(state, val) {
      state.minifyDrawer = val;
    },
  },
  getters: {
    showDrawer(state) {
      return Vue.prototype.$vuetify.breakpoint.lgAndUp || state.showDrawer;
    },
    minifyDrawer(state) {
      return state.minifyDrawer;
    },
    userLoggedIn(state) {
      return (typeof state.user == 'object' && state.user.uid);
    },
  },
  actions: {
    toggleDrawer({commit, state}) {
      commit('showDrawer', !state.showDrawer);
    },
    toggleMinify({commit, state}) {
      commit('minifyDrawer', !state.minifyDrawer);
    },
    processClick({dispatch}, action) {
      if (action.do)
        dispatch(action.do, action.param);
      if (action.goto)
        Vue.prototype.$router.push(action.goto);
    }
  }
})
