<template>
    <div class="bg-blue-300 w-full min-h-screen p-3">
        <div class="flex justify-around">
            <router-link :to="{name: 'Home'}"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'arrow-left']"/></router-link>
            <button type="submit" form="my-form"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'check']"/></button>
        </div>
        <form id="my-form" @submit.prevent="createNote()">
            <input v-model="title" type="text" class="w-full text-xl bg-blue-300 focus:outline-none py-3" placeholder="Titulo">
            <!--
            <div contenteditable="true" class="min-h-screen focus:outline-none w-full flex flex-col" placeholder="Escribe tu nota aqui">
                <img src="../assets/logo.png" alt="">
                <p>como estan todoos</p>
            </div>-->
            <textarea v-model="content" name="" id="" rows="20" class="w-full bg-blue-300 focus:outline-none py-3" placeholder="Ingrese el contenido de la nota aqui"></textarea>
        </form>
        <!--<div contenteditable="true" class="min-h-screen focus:outline-none">
            <img src="../assets/logo.png" alt="">
            <p>como estan todoos</p>
        </div>-->
        <div class="inset-x-1 bottom-1 fixed bg-white rounded p-3 flex justify-evenly z-30">
            <button><font-awesome-icon class="text-black text-xl" :icon="['fas', 'font']"/></button>
            <button><font-awesome-icon class="text-black text-xl" :icon="['fas', 'tasks']"/></button>
            <label for="imageUpload"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'image']"/></label>
            <input type="file" id="imageUpload" accept="image/*" class="hidden">
            <button><font-awesome-icon class="text-black text-xl" :icon="['fas', 'microphone']"/></button>
            <button><font-awesome-icon class="text-black text-xl" :icon="['fas', 'fill-drip']"/></button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Create',
    data() {
        return {
            title: '',
            content: '',
        }
    },
    methods: {
        createNote() {
            this.$store.dispatch('addNoteToFirebase', {title: this.title, content: this.content});
            this.$router.push({name: 'Home'});
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
</style>