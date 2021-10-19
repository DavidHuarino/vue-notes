<template>
    <div class="w-full min-h-screen p-3" :class="bgColorContainer">
        <div class="">
            <editor-header :editor=editor :directoryName=directoryName id="first" />
            <editor-commands :editor=editor />
            <div class="flex justify-between mt-2">
                <p class="text-base text-gray-500 font-medium">{{getCurrentTime}}</p>
                <button class="bg-white rounded-full py-px px-1 text-sm tracking-wider font-medium focus:outline-none w-1/4 truncate" @click="modals.modalCategoryCreate='true'">{{selectedCategoryName}}</button>
            </div>
            <form id="my-form" @submit.prevent="createNote()">
                <input v-model="title" type="text" class="w-full text-xl focus:outline-none py-3" :class="bgColorContainer" placeholder="Titulo">
                <editor v-model="content" class="content" :style="{'height': `calc(${windowHeight}px - 210px)`}" />
            </form>
            <editor-footer :editor="editor" :directoryName="directoryName" @open-modal="selectedModal" :selectedCategory="selectedCategory" @change-favorite-note="favoriteNote=!favoriteNote" :favoriteNote="favoriteNote" id="second" />
            <modal-text v-show="modals.modalText" @close-modal="modals.modalText=false" :editor="editor" />
            <modal-color v-show="modals.modalColor" @close-modal="modals.modalColor=false" v-model="bgColorContainer" />
            <!-- <modal-category v-show="modals.modalCategory" @close-modal="modals.modalCategory=false" /> -->
            <modal-delete v-show="modals.modalDelete" @close-modal-delete="modals.modalDelete=false" :objectNote="{}" />
            <modal-category-create v-show="modals.modalCategoryCreate" @close-modal="modals.modalCategoryCreate=false" :categories="categories" @selected-category-name="setSelectedCategoryName" />
            <!-- <div>
                <transition name="fade">
                    <div v-if="showModalColor" class="bg-black inset-0 bg-opacity-50 flex justify-center items-end absolute">
                        <div class="bg-gray-200 w-full text-center relative h-48 rounded-t-lg">
                            <button @click="showModalColor=false"><font-awesome-icon class="text-black text-2xl top-2 right-1 absolute" :icon="['fas', 'times-circle']"/></button>
                            <h2 class="text-xl">Colors</h2>
                            <div class="grid grid-cols-6 gap-2 p-3 choose">
                                <label :class="bg" v-for="(bg, index) in classesColor" :key="index" class="w-12 h-12 rounded">
                                    <input type="radio" :value="bg" class="hidden" v-model="bgColorContainer"/>
                                </label>
                                
                                <label class="bg-red-500 w-10 h-10 rounded-full">
                                    <input type="radio" value="group1" class="hidden" v-model="selected"/>
                                </label>
                                <label class="bg-blue-500 w-10 h-10 rounded-full">
                                    <input type="radio" value="group2" class="hidden" v-model="selected"/>
                                </label>
                                <label class="bg-green-500 w-10 h-10 rounded-full">
                                    <input type="radio" value="group3" class="hidden" v-model="selected"/>
                                </label>
                            </div>
                        </div>
                    </div>
                </transition>
            </div> -->
        </div>
    </div>
</template>
<script>

