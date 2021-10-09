import { db, auth } from '../firebase'
const state = {
    categories: [],
    selectedCategory: 'categorias'
};
const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_SELECTED_CATEGORY(state, category) {
        state.selectedCategory = category;
    }
};
const actions = {
    updatedSelectedCategory({ commit }, { newCategory }) {
        commit('SET_SELECTED_CATEGORY', newCategory);
    },
    getCategories({ commit, getters }) {
        const user = auth.currentUser;
        db.collection('category').where('userId', '==', user.uid).orderBy('createdAt', 'asc').onSnapshot(res => {
            const categories = res.docs.map(doc => ({categoryId: doc.id, ...doc.data() }));
            commit('SET_CATEGORIES', getters.getCategoriesExceptOne(categories));
        });
    },
    async addCategory(_, { name }) {
        const user = auth.currentUser;
        await db.collection('category').add({
            name,
            userId: user.uid,
            createdAt: Date.now(),
        });
    },
    async removeCategory(_, { id }) {
        try {
            await db.collection('category').doc(id).delete();
        } catch (error) {
            console.error(error.message);
        }
    },
    async updateCategoryNameById(_, {newCategoryName, categoryId}) {
        try {
            await db.collection('category').doc(categoryId).update({
                name: newCategoryName
            });
        } catch (error) {
            console.error(error.message);
        }
    }
};
const getters = {
    categories(state) {
        return state.categories;
    },
    getSelectedCategory(state) {
        return state.selectedCategory;
    },
    seenCategoryName: (state) => name => {
        const seen = new Set();
        state.categories.forEach(object => {
            seen.add(object.name);
        });
        return seen.has(name);
    },
    getIndexByName: (state) => name => {
        return state.categories.findIndex(object => object.name === name);
    },
    seenCategoryNameExceptCurrentName: (state) => (currentName, searchName) => {
        const seen = new Set();
        state.categories.forEach(object => {
            if (currentName === object.name) {
                return;
            }
            seen.add(object.name);
        });
        return seen.has(searchName);
    },
    getCategoriesExceptOne: () => categoryArray => {
        return categoryArray.filter(object => object.name !== 'Todas');
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};