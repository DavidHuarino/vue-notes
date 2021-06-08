<template>
    <div class="bg-blue-300 w-full min-h-screen p-3">
        <div class="flex justify-around">
            <router-link :to="{name: 'Home'}"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'arrow-left']"/></router-link>
            <button type="submit" form="my-form"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'check']"/></button>
        </div>
        <form id="my-form">
            <input type="text" class="w-full text-xl bg-blue-300 focus:outline-none py-3" placeholder="Titulo">
            <!--<input type="text" class="w-full bg-blue-300 focus:outline-none" placeholder="Ingrese el contenido de la nota aqui">-->
            <textarea name="" id="" rows="20" class="w-full bg-blue-300 focus:outline-none py-3" placeholder="Ingrese el contenido de la nota aqui">
            </textarea>
        </form>
        <div class="inset-x-1 bottom-1 fixed bg-white rounded p-3 flex justify-evenly">
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
            text: ''
        }
    },
}
</script>
<style scoped>
    button:focus {
        outline: none;
    }
</style>