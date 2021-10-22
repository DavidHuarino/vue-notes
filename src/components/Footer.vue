<template>
    <div class="inset-x-1 bottom-1 fixed bg-white rounded py-3 px-5 flex justify-around sm:w-3/5 sm:max-w-sm sm:m-auto">
        <button @click="openModal('modalText')">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'font']"/>
        </button>
        <!-- <button @click="editor.chain().focus().toggleTaskList().run()" :class="{ 'is-active': editor.isActive('taskList') }" v-if="editor">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'tasks']"/>
        </button> -->
        <label for="imageUpload"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'image']"/></label>
        <input type="file" id="imageUpload" accept="image/*" @change="uploadImage" class="hidden">
        <!-- <button @click="openModal('modalAudio')">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'microphone']"/>
        </button> -->
        <button @click="openModal('modalColor')">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'fill-drip']"/>
        </button>
        <button @click="changeFavoriteNote()">
            <font-awesome-icon class="text-black text-xl" :class="{'background-text-favorite-note': favoriteNote}" :icon="['fas', 'star']"/>
        </button>
        <button @click="openModal('modalDelete')">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'trash']"/>
        </button>
        <!-- <div class="grid w-2/5">
            <button class="flex items-center w-full" @click="openModal('modalCategory')">
                <p class="w-4/5 truncate justify-self-end">{{ selectedCategory }}</p> <font-awesome-icon class="text-black text-xl w-1/5" :icon="['fas', 'folder-plus']"/>
            </button>
        </div> -->
    </div>
</template>
<script>
import { uuid } from 'vue-uuid';
export default {
    name: 'Footer',
    props: {
        editor: {
            type: Object
        },
        directoryName: {
            type: String
        },
        selectedCategory: {
            type: String,
            default: 'categorias'
        },
        favoriteNote: {
            type: Boolean
        }
    },
    data() {
        return {
            imageURL: null,
            fileName: uuid.v1(),
            showModal: false
        }
    },
    methods: {
        changeFavoriteNote() {
            this.$emit('change-favorite-note');
        },
        openModal(modal) {
            this.$emit('open-modal', modal);
        },
        async uploadImage(event) {
            const file = event.target.files[0];
            this.fileName = this.$uuid.v4();
            this.imageURL = await this.$store.dispatch('images/uploadImageToStorage', {
                file, 
                photoId: this.fileName, 
                directoryName: this.directoryName
            });
            if (this.imageURL) {
                this.editor.chain().focus().setImage({ src: this.imageURL, fileName: this.fileName }).run();
            }
            this.imageURL = null;
            // await this.$store.dispatch('addImageUrlToFirebase', {
            //     fileName: this.fileName, 
            //     directoryName: this.directoryName
            // });
        }
    },
    
}
</script>
<style scoped>
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    button:focus {
        outline: none;
    }
    .background-text-favorite-note {
        @apply text-yellow-400;
    }
    /* .ProseMirror {
        ul[data-type="taskList"] {
            list-style: none;
            padding: 0;
            li {
                display: flex;
                align-items: center;

                > label {
                flex: 0 0 auto;
                margin-right: 0.5rem;
                }
            }
        }
    } */
</style>