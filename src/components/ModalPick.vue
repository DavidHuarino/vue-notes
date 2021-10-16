<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute p-3">
            <button @click="closeModal()"><font-awesome-icon class="text-white text-2xl top-6 right-5 absolute" :icon="['fas', 'times-circle']"/></button>
            <div class="bg-gray-200 relative rounded-lg text-center w-44 pb-3 px-1">
                <!-- <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button> -->
                <!-- <h2 class="text-xl mb-2 text-center">Pick </h2> -->
                <div class="flex flex-col h-full mt-3">
                    <button class="focus:outline-none bg-gray-300 mx-1 mb-2 rounded" @click="goCreateNote()">Notas</button>
                    <button class="focus:outline-none bg-gray-300 mx-1 rounded" @click="goCreateTodo()">Tareas</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'ModalPick',
    methods: {
        closeModal() {
            this.$emit('close-modal-pick');
        },
        goCreateNote() {
            this.$router.push({ name: 'createNote' });
        },
        goCreateTodo() {
            this.$router.push({ name: 'createTodo' });
        }
    },    
}
</script>