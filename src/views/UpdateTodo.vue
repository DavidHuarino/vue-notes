<template>
    <div class="p-3 bg-gray-300 h-screen">
        <header-todo-update :todos="todos" />
        <div class="flex justify-between mt-2">
            <p class="text-base text-gray-500 font-medium">{{todoPropertiesById.createdAt}}</p>
            <button class="bg-white rounded-full py-px px-1 text-sm tracking-wider font-medium focus:outline-none w-1/4 truncate" @click="modalCategory='true'">{{todoPropertiesById.categoryName}}</button>
        </div>
        <input type="text" v-model="todoPropertiesById.title" placeholder="Titulo" class="w-full text-xl focus:outline-none py-3 bg-gray-300">
        <section class="h-screen">
            <div class="flex justify-between mb-2" v-for="(todo, index) in concatTodos" :key="todo.currentTodoId">
                <div class="flex space-x-2 mx-2">
                    <input type="checkbox" v-model="todo.completed">
                    <p :class="{'line-through text-gray-400': todo.completed}">{{todo.content}}</p>
                </div>
                <div class="space-x-4">
                    <button class="focus:outline-none"><font-awesome-icon class="text-blue-500 text-xl" :icon="['fas', 'edit']"/></button>
                    <button class="focus:outline-none" @click="removeTodo(index)"><font-awesome-icon class="text-red-500 text-xl" :icon="['fas', 'times']"/></button>
                </div>
            </div>
        </section>
        <div class="absolute inset-x-0 bottom-0 bg-gray-400 text-center">
            <button class="p-2 w-full focus:outline-none" @click="modalCreate='true'">
                <font-awesome-icon class="text-black text-xl" :icon="['fas', 'plus']"/>
            </button>
        </div>
        <modal-todo-create v-show="modalCreate" @close-modal-todo="modalCreate=false" @get-todo="addTodo" />
    </div>
</template>
<script>
import HeaderTodoUpdate from '../components/HeaderTodoUpdate.vue';
import ModalTodoCreate from '../components/ModalTodoCreate.vue';
import { uuid } from 'vue-uuid';
export default {
    name: 'UpdateTodo',
    components:{
        'header-todo-update': HeaderTodoUpdate,
        'modal-todo-create': ModalTodoCreate
    },
    data() {
        return {
            todoId: this.$route.params.id,
            modalCreate: false,
            newTodos: [],
            currentTodoId: uuid.v1(),
            todosUnion: [...this.todos, ...this.newTodos]
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('todos/getTodoById', {
                todoId: to.params.id
            });
        });
    },
    async created() {
        await this.getPropertiesById();
    },
    methods: {
        removeTodo(value) {
            //console.log('value', index);
            //const removeIndex = this.concatTodos.findIndex(item => item.currentTodoId === value);
            //console.log(removeIndex, "index");
            //this.concatTodos = this.concatTodos.filter(item => item.currentTodoId !== value);
            this.todosUnion.splice(value, 1);
        },
        async getPropertiesById() {
            try {
                this.$store.dispatch('todos/getPropertiesById', {
                    todoId: this.todoId
                });
            } catch (error) {
                console.error(error.message);
            }
        },
        addTodo(todo) {
            this.currentTodoId = this.$uuid.v4();
            this.newTodos.push({
                content: todo,
                completed: false,
                createdAt: Date.now(),
                currentTodoId: this.currentTodoId
            });
            this.modalCreate = false;
        }
    },
    computed: {
        concatTodos: {
            get() {
                //this.todosUnion = [...this.todos, ...this.newTodos];
                return this.todosUnion;
            },
            set(value) {
                this.todosUnion = value;
            }
        },
        todos() {
            return this.$store.getters['todos/getTodo'];
        },
        todoPropertiesById() {
            return this.$store.getters['todos/getPropertiesById'];
        }
    }
}
</script>