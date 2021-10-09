<template>
    <div class="w-full min-h-screen p-3" :class="note.noteColor">
        <div>
            <editor-header-update :editor="editor" />
            <editor-commands :editor="editor" />
            <div class="flex justify-between mt-2">
                <p class="text-base text-gray-500 font-medium">{{note.currentTime}}</p>
                <button class="bg-white rounded-full py-px px-1 text-sm tracking-wider font-medium focus:outline-none w-1/4 truncate" @click="modals.modalCategoryCreate='true'">{{note.selectedCategory}}</button>
            </div>
            <form id="my-form" @submit.prevent="updateNote(noteId, note)">
                <input v-model="note.title" type="text" class="w-full text-xl focus:outline-none py-3" :class="note.noteColor" placeholder="Titulo">
                <editor v-model="note.content" class="content" :style="{'height': `calc(${windowHeight}px - 210px)`}" />
            </form>
             <editor-footer :editor="editor" :directoryName="note.directoryName" @open-modal="selectedModal" :selectedCategory="selectedCategory" @change-favorite-note="note.favoriteNote=!note.favoriteNote" :favoriteNote="note.favoriteNote"/>
            <modal-text v-show="modals.modalText" @close-modal="modals.modalText=false" :editor="editor" />
            <modal-color v-show="modals.modalColor" @close-modal="modals.modalColor=false" v-model="note.noteColor" />
            <!-- <modal-category-update v-show="modals.modalCategory" @close-modal="modals.modalCategory=false" /> -->
            <modal-delete v-show="modals.modalDelete" @close-modal-delete="modals.modalDelete=false" :objectNote="note" />
            <modal-category-create v-show="modals.modalCategoryCreate" @close-modal="modals.modalCategoryCreate=false" :categories="categories" @selected-category-name="setSelectedCategoryName" />
        </div>
    </div>
</template>
<script>
import {db} from '../firebase';
import Editor from '../components/Editor.vue';
import HeaderUpdate from '../components/HeaderUpdate';
import Commands from '../components/Commands.vue';
import Footer from '../components/Footer.vue';
import ModalText from '../components/ModalText.vue';
import ModalColor from '../components/ModalColor.vue';
// import ModalCategoryUpdate from '../components/ModalCategoryUpdate.vue';
import ModalDelete from '../components/ModalDelete.vue';
import ModalCategoryCreate from '../components/ModalCategoryCreate.vue';
export default {
    name: 'Update',
    components: {
        Editor,
        'editor-header-update': HeaderUpdate,
        'editor-commands': Commands,
        'editor-footer': Footer,
        'modal-text': ModalText,
        'modal-color': ModalColor,
        // 'modal-category-update': ModalCategoryUpdate,
        'modal-delete': ModalDelete,
        'modal-category-create': ModalCategoryCreate
    },
    data() {
        return {
            noteId: this.$route.params.id,
            classesColor: ['red', 'blue', 'gray'],
            modals: {
                modalText: false,
                modalImage: false,
                modalAudio: false,
                modalColor: false,
                modalCategory: false,
                modalDelete: false,
                modalCategoryCreate: false
            },
            windowHeight: window.innerHeight
        }
    },
    async beforeRouteEnter (to, from, next) {
        let note = await db.collection('notes').doc(to.params.id).get();
        let noteTemp = { noteId: note.id, ...note.data() };
        next(vm => {
            vm.$store.dispatch('notes/setNoteUpdate', noteTemp);
        });
    },
    // mounted() {
    //     this.$store.dispatch('category/updatedSelectedCategory', {
    //         newCategory: this.note.selectedCategory
    //     });
    // },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    updated() {
        console.log(this.note.content, "update");

    },
    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },
    methods: {
        setSelectedCategoryName(name) {
            this.note.selectedCategory = name;
        },
        onResize() {
            this.windowHeight = window.innerHeight
        },
        async updateNote(noteId, note) {
            note.noteId = noteId;
            this.$store.dispatch('notes/updateNoteFromFirebase', {noteId, note});
            this.$toast.success('Nota actualizada');
            this.$router.push({name: 'Home'});
        },
        selectedModal(modal) {
            this.modals[modal] = true;
        },
        // msToTime(duration) {
        //     var milliseconds = Math.floor((duration % 1000) / 100),
        //         seconds = Math.floor((duration / 1000) % 60),
        //         minutes = Math.floor((duration / (1000 * 60)) % 60),
        //         hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        //     hours = (hours < 10) ? "0" + hours : hours;
        //     minutes = (minutes < 10) ? "0" + minutes : minutes;
        //     seconds = (seconds < 10) ? "0" + seconds : seconds;

        //     return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
        // }
    },
    computed: {
        editor() {
            return this.$store.getters['notes/getEditor'];
        },

        selectedCategory() {
            return this.$store.getters['category/getSelectedCategory'];
        },
        note() {
            return this.$store.getters['notes/getNoteUpdate'];
        },
        // date() {
        //     let date = new Date(this.note.createdAt);
        //     return date.toLocaleDateString();
        // },
        // createdAtNote() {
        //     return this.msToTime(this.note.createdAt);
        // },
        categories() {
            return this.$store.getters['category/categories'];
        }
    }
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