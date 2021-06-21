import Vue from 'vue'
import Vuex from 'vuex'
import {db, auth} from '../firebase'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    notes: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_NOTES(state, notes) {
      state.notes = notes;
    },
    REMOVE_NOTE(state, index) {
      state.notes.splice(index, 1);
    }
  },
  actions: {
    // firebase
    async removeNote({commit, getters}, id) {
      await db.collection('notes').doc(id).delete();
      let index = getters.getIndexNote(id);
      commit('REMOVE_NOTE', index);
    },
    async getNotesById({commit}) {
      const user = auth.currentUser;
      let notes = [];
      const query = await db.collection('notes').where('userId', '==', user.uid).orderBy('createdAt', 'desc').get();
      query.forEach(doc => {
        let newNote = doc.data();
        newNote.noteId = doc.id;
        notes.push(newNote);
      });
      commit('SET_NOTES', notes);
    },
    async addNoteToFirebase(_, {title, content, noteColor}) {
      const user = auth.currentUser;
      await db.collection('notes').add({ 
        title, 
        content,
        createdAt: Date.now(),
        userId: user.uid,
        noteColor
      });
    },
    async updateNoteFromFirebase(_, {noteId, note}) {
      await db.collection('notes').doc(noteId).update(note);
    },
    async doLogin({commit}, {email, password}) {
      await auth.signInWithEmailAndPassword(email, password);
      commit('SET_USER', auth.currentUser);
    },
    async doRegister({commit}, {name, email, password}) {
      await auth.createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      await db.collection('users').doc(user.uid).set({name, email});
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
    },
    getIndexNote: (state) => id => {
      return state.notes.findIndex(object => object.noteId === id);
    },
    getNote: (state) => id => {
      return state.notes.find(item => item.noteId === id);
    }
  },
  modules: {
  }
});
store.dispatch('checkAuth');
export default store;
