<template>
    <div class="flex justify-around mb-3">
        <button @click="backMenu()" class="focus:outline-none focus:shadow-outline">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'arrow-left']"/>
        </button>
        <button type="submit" class="focus:outline-none focus:shadow-outline" @click="updateTodo()">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'check']"/>
        </button>
    </div>
</template>
<script>
export default {
    name: 'HeaderTodoUpdate',
    props: {
        updateTodos: {
            type: Array,
            required: true
        },
        newTodos: {
            type: Array,
            required: true
        },
        removeTodos: {
            type: Array,
            required: true
        },
        featuresTodo: {
            type: Object,
            required: true
        }
    },
    methods: {
        backMenu() {
            this.$router.push({ name: 'Home' });
        },
        async updateTodo() {
            await this.$store.dispatch('todos/updateTodoFirebase', {
                featuresTodo: this.featuresTodo,
                removeTodos: this.removeTodos,
                newTodos: this.newTodos,
                updateTodos: this.updateTodos
            });
            this.$toast.success('Tarea actualizada');
            this.backMenu();
        }
    },
}
</script>