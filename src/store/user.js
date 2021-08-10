import { db, auth } from '../firebase';
const state = {
    user: null
};
const mutations = {
    SET_USER(state, user) {
        state.user = user;
    }
};
const actions = {
    async doLogin({ commit }, { email, password }) {
        await auth.signInWithEmailAndPassword(email, password);
        commit('SET_USER', auth.currentUser);
    },
    async doRegister({ commit }, { name, email, password }) {
        await auth.createUserWithEmailAndPassword(email, password);
        const user = auth.currentUser;
        await db.collection('users').doc(user.uid).set({name, email});
        commit('SET_USER', user);
    },
    async doLogOut({ commit }) {
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
};
const getters = {
    getUser(state) {
        return state.user;
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};