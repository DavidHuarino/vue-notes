import { db, auth } from '../firebase';
const state = {
    notes: [],
    editor: null,
    noteUpdate: {},
    searchWord: '',
    notesFilteredByCategory: []
};
const mutations = {
    SET_NOTES(state, notes) {
        state.notes = state.notesFilteredByCategory = notes;
    },
    REMOVE_NOTE(state, index) {
        state.notes.splice(index, 0);
    },
    SET_EDITOR(state, editor) {
        state.editor = editor;
    },
    SET_NOTE_UPDATE(state, note) {
        state.noteUpdate = note;
    },
    SET_WORD_SEARCH(state, word) {
        state.searchWord = word;
    },
    SET_FILTERED_NOTE(state, notes) {
        state.notesFilteredByCategory = notes;
    },
    SET_NOTES_TO_FILTEREDNOTES(state, notes) {
        state.notesFilteredByCategory = notes;
    },
    SET_FAVORITE_NOTES(state, notes) {
        state.notesFilteredByCategory = notes;
    },
    CLEAN_SEARCH_WORD(state, word) {
        state.searchWord = word;
    }
};
const actions = {
    cleanSearchWord({ commit }) {
        commit('CLEAN_SEARCH_WORD', '');
    },
    setNoteUpdate({ commit }, note) {
        commit('SET_NOTE_UPDATE', note);
    },
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
    async addNoteToFirebase(_, { title, content, noteColor, noteIdUrl, selectedCategory, directoryName, favoriteNote, currentTime, timeToSort }) {
        const user = auth.currentUser;
        try {
            await db.collection('notes').add({ 
                title, 
                content,
                createdAt: timeToSort,
                userId: user.uid,
                noteColor,
                noteIdUrl,
                selectedCategory,
                directoryName,
                favoriteNote,
                currentTime
            });   
        } catch (error) {
            console.error(error.message);
        }
    },
    async updateNoteFromFirebase(_, { noteId, note }) {
        await db.collection('notes').doc(noteId).update(note);
    },
    async updateFavoriteNote(_, { noteId, flagNote }) {
        try {
            await db.collection('notes').doc(noteId).update({
                favoriteNote: flagNote
            });
        } catch (error) {
            console.error(error.message);
        }
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
    },
    getWordToSearch({ commit }, { searchWord }) {
        commit('SET_WORD_SEARCH', searchWord);
    },
    getCategoryToFilterNotes({ commit, getters }, { categoryName }) {
        commit('SET_FILTERED_NOTE', getters.getNotesByCategoryName(categoryName));
    },
    setAllNotesToFilteredNotes({ commit, getters }) {
        commit('SET_NOTES_TO_FILTEREDNOTES', getters.getAllNotes);
    },
    setFavoriteNotes({ commit, getters }) {
        commit('SET_FAVORITE_NOTES', getters.getFavoriteNotes);
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
    getNotesByCategoryName: (state) => categoryName => {
        return state.notes.filter(object => object.selectedCategory === categoryName);
    },
    getNoteUpdate(state) {
        return state.noteUpdate;
    },
    countNotesByCategory: (state) => categoryName => {
        return state.notes.filter(object => object.selectedCategory === categoryName).length;
    },
    // notesFiltered(state) {
    //     let notes = state.notesFilteredByCategory.filter(object => object.title.toLowerCase().includes(state.searchWord));
    //     if (notes) {
    //         return notes;
    //     }
    //     return state.notesFilteredByCategory;
    // },
    getFilteredNotes(state) {
        if (state.searchWord !== '') {
            return state.notesFilteredByCategory.filter(object => object.title.toLowerCase().includes(state.searchWord));
        }
        return state.notesFilteredByCategory;
    },
    getAllNotes(state) {
        return state.notes;
    },
    getFavoriteNotes(state) {
        return state.notes.filter(object => object.favoriteNote === true);
    },
    getSearchWord(state) {
        return state.searchWord;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};