import { auth, db } from '../firebase';
const state = {
    todos: [],
    currentList: 'notes',
    todo: [],
    todoById: {},
    searchWord: '',
    todosFilteredByCategory: []
};
const mutations = {
    SET_TODOS(state, todos) {
        state.todos = state.todosFilteredByCategory = todos;
    },
    SET_VALUE(state, value) {
        state.currentList = value;
    },
    SET_TODOS_BY_ID(state, todosByTodoId) {
        state.todo = todosByTodoId
    },
    SET_PROPERTIES_BY_TODO_ID(state, todoById) {
        state.todoById = todoById
    },
    SET_WORD_SEARCH(state, searchWord) {
        state.searchWord = searchWord;
    },
    SET_FAVORITE_TODOS(state, todos) {
        state.todosFilteredByCategory = todos;
    },
    SET_TODOS_TO_FILTEREDTODOS(state, todos) {
        state.todosFilteredByCategory = todos;
    },
    SET_FILTERED_TODO(state, todos) {
        state.todosFilteredByCategory = todos;
    }
};
const actions = {
    getWordToSearch({ commit }, { searchWord }) {
        commit('SET_WORD_SEARCH', searchWord);
    },
    getTodoById({ commit }, { todoId }) {
        db.collection('todos').where('todoId', '==', todoId).orderBy('createdAt', 'asc').onSnapshot(res => {
            const todosByTodoId = res.docs.map(doc => ({currentTodoId: doc.id, ...doc.data() }));
            commit('SET_TODOS_BY_ID', todosByTodoId);
        });
    },
    setCurrentListValue({ commit }, {value}) {
        commit('SET_VALUE', value);
    },
    getTodosById({ commit }) {
        const user = auth.currentUser;
        db.collection('userTodo').where('userId', '==', user.uid).orderBy('createdAt', 'desc').onSnapshot(res => {
          const todos = res.docs.map(doc => ({todoId: doc.id, ...doc.data() }));
          commit('SET_TODOS', todos);
        });
    },
    async addTodoFirebase(_, { todos, categoryName, createdAt, title, favoriteTodo }) {
        const user = auth.currentUser;
        const newTodoCreated = await db.collection('userTodo').add({
            categoryName,
            createdAt,
            title,
            userId: user.uid,
            favoriteTodo
        });
        const todoId = newTodoCreated.id;
        todos.forEach(async element => {
            await db.collection('todos').add({
                completed: element.completed,
                content: element.content,
                todoId,
                createdAt: element.createdAt
            });
        });
    },
    async getPropertiesById({ commit }, { todoId }) {
        const todoPropertiesById = await db.collection('userTodo').doc(todoId).get();
        commit('SET_PROPERTIES_BY_TODO_ID', { todoId, ...todoPropertiesById.data() });
    },
    async updateTodoFirebase(_, { featuresTodo, removeTodos, newTodos, updateTodos }) {
        try {
            await db.collection('userTodo').doc(featuresTodo.todoId).update({
                categoryName: featuresTodo.categoryName,
                title: featuresTodo.title,
                favoriteTodo: featuresTodo.favoriteTodo
            });
            removeTodos.forEach(async element => {
                await db.collection('todos').doc(element).delete();
            });
            newTodos.forEach(async element => {
                await db.collection('todos').add({
                    completed: element.completed,
                    content: element.content,
                    todoId: featuresTodo.todoId,
                    createdAt: element.createdAt
                });
            });
            updateTodos.forEach(async element => {
                await db.collection('todos').doc(element.currentTodoId).update({
                    completed: element.completed,
                    content: element.content
                });
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    async removeTodosById(_, { todoId, todos }) {
        try {
            await db.collection('userTodo').doc(todoId).delete();
            todos.forEach(async item => {
                await db.collection('todos').doc(item.currentTodoId).delete();
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    async updateFavoriteTodoById(_, { todoId, favoriteTodo }) {
        try {
            await db.collection('userTodo').doc(todoId).update({
                favoriteTodo: !favoriteTodo
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    setFavoriteTodos({ commit, getters }) {
        commit('SET_FAVORITE_TODOS', getters.getFavoriteTodos);
    },
    setAllTodosToFilteredTodos({ commit, getters }) {
        commit('SET_TODOS_TO_FILTEREDTODOS', getters.getAllTodos);
    },
    getCategoryToFilterTodos({ commit, getters }, { categoryName }) {
        commit('SET_FILTERED_TODO', getters.getTodosByCategoryName(categoryName));
    },
};
const getters = {
    countTodosByCategory: (state) => categoryName => {
        return state.todos.filter(object => object.categoryName === categoryName).length;
    },
    getTodosByCategoryName: (state) => categoryName => {
        return state.todos.filter(object => object.categoryName === categoryName);
    },
    getAllTodos(state) {
        return state.todos;
    },
    getFavoriteTodos(state) {
        return state.todos.filter(object => object.favoriteTodo === true);
    },
    todos(state) {
        return state.todos;
    },
    getCurrentList(state) {
        return state.currentList;
    },
    getTodo(state) {
        return state.todo;
    },
    getFilteredTodos(state) {
        if (state.searchWord !== '') {
            return state.todosFilteredByCategory.filter(object => object.title.toLowerCase().includes(state.searchWord));
        }
        return state.todosFilteredByCategory;
    },
    getPropertiesById(state) {
        return state.todoById
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