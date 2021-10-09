<template>
    <div class="bg-white absolute inset-x-0 bottom-0 p-2 flex justify-around">
        <button class="focus:outline-none" @click="openModal()"><font-awesome-icon class="text-2xl text-black" :icon="['fas', 'bars']"/></button>
        <button class="bg-blue-400 p-1 rounded-full w-8 h-8 focus:outline-none" @click="GoCreateNoteAndTodo()"><font-awesome-icon class="text-2xl text-white" :icon="['fas', 'plus']"/></button>
        <!-- <router-link class="bg-blue-400 w-14 h-20" :to="{name: 'createNote'}"><font-awesome-icon class="text-2xl text-white" :icon="['fas', 'plus']"/></router-link> -->
        <button class="focus:outline-none" @click="getFavoriteNotes()"><font-awesome-icon class="text-2xl text-black" :icon="['fas', 'star']"/></button>
        <!-- <button class="">wadafa</button> -->
    </div>
</template>
<script>
export default {
    name: 'FooterHome',
    methods: {
        GoCreateNoteAndTodo() {
            //this.$router.push({ name: 'createNote' });
            this.$emit('open-modal-pick');
        },
        openModal() {
            this.$emit('open-modal-category');
        },
        getFavoriteNotes() {
            this.$emit('filter-favorite-note');
            this.$store.dispatch('notes/setFavoriteNotes');
        }
    },
}
</script>