<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-end absolute sm:w-3/5 sm:max-w-sm sm:m-auto">
            <div class="bg-gray-200 w-full text-center relative h-52 rounded-t-lg">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl">Colores</h2>
                <div class="grid grid-cols-6 p-3 choose gap-3">
                    <label :class="bg" v-for="(bg, index) in classesColor" :key="index" class="w-11 h-11 rounded cursor-pointer">
                        <input type="radio" :value="bg" class="hidden" v-model="localSelectedColor" />
                    </label>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'ModalColor',
    model: {
        prop: 'bgColorContainer',
        event: 'change'
    },
    props: {
        bgColorContainer: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            classesColor: ['blue', 'red', 'gray', 'green', 'indigo', 'purple', 'pink', 'yellow'],
        }
    },
    updated() {
        console.log(this.value, "wadafa")
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        }
    },
    computed: {
        localSelectedColor: {
            get() {
                return this.bgColorContainer;
            },
            set() {
                this.$emit('change', event.target.value);
            }
        }
    }
}
</script>
<style>
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.4s ease;
    }
    .blue {
        @apply bg-blue-400;
    }
    .red {
        @apply bg-red-500;
    }
    .gray {
        @apply bg-gray-400;
    }
    .green {
        @apply bg-green-400;
    }
    .indigo {
        @apply bg-indigo-500;
    }
    .purple {
        @apply bg-purple-500;
    }
    .pink {
        @apply bg-pink-500;
    }
    .yellow {
        @apply bg-yellow-400;
    }
</style>