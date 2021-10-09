<template>
    <div v-if="editor" class="bg-white p-1 flex justify-around shadow-md border border-black">
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" class="py-2 px-3">
            <font-awesome-icon class="text-base" :icon="['fas', 'bold']"/>
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" class="py-2 px-3">
            <font-awesome-icon class="text-base" :icon="['fas', 'italic']"/>
        </button>
        <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }" class="py-2 px-2.5">
            <font-awesome-icon class="text-base" :icon="['fas', 'underline']"/>
        </button>
        
        <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" class="py-2 px-2.5">
            <font-awesome-icon class="text-base" :icon="['fas', 'align-left']"/>
        </button>
        <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" class="py-2 px-2.5">
            <font-awesome-icon class="text-base" :icon="['fas', 'align-center']"/>
        </button>
        <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" class="py-2 px-2.5">
            <font-awesome-icon class="text-base" :icon="['fas', 'align-right']"/>
        </button>
        <button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }" class="py-2 px-2.5">
            <font-awesome-icon class="text-base" :icon="['fas', 'align-justify']"/>
        </button>
    </div>
</template>
<script>
export default {
    name: 'Commands',
    props: {
        editor: {
            type: Object
        }
    }
}
</script>
<style>
    .is-active {
        background: black;
        fill: white;
        border-radius: 4px;
        color: white;
        transition: ease 0.5s all;
    }
</style>