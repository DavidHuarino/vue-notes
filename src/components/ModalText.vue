<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-end absolute">
            <div class="bg-gray-200 w-full text-center relative h-60 rounded-t-lg">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl">Texto De Fondo</h2>
                <div v-if= "editor" class="flex p-3">
                    <div class="w-1/5 text-center">
                        <font-awesome-icon class="text-2xl text-black" :icon="['fas', 'brush']" :style="{color: colorBackground}"/>
                    </div>
                    <div class="flex-grow flex justify-around w-4/5">
                        <!-- <font-awesome-icon class="text-2xl cursor-pointer" :icon="['fas', 'circle']" :class="colorBackground" @click="editor.chain().focus().toggleHighlight({ color: 'indigow' }).run()"/> -->
                        <font-awesome-icon v-for="(bgColor, index) in textColor" :key="index" class="text-2xl cursor-pointer block" :icon="['fas', 'circle']" :class="bgColor" @click="setColorBackground(index)"/>
                        <!-- <font-awesome-icon v-for="(bgColor, index) in textColor" :key="index" class="text-2xl cursor-pointer block p-1 bg-pink-200" :icon="['fas', 'circle']" :style="[editor.isActive('highlight', { color: 'red' }) ? {'color': 'red'} : {'color': '#FFF'}]" @click="setColorBackground(index)"/> -->
                    </div>
                    <!-- <button class="border-none overflow-hidden" @click="editor.chain().focus().toggleHighlight({ color: 'indigow' }).run()" :class="{ 'is-active-background-text': editor.isActive('highlight', { color: 'indigow' }) }">
                        <font-awesome-icon class="text-xl " :icon="['fas', 'square-full']" :class="colorBackground"/>
                    </button> -->
                    <!-- <font-awesome-icon class="text-xl cursor-pointer" :icon="['fas', 'square-full']" :class="colorBackground" @click="editor.chain().focus().toggleHighlight({ color: 'indigow' }).run()"/> -->

                </div>
                <h2 class="text-xl">Fuentes</h2>
                <div v-if="editor" class="grid grid-cols-3 p-2 gap-3 h-24 overflow-y-auto mt-1">
                    <button class="p-1 bg-gray-300" @click="editor.chain().focus().unsetFontFamily().run()">
                        cleanNote
                    </button>
                    <button class="font-ubuntu p-1 bg-gray-300" @click="editor.chain().focus().setFontFamily('ubuntu').run()" :class="{ 'is-active-font-family': editor.isActive('textStyle', { fontFamily: 'ubuntu' }) }">
                        vueNote
                    </button>
                    <button class="font-caveat p-1 bg-gray-300" @click="editor.chain().focus().setFontFamily('caveat').run()" :class="{ 'is-active-font-family': editor.isActive('textStyle', { fontFamily: 'caveat' }) }">
                        vueNote
                    </button>
                    <button class="font-mukta p-1 bg-gray-300" @click="editor.chain().focus().setFontFamily('mukta').run()" :class="{ 'is-active-font-family': editor.isActive('textStyle', { fontFamily: 'mukta' }) }">
                        vueNote
                    </button>
                    <button class="font-rampart p-1 bg-gray-300" @click="editor.chain().focus().setFontFamily('rampart').run()" :class="{ 'is-active-font-family': editor.isActive('textStyle', { fontFamily: 'rampart' }) }">
                        vueNote
                    </button>
                    <button class="font-dancing_script p-1 bg-gray-300" @click="editor.chain().focus().setFontFamily('Dancing Script').run()" :class="{ 'is-active-font-family': editor.isActive('textStyle', { fontFamily: 'Dancing Script' }) }">
                        vueNote
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'ModalText',
    props: {
        editor: {
            type: Object,
        }
    },
    data() {
        return {
            colorBackground: null,
            textColor: ['blue-text', 'red-text', 'gray-text', 'green-text', 'indigo-text', 'purple-text', 'pink-text', 'yellow-text'],
            rgbaColor: [[96, 165, 250, 1], [248, 113, 113, 1], [156, 163, 175, 1], [52, 211, 153, 1], [129, 140, 248, 1], [139, 92, 246, 1], [236, 72, 153, 1], [251, 191, 36, 1]],
            tempIndex: -1,
        }
    },
    updated() {
        console.log(this.colorBackground);
        console.log(this.editor.isActive('highlight', { color: 'red' }), "wadafa");
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        getColorRgba(color) {
            const [r, b, g, a] = color;
            return `rgba(${r}, ${b}, ${g}, ${a})`;
        },
        setColorBackground(index) {
            this.editor.chain().focus().toggleHighlight({ color: this.getColorRgba(this.rgbaColor[index]) }).run();
            console.log(this.editor.isActive('highlight', { color: this.getColorRgba(this.rgbaColor[index]) }), "waaaaaaaa");
            const flagColor = this.editor.isActive('highlight', { color: this.getColorRgba(this.rgbaColor[index])});
            if (flagColor) {
                this.colorBackground = this.getColorRgba(this.rgbaColor[index]);   
            } else {
                this.colorBackground = 'black';
            }
            // console.log(this.tempIndex, index, "waaaaa");
            // if (this.tempIndex !== index) {
            //     this.colorBackground = this.getColorRgba(this.rgbaColor[index]);
            //     this.tempIndex = index;
            // } else {
            //     this.colorBackground = 'black';
            //     this.tempIndex = -1;
            // }
        }
    },
}
</script>
<style>
    .is-active-font-family {
        @apply ring-2 ring-gray-600;
    }
    :root {
        --colorTemp: 'red';
    }
    .is-active-background-text {
        color: red;
    }
    .is-active {
        color: green;
        @apply bg-red-600;
    }
    /* tailwind css */
    .blue-text {
        @apply text-blue-400;
    }
    .red-text {
        @apply text-red-400;
    }
    .gray-text {
        @apply text-gray-400;
    }
    .green-text {
        @apply text-green-400;
    }
    .indigo-text {
        @apply text-indigo-400;
    }
    .purple-text {
        @apply text-purple-500;
    }
    .pink-text {
        @apply text-pink-500;
    }
    .yellow-text {
        @apply text-yellow-400;
    }
</style>