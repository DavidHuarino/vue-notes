<template>
    <div class="w-full min-h-screen p-3" :class="bgColorContainer">
        <div>
            <div class="flex justify-around">
                <!--<router-link :to="{name: 'Home'}"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'arrow-left']"/></router-link>-->
                <button @click="backMenu()"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'arrow-left']"/></button>
                <button type="submit" form="my-form"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'check']"/></button>
            </div>
            <div v-if="editor">
                <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                    bold
                </button>
                <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                    strike
                </button>
                <button @click="addImage">
                    add image from URL
                </button>
            </div>
            <form id="my-form" @submit.prevent="createNote()">
                <input v-model="title" type="text" class="w-full text-xl focus:outline-none py-3" :class="bgColorContainer" placeholder="Titulo">
                <!--
                <div contenteditable="true" class="min-h-screen focus:outline-none w-full flex flex-col" placeholder="Escribe tu nota aqui">
                    <img src="../assets/logo.png" alt="">
                    <p>como estan todoos</p>
                </div>
                -->
                <!--<textarea v-smodel="content" name="" id="" rows="20" class="w-full focus:outline-none py-3" :class="bgColorContainer" placeholder="Ingrese el contenido de la nota aqui"></textarea>-->
                <editor v-model="content"/>
            </form>
            {{ content }}
            <!--<editor v-model="content" />
            <div class="content">
                <h3>Content</h3>
                <pre><code>{{ content }}</code></pre>
            </div>-->
            
            <!--
            <editor v-model="content" />
            <div class="content">
                <h3>Content</h3>
                <pre><code>{{ content }}</code></pre>
            </div>-->
            <!--<div contenteditable="true" class="min-h-screen focus:outline-none">
                <img src="../assets/logo.png" alt="">
                <p>como estan todoos</p>
            </div>-->
            <div class="inset-x-1 bottom-1 fixed bg-white rounded p-3 flex justify-evenly">
                <button><font-awesome-icon class="text-black text-xl" :icon="['fas', 'font']"/></button>
                <button><font-awesome-icon class="text-black text-xl" :icon="['fas', 'tasks']"/></button>
                <label for="imageUpload"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'image']"/></label>
                <input type="file" id="imageUpload" accept="image/*" @change="uploadImage" class="hidden">
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
                            <input type="radio" :value="bg" class="hidden" v-model="bgColorContainer"/>
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
                    <span>{{selected}} {{bgColorContainer}}</span>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
//import {storage} from '../firebase.js';
import {db, auth} from '../firebase';
import { uuid } from 'vue-uuid';
import Editor from '../components/Editor.vue';
export default {
    name: 'Create',
    components: {
        Editor
    },
    data() {
        return {
            title: '',
            content: '',
            imageURL: null,
            showModalColor: false,
            selected: null,
            bgColorContainer: 'blue',
            classesColor: ['red', 'blue', 'gray'],
            fileName: uuid.v1(),
            directoryName: uuid.v1(),
            prevDirectoryName: null
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
        }
    },
    async created() {
        //window.onbeforeunload = function() {
        //    this.$store.dispatch('removeItemsByDirectoryName', {
        //        directoryName: this.directoryName
        //    });
        //}
        await this.getPrevDirectoryName();
        //if (this.prevDirectoryName) {
        //    window.addEventListener('beforeunload', this.removeItems(this.prevDirectoryName));
        //}

        this.directoryName = this.$uuid.v4();
        await this.$store.dispatch('setNewDirectoryNameToFirebase', {
            directoryName: this.directoryName
        });
        //const query = await this.$store.dispatch('getDirectoryName', {
        //    directoryName: this.directoryName
        //});
        //if (!localStorage.getItem('directoryName')) {
        //    localStorage.setItem('directoryName', this.directoryName);
        //}
    },
    methods: {
        async getPrevDirectoryName() {
            const user = auth.currentUser;
            const doc = await db.collection('prevDirectoryNames').where('userId', '==', user.uid).limit(1).get();
            //console.log(doc.docs)
            if (doc.docs.length == 0) {
                return
            }
            //console.log(doc.docs[0].data(), "upale", doc.docs[0].id, doc.docs[0].exists);
            //if (doc.docs[0].exists) {
            //    console.log("es verdadero")
            //}
            let id = doc.docs[0].id;
            this.prevDirectoryName = doc.docs[0].data().directoryName;
            await db.collection('prevDirectoryNames').doc(id).delete();
            await this.removeItems(this.prevDirectoryName);
            //if (doc.docs[0].exists) {
                //console.log(doc.docs[0].data().directoryName, "gaaa");
            //    return doc.docs[0].data().directsoryName;
            //}
            //return null
        },
        backMenu() {
            this.removeItems(this.directoryName);
            this.$router.push({name: 'Home'});
        },
        async removeItems(directoryName) {
            await this.$store.dispatch('removeItemsByDirectoryName', {
                directoryName
            });
        },
        async createNote() {
            await this.$store.dispatch('addNoteToFirebase', {
                title: this.title, 
                content: this.content, 
                noteColor: this.bgColorContainer
            });
            // remove images not exist in json
            console.log(this.editor.getJSON(), " json")
            await this.$store.dispatch('removeUnseenImagesFromStorage', {
                seen: this.getSeenImages,
                directoryName: this.directoryName
            });
            const user = auth.currentUser;
            const doc = await db.collection('prevDirectoryNames').where('userId', '==', user.uid).limit(1).get();
            let id = doc.docs[0].id;
            await db.collection('prevDirectoryNames').doc(id).delete();
            this.$router.push({name: 'Home'});
            //await db.collections('')
            //localStorage.removeItem('directoryName');
        },
        //cleanImages() {
        //    this.$store.dispatch('cleanImagesFromStorage', {
        //        
        //    });
        //},
        addImage() {
            const url = window.prompt('URL')
            if (url) {
                this.editor.chain().focus().setImage({ src: url, title: 'holi' }).run();
            }
        },
        async uploadImage(event) {
            console.log(event.target.files[0]);
            const file = event.target.files[0];
            this.fileName = this.$uuid.v4();
            //this.directoryName = localStorage.getItem('directoryName');
            this.imageURL = await this.$store.dispatch('uploadImageToStorage', {
                file, 
                photoId: this.fileName, 
                directoryName: this.directoryName
            });
            console.log("wadafa")
            if (this.imageURL) {
                this.editor.chain().focus().setImage({ src: this.imageURL, fileName: this.fileName }).run();
            }
            this.imageURL = null;
            console.log("llegue aqui")
            await this.$store.dispatch('addImageUrlToFirebase', {
                fileName: this.fileName, 
                directoryName: this.directoryName
            });
            //const ref = storage.ref(`images/${file.name}`);
            //const upload = ref.put(file)s;
            /*
            upload.on(
                "state_changed",
                function progress(snapshot) {
                    console.warn((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                function error(error) {
                    console.error(error);
                },
                function complete() {
                    console.info("Finished uploading!");
                }
            );*/
        }
    },
    computed: {
        editor() {
            return this.$store.getters.getEditor;
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
    .blue {
        @apply bg-blue-300;
    }
    .red {
        @apply bg-red-400;
    }
    .gray {
        @apply bg-gray-500;
    }
    /* tip tap css */
</style>