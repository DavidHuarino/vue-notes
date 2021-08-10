<template>
    <div class="inset-x-1 bottom-1 fixed bg-white rounded p-3 flex justify-evenly">
        <button>
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'font']"/>
        </button>
        <button>
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'tasks']"/>
        </button>
        <label for="imageUpload"><font-awesome-icon class="text-black text-xl" :icon="['fas', 'image']"/></label>
        <input type="file" id="imageUpload" accept="image/*" @change="uploadImage" class="hidden">
        <button>
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'microphone']"/>
        </button>
        <button>
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'fill-drip']"/>
        </button>
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
        }
    },
    data() {
        return {
            imageURL: null,
            fileName: uuid.v1(),
        }
    },
    methods: {
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