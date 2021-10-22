<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute p-3 sm:w-3/5 sm:max-w-sm sm:m-auto">
            <div class="bg-gray-200 w-full text-center relative h-40 rounded-lg">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl mb-2 text-center">Crear categoría</h2>
                <div class="flex flex-col">
                    <input type="text" class=" w-3/4 p-2 m-auto mb-2 rounded-xl focus:outline-none" placeholder="Escriba la categoria" v-model="newCategory">
                    <div>
                        <button type="submit" class="bg-blue-400 active:bg-blue-700 focus:outline-none py-1 px-4 text-white rounded-md" @click="createCategory()">Crear</button>
                    </div>
                </div>
                <!-- <form @submit.prevent="createCategory" class="space-x-2">
                    <input class="p-1 focus:outline-none focus:ring focus:border-blue-300" type="text" placeholder="Ingrese su categoria" v-model="newCategory">
                    <button class="bg-blue-400 rounded p-1 focus:outline-none text-white disabled:opacity-50" type="submit" :disabled="newCategory.length === 0">Añadir</button>
                </form> -->
                <!-- <categories-list :categoryList="categoryList" /> -->
            </div>
        </div>
    </transition>
</template>
<script>
// import ListCategories from './ListCategories.vue';
export default {
    name: 'ModalCategoryHomeCreate',
    components: {
        // 'categories-list': ListCategories
    },
    data() {
        return {
            //categoryList: ['Colegio', 'Compras', 'Personal', 'Deportes', 'Economia'],
            newCategory: ''
        }
    },
    // created() {
    //     this.getCategories();
    // },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        // getCategories() {
        //     try {
        //         this.$store.dispatch('category/getCategories');
        //     } catch (error) {
        //         console.error(error.message);
        //     }
        // },
        async createCategory() {
            try {
                if (this.seenCategory) {
                    console.log("categoria registrada");
                    this.$toast.info('Categoría ya registrada');
                } else {
                    this.closeModal();
                    const newName = this.capitalizeCategoryName(this.newCategory);
                    await this.$store.dispatch('category/addCategory', {
                        name: newName,
                    });
                    this.$toast.success('Categoría creada');
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                this.newCategory = '';
            }
        },
        // capitalizeCategoryName(name) {
        //     return name.charAt(0).toUpperCase() + name.slice(1);
        // }
    },
    computed: {
        // categoryList() {
        //     return this.$store.getters['category/categories'];
        // },
        capitalizeCategoryName() {
            return name => {
                return name.charAt(0).toUpperCase() + name.slice(1);
            }
        },
        seenCategory() {
            let category = this.capitalizeCategoryName(this.newCategory);
            return this.$store.getters['category/seenCategoryName'](category);
        }
    }
}
</script>