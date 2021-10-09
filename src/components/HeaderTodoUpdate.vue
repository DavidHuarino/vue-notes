<template>
    <div class="flex justify-around mb-3">
        <button @click="backMenu()" class="focus:outline-none focus:shadow-outline">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'arrow-left']"/>
        </button>
        <button type="submit" class="focus:outline-none focus:shadow-outline" @click="updateTodos()">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'check']"/>
        </button>
    </div>
</template>
<script>
export default {
    name: 'HeaderTodoUpdate',
    props: {
        todos: {
            type: Array,
            required: true
        },
        // categoryName: {
        //     type: String,
        //     required: true
        // },
        // createdAt: {
        //     type: String,
        //     required: true
        // },
        // title: {
        //     type: String,
        //     required: true
        // }
    },
    created() {
        console.log(this.todos, "waafa");
    },
    methods: {
        backMenu() {
            this.$router.push({ name: 'Home' });
        },
        async updateTodo() {
            await this.$store.dispatch('updateTodoFirebase', {
                todos: this.todos
            });
        }
    },
}
</script>