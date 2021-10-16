<template>
    <div class="pl-3 pb-3 pt-3 bg-gray-300">
        <header-todo :todos="todos" :categoryName="selectedCategoryName" :createdAt="getCurrentTime" :title="title" :favoriteTodo="favoriteTodo" />
        <div class="flex justify-between mt-2">
            <p class="text-base text-gray-500 font-medium">{{getCurrentTime}}</p>
            <button class="bg-white rounded-full py-px px-1 text-sm tracking-wider font-medium focus:outline-none w-1/4 truncate mr-3" @click="modalCategory='true'">{{selectedCategoryName}}</button>
        </div>
        <input type="text" v-model="title" placeholder="Titulo" class="w-full text-xl focus:outline-none py-3 bg-gray-300">
        <section v-if="todos.length > 0" class="overflow-y-auto" :style="{'height': `calc(${windowHeight}px - 170px)`}">
            <div class="flex justify-between mb-2" v-for="(todo, index) in todos" :key="index">
                <div class="flex space-x-2 mx-2">
                    <input type="checkbox" v-model="todo.completed">
                    <p :class="{'line-through text-gray-400': todo.completed}">{{todo.content}}</p>
                </div>
                <div class="space-x-4 mr-4">
                    <button class="focus:outline-none" @click="updateTodo(index)"><font-awesome-icon class="text-gray-600 text-xl" :icon="['fas', 'edit']"/></button>
                    <button class="focus:outline-none" @click="removeTodo(index)"><font-awesome-icon class="text-gray-600 text-xl" :icon="['fas', 'times']"/></button>
                </div>
            </div>
        </section>
        <section v-else class="overflow-y-auto text-center" :style="{'height': `calc(${windowHeight}px - 170px)`}">
            No hay tareas
        </section>
        <div class="inset-x-0 bottom-0 fixed bg-gray-400 text-center flex px-7">
            <button class="p-2 focus:outline-none flex-grow-0" @click="favoriteTodo=!favoriteTodo">
                <font-awesome-icon class="text-black text-xl" :icon="['fas', 'star']" :class="{'text-yellow-400': favoriteTodo}" />
            </button>
            <button class="p-2 focus:outline-none flex-grow" @click="modalCreate='true'">
                <font-awesome-icon class="text-black text-xl" :icon="['fas', 'plus']" />
            </button>
            <button class="p-2 focus:outline-none flex-grow-0" @click="backMenu()">
                <font-awesome-icon class="text-black text-xl" :icon="['fas', 'trash']"/>
            </button>
            <!-- <button class="p-2 w-full focus:outline-none" @click="modalCreate='true'">
                <font-awesome-icon class="text-black text-xl" :icon="['fas', 'plus']"/>
            </button> -->
        </div>
        <modal-todo-create v-show="modalCreate" @close-modal-todo="modalCreate=false" @get-todo="addTodo" class="z-3" />
        <modal-todo-update v-if="modalUpdate" @close-modal="modalUpdate=false" class="z-3" :todoContentEdit.sync="todos[indexUpdate].content" />
        <modal-category-create v-show="modalCategory" @close-modal="modalCategory=false" :categories="categories" @selected-category-name="getCategoryName" />
    </div>
</template>
<script>
import HeaderTodo from '../components/HeaderTodo.vue';
import ModalTodoCreate from '../components/ModalTodoCreate.vue';
import ModalCategoryCreate from '../components/ModalCategoryCreate.vue';
import ModalTodoUpdate from '../components/ModalTodoUpdate.vue';
import { uuid } from 'vue-uuid';
//import Todo from '../components/Todo.vue';
export default {
    name: 'CreateTodo',
    components: {
        'header-todo': HeaderTodo,
        'modal-todo-create': ModalTodoCreate,
        'modal-category-create': ModalCategoryCreate,
        'modal-todo-update': ModalTodoUpdate
    },
    data() {
        return {
            todos: [],
            currentTime: null,
            title: '',
            selectedCategoryName: 'categorías',
            modalCreate: false,
            modalUpdate: false,
            modalCategory: false,
            todoId: uuid.v1(),
            windowHeight: window.innerHeight,
            //todoContentEdit: '',
            indexUpdate: null,
            favoriteTodo: false
        }
    },
    created() {
        this.currentTime = new Date();
        this.getCategories();
        this.todoId = this.$uuid.v4();
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },
    methods: {
        backMenu() {
            this.$router.push({ name: 'Home' });
        },
        updateTodo(value) {
            this.modalUpdate = true;
            this.indexUpdate = value;
        },
        removeTodo(value) {
            console.log(value);
            this.todos.splice(value, 1);
        },
        addTodo(todo) {
            this.todos.push({
                content: todo,
                completed: false,
                createdAt: Date.now()
            });
            this.modalCreate = false;
        },
        getCategories() {
            try {
                this.$store.dispatch('category/getCategories');
            } catch (error) {
                console.error(error.message);
            }
        },
        getCategoryName(name) {
            this.selectedCategoryName = name;
        }
    },
    computed: {
        getCurrentTime() {
            let curHour = this.currentTime.getHours() > 12 ? this.currentTime.getHours() - 12 : (this.currentTime.getHours() < 10 ? "0" + this.currentTime.getHours() : this.currentTime.getHours());
            let curMinute = this.currentTime.getMinutes() < 10 ? "0" + this.currentTime.getMinutes() : this.currentTime.getMinutes();
            let curMeridiem = this.currentTime.getHours() > 12 ? "PM" : "AM";
            return this.currentTime.toLocaleDateString() + ", " + curHour + ":" + curMinute + curMeridiem;
        },
        categories() {
            return this.$store.getters['category/categories'];
        }
    }
}
</script>