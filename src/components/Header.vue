<template>
    <div class="flex justify-around mb-3">
        <button @click="backMenu()" class="focus:outline-none focus:shadow-outline">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'arrow-left']"/>
        </button>
        <button @click="editor.chain().focus().undo().run()" class="focus:outline-none focus:shadow-outline" v-if="editor">
            <font-awesome-icon class="text-black text-lg" :icon="['fas', 'undo']"/>
        </button>
        <button @click="editor.chain().focus().redo().run()" class="focus:outline-none focus:shadow-outline" v-if="editor">
            <font-awesome-icon class="text-black text-lg" :icon="['fas', 'redo']"/>
        </button>
        <button type="submit" form="my-form" class="focus:outline-none focus:shadow-outline">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'check']"/>
        </button>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        editor: {
            type: Object
        },
        directoryName: {
            type: String
        }
    },
    methods: {
        async backMenu() {
            try {
                await this.$store.dispatch('images/removeItemsByDirectoryName', {
                    directoryName: this.directoryName
                });
                this.$store.dispatch('notes/getWordToSearch', {
                    searchWord: ''
                });
                this.$router.push({name: 'Home'});
            } catch (error) {
                console.error(error.message);
            }
        }
    },
}
</script>
<style>
    button:focus {
        outline: none;
    }
</style>