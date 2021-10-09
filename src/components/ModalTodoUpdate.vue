<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute p-3">
            <div class="bg-gray-200 w-full text-center relative h-40 rounded-lg">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl mb-2 text-center">Editar tarea</h2>
                <div class="flex flex-col">
                    <input type="text" class=" w-3/4 p-2 m-auto mb-2 rounded-xl focus:outline-none" :value="todoContentEdit" @input="todoEdit=$event.target.value">
                    <div>
                        <button type="submit" class="bg-blue-400 active:bg-blue-700 focus:outline-none py-1 px-4 text-white rounded-md" @click="editTodoName()">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'ModalTodoUpdate',
    props: {
        todoContentEdit: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            todoEdit: this.todoContentEdit
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        editTodoName() {
            this.$emit('update:todoContentEdit', this.todoEdit);
            this.closeModal();
        }
    },
    computed: {
    }
}
</script>