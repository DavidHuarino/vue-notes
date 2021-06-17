import Vue from 'vue'
import Vuex from 'vuex'
import {db, auth} from '../firebase'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    notes: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_NOTE(state, notes) {
      state.notes = notes;
    }
  },
  actions: {
    // firebase
    async getNotesById({commit}) {
      let notes = [];
      db.collection('notes').onSnapshot(snap => {
        snap.forEach(doc => {
          console.log(doc.id, "waaa")
          console.log(doc.data(), "gaaa")
          let newNote = doc.data();
          newNote.id = doc.id;
          notes.push(newNote);
        });
      });
      commit('SET_NOTE', notes);
      /*const user = auth.currentUser;
      db.collection(`users/${user.uid}/notesId`).onSnapshot(querySnapShot => {
        querySnapShot.forEach(async doc => {
          //console.log(doc.data(), "aloja")
          let note = await db.doc(`notes/${doc.data().id}`).get();
          let newNote = note.data();
          newNote.id = note.id;
          notes.push(newNote);
        });
        commit('SET_NOTE', notes);
      });*/
    },
    async addNoteToFirebase(_, {title, content}) {
      const newNote = await db.collection('notes').add({ title, content });
      const user = auth.currentUser;
      //console.log('nota creada', user.uid, newNote);
      await db.collection('users').doc(user.uid).collection('notesId').add({id: newNote.id});
      await db.collection('notes').doc(newNote.id).collection('userId').add({id: user.uid});
    },
    //notes
    // login
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
    }
  },
  modules: {
  }
});
store.dispatch('checkAuth');
export default store;
