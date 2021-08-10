<template>
    <div class="flex justify-around">
        <button @click="backMenu()">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'arrow-left']"/>
        </button>
        <button @click="editor.chain().focus().undo().run()" v-if="editor">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'undo']"/>
        </button>
        <button @click="editor.chain().focus().redo().run()" v-if="editor">
            <font-awesome-icon class="text-black text-xl" :icon="['fas', 'redo']"/>
        </button>
        <button type="submit" form="my-form">
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