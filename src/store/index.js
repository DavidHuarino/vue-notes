import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from '../firebase'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }  
  },
  actions: {
    async doLogin({commit}, {email, password}) {
      await auth.signInWithEmailAndPassword(email, password);
      commit('SET_USER', auth.currentUser);
    },
    async doRegister({commit}, {name, email, password}) {
      await auth.createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      await user.updateProfile({
        displayName: name
      });
      commit('SET_USER', user);
    },
    async doLogOut({commit}) {
      await auth.signOut();
      commit('SET_USER', null);
    },
    async getCurrentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(
          user => {
            unsubscribe();
            resolve(user);
          },
          () => {
            reject();
          }
        );
      });
    },
    checkAuth({commit}) {
      auth.onAuthStateChanged(user => {
          if(user) {
            commit('SET_USER', user);
          } else {
            commit('SET_USER', null);
          }
      });
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  modules: {
  }
});
store.dispatch('checkAuth');
export default store;
