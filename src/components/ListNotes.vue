<template>
    <div class="square-container">
        <div v-for="objectNote in currentProperties" :key="objectNote.noteIdUrl" :class="objectNote.noteColor" class="square rounded-lg">
            <div class="content p-2">
                <button class="absolute left-0 top-0 ml-1 focus:outline-none p-1" @click.stop="updateFavoriteNote(objectNote.noteId, objectNote.favoriteNote)"><font-awesome-icon class="text-base text-black" :class="{'background-text-favorite-note': objectNote.favoriteNote}" :icon="['fas', 'star']"/></button>
                <router-link :to="{name: 'updateNote', params: {id: objectNote.noteId}}" class="w-full h-full flex items-center justify-center">
                    <h2 v-if="objectNote.title.length > 0" class="truncate">{{objectNote.title}}</h2>
                    <h2 v-else>Sin titulo</h2>
                    <div class="absolute inset-x-0 bottom-0 text-sm w-11/12 text-right pt-1">
                        {{getDate(objectNote.currentTime)}}
                    </div>
                    <!-- <p class="truncate">{{objectNote.content}}</p> -->
                    
                </router-link>
            </div>
            <!-- <button class="bg-gray-500 text-white p-1 " @click="removeNote(objectNote.noteId, objectNote.directoryName)">Remove <font-awesome-icon class="text-base" :icon="['fas', 'trash']"/></button> -->
            <!-- <button class="bg-gray-500 text-white p-1 focus:outline-none" @click="getObjectNote(objectNote)">Remove <font-awesome-icon class="text-base" :icon="['fas', 'trash']"/></button> -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'ListNotes',
    props: {
        currentProperties: {
            type: Array,
            required: true
        }
    },
    components: {
    },
    data() {
        return {
        }
    },
    created() {
        //this.getNotes();
    },
    methods: {
        async updateFavoriteNote(id, favoriteNote) {
            await this.$store.dispatch('notes/updateFavoriteNote', {
                noteId: id,
                flagNote: !favoriteNote
            });
        }
        // getNotes() {
        //     this.$store.dispatch('notes/getNotesById');
        // },
        // getObjectNote(objectNote) {
        //     this.modalDelete = true;
        //     this.tempObjectNote = objectNote;
        // }
    },
    computed: {
        getDate() {
            return date => {
                return date.split(',')[0];
            }
        }
        // notes() {
        //     return this.$store.getters['notes/getNotes'];
        // }
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
    .background-text-favorite-note {
        @apply text-yellow-400;
    }
    .square-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
        grid-gap: 10px;
    }

    .square {
        /* background: cadetblue; */
        padding-top: 100%; /* padding trick directly on the grid item */
        box-sizing: border-box;
        position: relative;
    }

    .square .content { /* absolutely positioned */
        position: absolute;
        top: 0;
        right:0;
        left: 0;
        bottom: 0;
    }
</style>