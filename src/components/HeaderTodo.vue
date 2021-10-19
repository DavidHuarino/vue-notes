<template>
    <div class="flex justify-around mb-3">
        <button @click="backMenu()" class="focus:outline-none focus:shadow-outline">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'arrow-left']"/>
        </button>
        <button type="submit" class="focus:outline-none focus:shadow-outline" @click="createTodos()">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'check']"/>
        </button>
    </div>
</template>
<script>
export default {
    name: 'HeaderTodo',
    props: {
        todos: {
            type: Array,
            required: true
        },
        categoryName: {
            type: String,
            required: true
        },
        createdAt: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        favoriteTodo: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        backMenu() {
            this.$router.push({ name: 'Home' });
        },
        async createTodos() {
            if (this.todos.length === 0) {
                this.$toast.info('Tareas vacias');
                return
            }
            await this.$store.dispatch('todos/addTodoFirebase', {
                todos: this.todos,
                categoryName: this.categoryName,
                createdAt: this.createdAt,
                title: this.title,
                favoriteTodo: this.favoriteTodo
            });
            this.$toast.success('Tarea creada');
            this.$store.dispatch('todos/setCurrentListValue', {
                value: 'todos'
            });
            this.backMenu();
        }
    },
}
</script>