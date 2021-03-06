import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        activitys: [],
        tasks: [],
        loading: true
    },
    getters,
    mutations,
    actions
})