<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute p-3">
            <div class="bg-gray-200 w-11/12 relative h-4/5 rounded-lg text-left">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl mb-2 text-center">Categorías</h2>
                <section class="px-3 py-1">
                    <div v-for="(objectCategory, index) in categories" :key="index" class="my-2 p-1 border-b-2 border-blue-400" @click="getSelectedCategoryName(objectCategory.name)">
                        {{objectCategory.name}}
                    </div>
                </section>
                <!-- <section class="px-3 py-1" v-if="categories.length > 0">
                    <div v-for="(category, index) in categories" :key="index" class="my-2 p-1 flex border-b-2 border-blue-400">
                        <div @click="sendCategoryName(category.name)" class="w-full cursor-pointer">{{category.name}}</div>
                        <div class="flex space-x-4">
                            <button class="focus:outline-none" @click="getCategoryNameEdit(category.name, category.categoryId)"><font-awesome-icon class="text-xl text-black" :icon="['fas', 'pencil-alt']"/></button>
                            <button class="focus:outline-none" @click="countNotesByCategory(category.name, category.categoryId)"><font-awesome-icon class="text-xl text-black" :icon="['fas', 'trash-alt']"/></button>
                        </div>
                    </div>
                </section>
                <section v-else class="text-center">
                    No hay categorias
                </section> -->
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