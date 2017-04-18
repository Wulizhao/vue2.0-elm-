import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  count: 20
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
