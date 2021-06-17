<template>
    <div class="grid grid-cols-2 gap-2">
        <div v-for="objectNote in notes" :key="objectNote.id" class="bg-blue-300">
            <h1>{{objectNote.title}}</h1>
            <p>{{objectNote.content}}</p>
        </div>
    </div>
</template>
<script>

export default {
    name: 'ListNotes',
    computed: {
        notes() {
            return this.$store.state.notes;
        }
    }
}
</script>