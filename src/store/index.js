import Vue from 'vue'
import Vuex from 'vuex'
import {db, auth, storage} from '../firebase'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    notes: [],
    editor: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_NOTES(state, notes) {
      state.notes = notes;
    },
    REMOVE_NOTE(state, index) {
      state.notes.splice(index, 0);
    },
    SET_EDITOR(state, editor) {
      state.editor = editor;
    }
  },
  actions: {
    // editor
    addEditorToState({commit}, editor) {
      commit('SET_EDITOR', editor);
    },
    // storage
    removeItemsByDirectoryName(_, { directoryName }) {
      const user = auth.currentUser;
      let ref = storage.ref(`images/${user.uid}/${directoryName}`);
      ref.listAll().then(dir => {
        dir.items.forEach(fileRef => {
          var dirRef = storage.ref(fileRef.fullPath);
          dirRef.getDownloadURL().then(function(url) {
            var imgRef = storage.refFromURL(url);
            imgRef.delete().then(function() {
              // File deleted successfully 
              console.log("eliminado correctamente");
            }).catch(function(error) {
              // There has been an error
              console.log(error);  
            });
          });
        });
      }).catch(error => {
        console.log(error);
      });
    },
    async uploadImageToStorage(_, {file, photoId, directoryName}) {
      const user = auth.currentUser;
      const uploadPhoto = () => {
        let fileName = `images/${user.uid}/${directoryName}/${photoId}`;
        return storage.ref(fileName).put(file);
      };
      function getDownloadURL(ref) {
        return ref.getDownloadURL();
      }
      try {
        let upload = await uploadPhoto();
        return await getDownloadURL(upload.ref);
      } catch (error) {
        throw Error(error.message);
      }
    },
    async addImageUrlToFirebase(_, {fileName, directoryName}) {
      const user = auth.currentUser;
      await db.collection('images').add({
        userId: user.uid,
        fileName,
        directoryName
      });
    },
    // firebase
    async setNewDirectoryNameToFirebase(_, {directoryName}) {
      const user = auth.currentUser;
      await db.collection('prevDirectoryNames').add({
        userId: user.uid,
        directoryName
      });
    },
    async removeNote(_, id) {
      await db.collection('notes').doc(id).delete();
      //let index = getters.getIndexNote(id);
      //commit('REMOVE_NOTE', index);
    },
    getNotesById({commit}) {
      const user = auth.currentUser
      db.collection('notes').where('userId', '==', user.uid).orderBy('createdAt', 'desc').onSnapshot(res => {
        const notes = res.docs.map(doc => ({noteId: doc.id, ...doc.data() }));
        commit('SET_NOTES', notes);
      });
    },
    /*
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
    },*/
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
    },
    getEditor(state) {
      return state.editor;
    }
  },
  modules: {
  }
});
store.dispatch('checkAuth');
export default store;
