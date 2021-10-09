<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute p-3">
            <div class="bg-gray-200 w-full text-center relative h-40 rounded-lg">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl mb-2 text-center">Crear tarea</h2>
                <div class="flex flex-col">
                    <input type="text" class=" w-3/4 p-2 m-auto mb-2 rounded-xl focus:outline-none" placeholder="Escriba la tarea" v-model="newTodo">
                    <div>
                        <button type="submit" class="bg-blue-400 active:bg-blue-700 focus:outline-none py-1 px-4 text-white rounded-md" @click="createTodo()">Añadir</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'ModalTodoCreate',
    data() {
        return {
            newTodo: ''
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal-todo');
            this.newTodo = '';
        },
        createTodo() {
            this.$emit('get-todo', this.newTodo);
            this.newTodo = '';
        }

    },
}
</script>