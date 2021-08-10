<template>
    <div v-if="editor" class="bg-gray-300 p-1 flex justify-around shadow-md border border-black">
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" class="p-2">
            <svg viewBox="0 0 24 24" id="ri-bold" class="w-5 rounded">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"></path>
                </g>
            </svg>
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" class="p-2">
            <svg viewBox="0 0 24 24" id="ri-italic" class="w-5 rounded">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"></path>
                </g>
            </svg>
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" class="p-2">
            <svg viewBox="0 0 24 24" id="ri-strikethrough" class="w-5 rounded">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z"></path>
                </g>
            </svg>
        </button>
        <button @click="editor.chain().focus().toggleHighlight().run()" :class="{ 'is-active': editor.isActive('highlight') }" class="p-2">
            <svg viewBox="0 0 24 24" id="ri-mark-pen-line" class="w-5 rounded">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M15.243 4.515l-6.738 6.737-.707 2.121-1.04 1.041 2.828 2.829 1.04-1.041 2.122-.707 6.737-6.738-4.242-4.242zm6.364 3.535a1 1 0 0 1 0 1.414l-7.779 7.779-2.12.707-1.415 1.414a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414l1.414-1.414.707-2.121 7.779-7.779a1 1 0 0 1 1.414 0l5.657 5.657zm-6.364-.707l1.414 1.414-4.95 4.95-1.414-1.414 4.95-4.95zM4.283 16.89l2.828 2.829-1.414 1.414-4.243-1.414 2.828-2.829z"></path>
                </g>
            </svg>
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