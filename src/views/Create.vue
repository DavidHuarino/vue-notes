<template>
    <div class="w-full min-h-screen p-3" :class="bgColorContainer">
        <div class="space-y-3">
            <editor-header :editor=editor :directoryName=directoryName />
            <editor-commands :editor=editor />
            <form id="my-form" @submit.prevent="createNote()">
                <input v-model="title" type="text" class="w-full text-xl focus:outline-none py-3" :class="bgColorContainer" placeholder="Titulo">
                <editor v-model="content" class="content border-2 border-black border-opacity-50"/>
            </form>
            <editor-footer :editor="editor" :directoryName="directoryName" />
        </div>
    </div>
</template>
<script>

import { uuid } from 'vue-uuid';
import Editor from '../components/Editor.vue';
import Commands from '../components/Commands.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
export default {
    name: 'Create',
    components: {
        Editor,
        'editor-commands': Commands,
        'editor-header': Header,
        'editor-footer': Footer
    },
    data() {
        return {
            title: '',
            content: '',
            //imageURL: null,
            //showModalColor: false,
            //selected: null,
            bgColorContainer: 'blue',
            classesColor: ['red', 'blue', 'gray'],
            //fileName: uuid.v1(),
            directoryName: uuid.v1(),
            prevDirectoryName: null,
            noteIdUrl: uuid.v1(),
            prevDirectoryNameId: null,
            'is-active': false
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
    /*
    mounted() {
        console.log(document.getElementById("div-first").clientHeight, "waaaa")
        console.log(document.getElementById("div-second").clientHeight, "waaaa")
        console.log(document.getElementById("div-third").clientHeight, "waaaa")
        console.log(document.getElementById("div-last").clientHeight, "waaaa")
    },*/
    async created() {
        // let doc = await this.$store.dispatch('notes/getPrevDirectoryName');
        // console.log(doc, "wadafa")
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
                noteIdUrl: this.noteIdUrl
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
            console.log(this.getEditor, "wadafa")
        },
    },
    computed: {
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
        }
    }
}
</script>
<style scoped>
    #ri-italic {
        
    }
    #ri-italic:hover {
        background: black;
        fill: white;
    }
    .content {
        overflow-y: auto;
        height: calc(97vh - 160px);
        /*max-height: calc(100vh - 160px);*/

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