<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute z-12">
            <div class="bg-gray-200 w-full relative h-32 rounded-lg m-3 p-3">
                <!-- <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button> -->
                <h2 class="text-lg text-left text-black">Eliminar</h2>
                <p class="text-left text-gray-500">¿Seguro que desea mover la tarea al cubo de basura?</p>
                <div class="flex justify-end">
                    <button class="text-blue-600 mr-3 text-sm focus:outline-none" @click="closeModal()">CANCELAR</button>
                    <button class="text-blue-600 text-sm focus:outline-none" @click="removeTodo()">ACEPTAR</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'ModalDeleteTodo',
    props: {
        modalDelete: {
            type: Boolean,
            required: true
        },
        todos: {
            type: Array,
            required: true
        },
        todoId: {
            type: String,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('update:modalDelete', false);
        },
        async removeTodo() {
            this.$store.dispatch('todos/removeTodosById', {
                todoId: this.todoId,
                todos: this.todos
            });
            this.$toast.success('Tarea eliminada');
            this.$router.push({ name: 'Home' });
            this.closeModal();
        }
    },
}
</script>