import { auth, db } from '../firebase';
const state = {
    todos: [],
    currentList: 'notes',
    todo: [],
    todoById: {}
};
const mutations = {
    SET_TODOS(state, todos) {
        state.todos = todos;
    },
    SET_VALUE(state, value) {
        state.currentList = value;
    },
    SET_TODOS_BY_ID(state, todosByTodoId) {
        state.todo = todosByTodoId
    },
    SET_PROPERTIES_BY_TODO_ID(state, todoById) {
        state.todoById = todoById
    }
};
const actions = {
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
    async addTodoFirebase(_, { todos, categoryName, createdAt, title }) {
        const user = auth.currentUser;
        const newTodoCreated = await db.collection('userTodo').add({
            categoryName,
            createdAt,
            title,
            userId: user.uid
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
        commit('SET_PROPERTIES_BY_TODO_ID', todoPropertiesById.data());
    },
    // async updateTodoFirebase(_, { todos }) {
    //     todos.forEach(async element => {
    //         await db.collection('todos').doc().update();
    //     });
    // }
};
const getters = {
    todos(state) {
        return state.todos;
    },
    getCurrentList(state) {
        return state.currentList;
    },
    getTodo(state) {
        return state.todo;
    },
    getPropertiesById(state) {
        return state.todoById
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};