<template>
    <div class="w-full min-h-screen p-3" :class="note.noteColor">
        <div>
            <div class="flex justify-around">
                <router-link :to="{name: 'Home'}"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'arrow-left']"/></router-link>
                <button type="submit" form="my-form"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'check']"/></button>
            </div>
            <form id="my-form" @submit.prevent="createNote()">
                <input v-model="note.title" type="text" class="w-full text-xl focus:outline-none py-3" :class="note.noteColor" placeholder="Titulo">
                <!--
                <div contenteditable="true" class="min-h-screen focus:outline-none w-full flex flex-col" placeholder="Escribe tu nota aqui">
                    <img src="../assets/logo.png" alt="">
                    <p>como estan todoos</p>
                </div>-->
                <textarea v-model="note.content" name="" id="" rows="20" class="w-full focus:outline-none py-3" :class="note.noteColor" placeholder="Ingrese el contenido de la nota aqui"></textarea>
            </form>
            <!--<div contenteditable="true" class="min-h-screen focus:outline-none">
                <img src="../assets/logo.png" alt="">
                <p>como estan todoos</p>
            </div>-->
            <div class="inset-x-1 bottom-1 fixed bg-white rounded p-3 flex justify-evenly">
                <button><font-awesome-icon class="text-black text-xl" :icon="['fas', 'font']"/></button>
                <button><font-awesome-icon class="text-black text-xl" :icon="['fas', 'tasks']"/></button>
                <label for="imageUpload"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'image']"/></label>
                <input type="file" id="imageUpload" accept="image/*" class="hidden">
                <button><font-awesome-icon class="text-black text-xl" :icon="['fas', 'microphone']"/></button>
                <button @click="showModalColor=true"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'fill-drip']"/></button>
            </div>
        </div>
        <transition name="fade">
            <div v-if="showModalColor" class="bg-black inset-0 bg-opacity-50 flex justify-center items-end absolute">
                <div class="bg-gray-200 w-full text-center relative h-48">
                    <button @click="showModalColor=false"><font-awesome-icon class="text-black text-2xl top-2 right-1 absolute" :icon="['fas', 'times-circle']"/></button>
                    <h2 class="text-xl">Colors</h2>
                    <div class="grid grid-cols-5 p-3 choose">
                        <label :class="bg" v-for="(bg, index) in classesColor" :key="index" class="w-10 h-10 rounded-full">
                            <input type="radio" :value="bg" class="hidden" v-model="note.noteColor"/>
                        </label>
                        <!--
                        <label class="bg-red-500 w-10 h-10 rounded-full">
                            <input type="radio" value="group1" class="hidden" v-model="selected"/>
                        </label>
                        <label class="bg-blue-500 w-10 h-10 rounded-full">
                            <input type="radio" value="group2" class="hidden" v-model="selected"/>
                        </label>
                        <label class="bg-green-500 w-10 h-10 rounded-full">
                            <input type="radio" value="group3" class="hidden" v-model="selected"/>
                        </label>-->
                    </div>
                    
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'Update',
    data() {
        return {
            noteId: this.$route.params.id,
            showModalColor: false,
            classesColor: ['red', 'blue', 'gray'],
        }
    },
    created() {
        this.getNote();
    },
    methods: {
        async getNote() {
            await this.$store.dispatch('getNoteById', {noteId: this.noteId});
        }
    },
    computed: {
        note() {
            return this.$store.state.note;
        }
    },
}
</script>
<style scoped>
    button:focus {
        outline: none;
    }
    [contenteditable][placeholder]:empty:before {
        content: attr(placeholder);
        position: absolute;
        color: gray;
        background-color: transparent;
    }
    .blue {
        @apply bg-blue-300;
    }
    .red {
        @apply bg-red-400;
    }
    .gray {
        @apply bg-gray-500;
    }
</style>