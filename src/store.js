import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        windowHeight:'',
        userObj:{},
       },
    getters: {
        currentUser(state) {
            return state.currentUser;
        },
    },
    mutations: {
        setUserInfo(state, user) {
            state.userObj = user;
        },
        setWindowH(state,height){
            state.windowHeight = height;
        },//获取最大高度,这个不用管，也不用删。
    },
    actions: {
        setUser({ commit }, user) {
            commit("setUserInfo", user)
        },
        setWinH({commit},h){
            commit("setWindowH",h)
        },//获取最大高度,这个不用管，也不用删。
    }
});
export default store;