import { uuid } from 'vue-uuid';
import Editor from '../components/Editor.vue';
import Commands from '../components/Commands.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ModalColor from '../components/ModalColor.vue';
// import ModalCategory from '../components/ModalCategoryHomeCreate.vue';
import ModalText from '../components/ModalText.vue';
import ModalDelete from '../components/ModalDelete.vue';
import ModalCategoryCreate from '../components/ModalCategoryCreate.vue';
export default {
    name: 'Create',
    components: {
        Editor,
        'editor-commands': Commands,
        'editor-header': Header,
        'editor-footer': Footer,
        'modal-color': ModalColor,
        // 'modal-category': ModalCategory,
        'modal-text': ModalText,
        'modal-delete': ModalDelete,
        'modal-category-create': ModalCategoryCreate
    },
    data() {
        return {
            title: '',
            content: '',
            //imageURL: null,
            //selected: null,
            bgColorContainer: 'blue',
            classesColor: ['red', 'blue', 'gray'],
            //fileName: uuid.v1(),
            directoryName: uuid.v1(),
            prevDirectoryName: null,
            noteIdUrl: uuid.v1(),
            prevDirectoryNameId: null,
            'is-active': false,
            modals: {
                modalText: false,
                modalImage: false,
                modalAudio: false,
                modalColor: false,
                modalCategory: false,
                modalDelete: false,
                modalCategoryCreate: false
            },
            windowHeight: window.innerHeight,
            favoriteNote: false,
            selectedCategoryName: 'categorías',
            timeToSort: null,
            currentTime: null
        }
    },
    watch: {
        content(content) {
            console.log("getJson", this.editor.getJSON(), content);
            let objectImages = this.editor.getJSON().content;
            const seenFileName = new Set();
            objectImages.forEach(object => {
                if (object.type === 'image') {
                    let fileName = object.attrs.fileName;
                    seenFileName.add(fileName);
                }
            });
            console.log("setFile", seenFileName);
        },
        // windowHeight(newHeight, oldHeight) {
        //     console.log(`it changed to ${newHeight} from ${oldHeight}`, "mierda");
        // }
    },
    // updated() {
    //     console.log(this.bgColorContainer, "father");
    // },
    destroyed() {
        this.$store.dispatch('category/updatedSelectedCategory', {
            newCategory: 'categorias'
        });
    },
    updated() {
        console.log(this.bgColorContainer, "father");
        console.log(document.getElementById("first").clientHeight, "waaaa")
        console.log(document.getElementById("second").clientHeight, "waaaa")
        console.log(this.windowHeight, "waaaa")
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
        let date = new Date();
        console.log(date.toLocaleDateString(), "hora", date.getUTCMilliseconds(), "waaa", Date.now());
    },
    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },
    async created() {
        // let doc = await this.$store.dispatch('notes/getPrevDirectoryName');
        // console.log(doc, "wadafa")
        this.timeToSort = Date.now();
        this.currentTime = new Date();
        console.log(typeof(this.currentTime), "tipo de variable", typeof(this.currentTime.toLocaleDateString()));
        this.getCategories();
        await this.getPrevDirectoryName();
        this.directoryName = this.$uuid.v4();
        if (this.prevDirectoryName) {
            await this.$store.dispatch('notes/updateDirectoryName', {
                prevDirectoryName: this.prevDirectoryNameId,
                directoryName: this.directoryName
            });
            // await db.collection('prevDirectoryNames').doc(this.prevDirectoryNameId).update({
            //     directoryName: this.directoryName
            // });
        } else {
            await this.$store.dispatch('notes/setNewDirectoryNameToFirebase', {
                directoryName: this.directoryName
            });
        }
    },
    methods: {
        setSelectedCategoryName(name) {
            this.selectedCategoryName = name;
        },
        getCategories() {
            try {
                this.$store.dispatch('category/getCategories');
            } catch (error) {
                console.error(error.message);
            }
        },
        onResize() {
            this.windowHeight = window.innerHeight
        },
        selectedModal(modal) {
            if (modal === 'modalDelete') {
                this.$router.push({ name: 'Home' });
                return 
            }
            this.modals[modal] = true;
        },
        async getPrevDirectoryName() {
            //const user = auth.currentUser;
            //const doc = await db.collection('prevDirectoryNames').where('userId', '==', user.uid).limit(1).get();
            let doc = await this.$store.dispatch('notes/getPrevDirectoryName');
            //console.log(doc.docs)
            if (doc.docs.length == 0) {
                return
            }
            //console.log(doc.docs[0].data(), "upale", doc.docs[0].id, doc.docs[0].exists);
            //if (doc.docs[0].exists) {
            //    console.log("es verdadero")
            //}
            //let id = doc.docs[0].id;
            this.prevDirectoryNameId = doc.docs[0].id;
            this.prevDirectoryName = doc.docs[0].data().directoryName;
            //await db.collection('prevDirectoryNames').doc(id).delete();
            await this.removeItems(this.prevDirectoryName);
            //if (doc.docs[0].exists) {
                //console.log(doc.docs[0].data().directoryName, "gaaa");
            //    return doc.docs[0].data().directsoryName;
            //}
            //return null
        },
        // async backMenu() {
        //     await this.removeItems(this.directoryName);
        //     this.$router.push({name: 'Home'});
        // },
        async removeItems(directoryName) {
            await this.$store.dispatch('images/removeItemsByDirectoryName', {
                directoryName
            });
        },
        async createNote() {
            this.noteIdUrl = this.$uuid.v4();
            await this.$store.dispatch('notes/addNoteToFirebase', {
                title: this.title, 
                content: this.content, 
                noteColor: this.bgColorContainer,
                noteIdUrl: this.noteIdUrl,
                selectedCategory: this.selectedCategoryName,
                directoryName: this.directoryName,
                favoriteNote: this.favoriteNote,
                currentTime: this.getCurrentTime,
                timeToSort: this.timeToSort
            });
            // remove images not exist in json
            console.log(this.editor.getJSON(), " json")
            await this.$store.dispatch('images/removeUnseenImagesFromStorage', {
                seen: this.getSeenImages,
                directoryName: this.directoryName
            });
            //const user = auth.currentUser;
            //const doc = await db.collection('prevDirectoryNames').where('userId', '==', user.uid).limit(1).get();
            let doc = await this.$store.dispatch('notes/getPrevDirectoryName');
            let id = doc.docs[0].id;
            // await db.collection('prevDirectoryNames').doc(id).delete();
            await this.$store.dispatch('notes/removePrevDirectoryName', {
                id
            });
            this.$router.push({name: 'Home'});
            this.$toast.success('Nota creada');
            this.$store.dispatch('todos/setCurrentListValue', {
                value: 'notes'
            });
            console.log(this.getEditor, "wadafa")
        },
    },
    computed: {
        getCurrentTime() {
            let curHour = this.currentTime.getHours() > 12 ? this.currentTime.getHours() - 12 : (this.currentTime.getHours() < 10 ? "0" + this.currentTime.getHours() : this.currentTime.getHours());
            let curMinute = this.currentTime.getMinutes() < 10 ? "0" + this.currentTime.getMinutes() : this.currentTime.getMinutes();
            let curMeridiem = this.currentTime.getHours() > 12 ? "PM" : "AM";
            return this.currentTime.toLocaleDateString() + ", " + curHour + ":" + curMinute + curMeridiem;
        },
        editor() {
            return this.$store.getters['notes/getEditor'];
        },
        getSeenImages() {
            const seen = new Set();
            const objectImages = this.editor.getJSON().content;
            objectImages.forEach(object => {
                if (object.type === 'image') {
                    let fileName = object.attrs.fileName;
                    seen.add(fileName);
                }
            });
            return seen
        },
        getEditor() {
            return this.$store.getters['images/getEditor'];
        },
        selectedCategory() {
            return this.$store.getters['category/getSelectedCategory'];
        },
        categories() {
            return this.$store.getters['category/categories'];
        }
    }
}
</script>
<style>
    button:focus {
        outline: none;
    }
    #ri-italic:hover {
        background: black;
        fill: white;
    }
    .content {
        overflow-y: auto;
    }
    .is-active-align {
        background: black;
        color: white;
        fill: white;
    }
    .is-active {
        background: black;
        fill: white;
        border-radius: 4px;
        color: white;
        transition: ease 0.5s all;
    }
    button:focus {
        outline: none;
    }
    [contenteditable][placeholder]:empty:before {
        content: attr(placeholder);
        position: absolute;
        color: gray;
        background-color: transparent;
    }
    /* tip tap css */
</style>