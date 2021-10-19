<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute p-3">
            <div class="bg-gray-200 w-11/12 relative h-4/5 rounded-lg text-left">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl mb-2 text-center">Categorías</h2>
                <section v-if="categories.length > 0" class="px-3 py-1 overflow-y-auto" :style="{'height': `calc(${windowHeight}px - 240px)`}">
                    <div v-for="(objectCategory, index) in categories" :key="index" class="my-2 p-1 border-b-2 border-blue-400 truncate" @click="getSelectedCategoryName(objectCategory.name)">
                        {{objectCategory.name}}
                    </div>
                </section>
                <section v-else class="text-center">
                    No hay categorias
                </section>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'ModalCategoryCreate',
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
             windowHeight: window.innerHeight,
        }
    },
     mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        getSelectedCategoryName(name) {
            this.$emit('selected-category-name', name);
            this.closeModal();
        }
    }
}
</script>