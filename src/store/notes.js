import { db, auth } from '../firebase';
const state = {
    notes: [],
    editor: null
};
const mutations = {
    SET_NOTES(state, notes) {
        state.notes = notes;
    },
    REMOVE_NOTE(state, index) {
        state.notes.splice(index, 0);
    },
    SET_EDITOR(state, editor) {
        state.editor = editor;
    }
};
const actions = {
    addEditorToState({ commit }, editor) {
        commit('SET_EDITOR', editor);
    },
    getNotesById({ commit }) {
        const user = auth.currentUser
        db.collection('notes').where('userId', '==', user.uid).orderBy('createdAt', 'desc').onSnapshot(res => {
          const notes = res.docs.map(doc => ({noteId: doc.id, ...doc.data() }));
          commit('SET_NOTES', notes);
        });
    },
    async addNoteToFirebase(_, { title, content, noteColor, noteIdUrl }) {
        const user = auth.currentUser;
        await db.collection('notes').add({ 
          title, 
          content,
          createdAt: Date.now(),
          userId: user.uid,
          noteColor,
          noteIdUrl
        });
    },
    async updateNoteFromFirebase(_, { noteId, note }) {
        await db.collection('notes').doc(noteId).update(note);
    },
    async removeNote(_, id) {
        try {
            await db.collection('notes').doc(id).delete();   
        } catch (error) {
            console.error(error.message);
        }
    },
    async setNewDirectoryNameToFirebase(_, { directoryName }) {
        const user = auth.currentUser;
        await db.collection('prevDirectoryNames').add({
          userId: user.uid,
          directoryName
        });
    },
    async updateDirectoryName(_, { prevDirectoryName, directoryName }) {
        await db.collection('prevDirectoryNames').doc(prevDirectoryName).update({
            directoryName
        });
    },
    async getPrevDirectoryName() {
        const user = auth.currentUser;
        try {
            let doc = await db.collection('prevDirectoryNames').where('userId', '==', user.uid).limit(1).get();
            return doc;
        } catch (error) {
            console.error(error.message);
        }
    },
    async removePrevDirectoryName(_, { id }) {
        try {
            await db.collection('prevDirectoryNames').doc(id).delete();
        } catch (error) {
            console.error(error.message);
        }
    }
};
const getters = {
    getIndexNote: (state) => id => {
        return state.notes.findIndex(object => object.noteId === id);
    },
    getNote: (state) => id => {
        return state.notes.find(item => item.noteId === id);
    },
    getEditor(state) {
        return state.editor;
    },
    getNotes(state) {
        return state.notes;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};