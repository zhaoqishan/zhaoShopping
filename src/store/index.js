import Vue from 'vue'
import Vuex from 'vuex'

import state from './modules/state'
import mutations from './modules/mutations'
import actions from './modules/actions'
import getters from './modules/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters

})

export default store
