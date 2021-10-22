<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute p-3 sm:w-3/5 sm:max-w-sm sm:m-auto">
            <div class="bg-gray-200 w-full relative h-4/5 rounded-lg text-left">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl mb-2 text-center">Categoría</h2>
                <section class="px-3 py-1 overflow-y-auto" v-if="categories.length > 0" :style="{'height': `calc(${windowHeight}px - 260px)`}">
                    <div class="my-2 p-1 flex border-b-2 border-blue-400">
                        <div @click="getAllNotes()" class="w-full cursor-pointer">Todas</div>
                    </div>
                    <div v-for="(category, index) in categories" :key="index" class="my-2 p-1 flex border-b-2 border-blue-400">
                        <div @click="sendCategoryName(category.name)" class="w-full cursor-pointer truncate pr-3">{{category.name}}</div>
                        <div class="flex space-x-4">
                            <button class="focus:outline-none" @click="getCategoryNameEdit(category.name, category.categoryId)"><font-awesome-icon class="text-xl text-black" :icon="['fas', 'pencil-alt']"/></button>
                            <button class="focus:outline-none" @click="countNotesByCategory(category.name, category.categoryId)"><font-awesome-icon class="text-xl text-black" :icon="['fas', 'trash-alt']"/></button>
                        </div>
                    </div>
                </section>
                <section v-else class="text-center">
                    No hay categorias
                </section>
                <section class="absolute inset-x-0 bottom-0 flex justify-center mb-3">
                    <button @click="openModalCategoryCreate()" class="focus:outline-none bg-blue-400 px-4 py-1 text-white rounded-md">
                        Añadir
                    </button>
                </section>
            </div>
        </div>
    </transition>
    <!-- <modal-category-home-edit v-show="modalCategoryEdit" @close-modal="modalCategoryEdit=false" :categoryNameEdit="categoryNameEdit" /> -->
</template>
<script>
// import ModalCategoryHomeEdit from '../components/ModalCategoryHomeEdit.vue';
export default {
    name: 'ModalCategoryHome',
    components: {
        // 'modal-category-home-edit': ModalCategoryHomeEdit
    },
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
        getAllNotes() {
            this.$store.dispatch('notes/setAllNotesToFilteredNotes');
            this.$store.dispatch('todos/setAllTodosToFilteredTodos');
            this.$emit('emit-category-all');
            this.closeModal();
        },
        openModalCategoryCreate() {
            this.$emit('open-modal-category-create'); 
        },
        closeModal() {
            this.$emit('close-modal-category');
        },
        sendCategoryName(name) {
            this.$emit('emit-category-name', name);
            this.closeModal();
        },
        getCategoryNameEdit(categoryName, categoryId) {
            let objectCategory = { categoryName, categoryId };
            this.$emit('category-name-id', objectCategory);
        },
        async countNotesByCategory(name, categoryId) {
            let countNotes = this.$store.getters['notes/countNotesByCategory'](name);
            let countTodos = this.$store.getters['todos/countTodosByCategory'](name);
            console.log(countNotes, "count", categoryId);
            if (countNotes + countTodos > 0) {
                this.$toast.info('Esta categoría aun tiene notas');
                return 
            }
            await this.$store.dispatch('category/removeCategory', {
                id: categoryId
            });
            this.$toast.success('Categoria removida');
        }
        // filterSelectedCategory(categoryName) {
        //     console.log(categoryName);
        //     //this.categoryName = categoryName;
        //     const arr = this.notesByCategoryName(categoryName);
        //     console.log(arr);
        //     this.closeModal();
        // }
    },
    computed: {
        // notesByCategoryName() {
        //     return categoryName => {
        //         return this.$store.getters['notes/filterNotesByCategory'](categoryName);   
        //     }
        // }
    }
}
</script>