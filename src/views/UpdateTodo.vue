<template>
    <div class="pl-3 pb-3 pt-3 bg-gray-300">
        <header-todo-update :removeTodos="removeTodosFromFirebase" :newTodos="newTodos" :updateTodos="todos" :featuresTodo="todoPropertiesById" />
        <div class="flex justify-between mt-2">
            <p class="text-base text-gray-500 font-medium">{{todoPropertiesById.createdAt}}</p>
            <button class="bg-white rounded-full py-px px-1 text-sm tracking-wider font-medium focus:outline-none w-1/4 truncate mr-3" @click="modalCategory=true">{{todoPropertiesById.categoryName}}</button>
        </div>
        <input type="text" v-model="todoPropertiesById.title" placeholder="Titulo" class="w-full text-xl focus:outline-none py-3 bg-gray-300">
        <section v-if="concatTodos.length > 0" class="overflow-y-auto" :style="{'height': `calc(${windowHeight}px - 170px)`}">
            <div class="flex justify-between mb-2" v-for="(todo, index) in concatTodos" :key="todo.currentTodoId">
                <div class="flex space-x-2 mx-2">
                    <input type="checkbox" v-model="todo.completed">
                    <p :class="{'line-through text-gray-400': todo.completed}" class="">{{todo.content}}</p>
                </div>
                <div class="space-x-4 mr-4">
                    <button class="focus:outline-none" @click="updateTodo(index)"><font-awesome-icon class="text-gray-600 text-xl" :icon="['fas', 'edit']"/></button>
                    <button class="focus:outline-none" @click="removeTodo(todo.currentTodoId, index)"><font-awesome-icon class="text-gray-600 text-xl" :icon="['fas', 'times']"/></button>
                </div>
            </div>
        </section>
        <section v-else class="overflow-y-auto text-center" :style="{'height': `calc(${windowHeight}px - 170px)`}">
            No hay tareas
        </section>
        <div class="inset-x-0 bottom-0 fixed bg-gray-400 text-center flex px-7">
            <button class="p-2 focus:outline-none flex-grow-0" @click="todoPropertiesById.favoriteTodo = !todoPropertiesById.favoriteTodo">
                <font-awesome-icon class="text-black text-xl" :icon="['fas', 'star']" :class="{'text-yellow-400':todoPropertiesById.favoriteTodo}" />
            </button>
            <button class="p-2 focus:outline-none flex-grow" @click="modalCreate='true'">
                <font-awesome-icon class="text-black text-xl" :icon="['fas', 'plus']"/>
            </button>
            <button class="p-2 focus:outline-none flex-grow-0" @click="modalDelete=true">
                <font-awesome-icon class="text-black text-xl" :icon="['fas', 'trash']"/>
            </button>
        </div>
        <modal-todo-create v-show="modalCreate" @close-modal-todo="modalCreate=false" @get-todo="addTodo" />
        <modal-todo-update v-if="modalUpdate" @close-modal="modalUpdate=false" class="z-3" :todoContentEdit.sync="concatTodos[indexUpdate].content" />
        <modal-category-create v-show="modalCategory" @close-modal="modalCategory=false" :categories="categories" @selected-category-name="getCategoryName" />  
        <modal-delete-todo v-show="modalDelete" :modalDelete.sync="modalDelete" :todoId="todoId" :todos="todos" />
    </div>
</template>
<script>
import HeaderTodoUpdate from '../components/HeaderTodoUpdate.vue';
import ModalTodoCreate from '../components/ModalTodoCreate.vue';
import ModalTodoUpdate from '../components/ModalTodoUpdate.vue';
import ModalCategoryCreate from '../components/ModalCategoryCreate.vue';
import ModalDeleteTodo from '../components/ModalDeleteTodo.vue';
import { uuid } from 'vue-uuid';
export default {
    name: 'UpdateTodo',
    components:{
        'header-todo-update': HeaderTodoUpdate,
        'modal-todo-create': ModalTodoCreate,
        'modal-todo-update': ModalTodoUpdate,
        'modal-category-create': ModalCategoryCreate,
        'modal-delete-todo': ModalDeleteTodo
    },
    data() {
        return {
            todoId: this.$route.params.id,
            modalCreate: false,
            newTodos: [],
            currentTodoId: uuid.v1(),
            removeTodosFromFirebase: [],
            modalUpdate: false,
            indexUpdate: null,
            modalCategory: false,
            windowHeight: window.innerHeight,
            modalDelete: false

        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('todos/getTodoById', {
                todoId: to.params.id
            });
        });
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },
    async created() {
        await this.getPropertiesById();
        this.getCategories();
    },
    methods: {
        getCategoryName(categoryName) {
            this.todoPropertiesById.categoryName = categoryName;
        },
        getCategories() {
            try {
                this.$store.dispatch('category/getCategories');
            } catch (error) {
                console.error(error.message);
            }
        },
        updateTodo(index) {
            this.indexUpdate = index;
            this.modalUpdate = true;
        },
        removeTodo(value, removeIndex) {
            if (this.seenTodosFromFirebase.has(value)) {
                this.removeTodosFromFirebase.push(value);
                this.todos.splice(removeIndex, 1);
                this.seenTodosFromFirebase.delete(value);
            } else {
                let findIndex = this.newTodos.findIndex(item => item.currentTodoId === value);
                this.newTodos.splice(findIndex, 1);
            }
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
        concatTodos() {
            return [...this.todos, ...this.newTodos];
        },
        seenTodosFromFirebase() {
            const seen = new Set();
            this.todos.forEach(element => { seen.add(element.currentTodoId) });
            return seen;
        },
        todos() {
            return this.$store.getters['todos/getTodo'];
        },
        todoPropertiesById() {
            return this.$store.getters['todos/getPropertiesById'];
        },
        categories() {
            return this.$store.getters['category/categories'];
        }
    }
}
</script>