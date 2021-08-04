<template>
    <div class="grid grid-cols-2 gap-2">
        <div v-for="objectNote in notes" :key="objectNote.noteIdUrl" :class="objectNote.noteColor" class="p-3">
            <router-link :to="{name: 'updateNote', params: {id: objectNote.noteId}}">
                <h1>{{objectNote.title}}</h1>
                <p>{{objectNote.content}}</p>
            </router-link>
            <button class="bg-gray-500 text-white p-1" @click="removeNote(objectNote.noteId)">Remove</button>
        </div>
    </div>
</template>
<script>

export default {
    name: 'ListNotes',
    created() {
        this.getNotes();
    },
    methods: {
        getNotes() {
            this.$store.dispatch('getNotesById');
        },
        async removeNote(id) {
            this.$store.dispatch('removeNote', id);
        }
    },
    computed: {
        notes() {
            return this.$store.state.notes;
        }
    }
}
</script>
<style scoped>
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