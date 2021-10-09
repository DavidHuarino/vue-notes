<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-end absolute">
            <div class="bg-gray-200 w-full text-center relative h-60 rounded-t-lg">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl mb-2">Categorias</h2>
                <form @submit.prevent="createCategory" class="space-x-2">
                    <input class="p-1 focus:outline-none focus:ring focus:border-blue-300" type="text" placeholder="Ingrese su categoria" v-model="newCategory">
                    <button class="bg-blue-400 rounded p-1 focus:outline-none text-white disabled:opacity-50" type="submit" :disabled="newCategory.length === 0">Añadir</button>
                </form>
                <categories-list-update :categoryList="categoryList" />
            </div>
        </div>
    </transition>
</template>
<script>
import ListCategoriesUpdate from './ListCategoriesUpdate.vue';
export default {
    name: 'ModalCategoryUpdate',
    components: {
        'categories-list-update': ListCategoriesUpdate
    },
    data() {
        return {
            newCategory: ''
        }
    },
    created() {
        this.getCategories();
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        getCategories() {
            try {
                this.$store.dispatch('category/getCategories');
            } catch (error) {
                console.error(error.message);
            }
        },
        async createCategory() {
            try {
                if (this.seenCategory) {
                    console.log("categoria registrada");
                } else {
                    const newName = this.capitalizeCategoryName(this.newCategory);
                    await this.$store.dispatch('category/addCategory', {
                        name: newName,
                    });
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                this.newCategory = '';
            }
        },
        capitalizeCategoryName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    },
    computed: {
        categoryList() {
            return this.$store.getters['category/categories'];
        },
        seenCategory() {
            let category = this.capitalizeCategoryName(this.newCategory);
            return this.$store.getters['category/seenCategoryName'](category);
        }
    }
}
</script>