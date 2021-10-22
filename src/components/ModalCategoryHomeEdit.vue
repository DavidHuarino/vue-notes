<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute p-3 sm:w-3/5 sm:max-w-sm sm:m-auto">
            <div class="bg-gray-200 w-full text-center relative h-40 rounded-lg">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl mb-2 text-center">Editar categoría</h2>
                <div class="flex flex-col">
                    <input type="text" class=" w-3/4 p-2 m-auto mb-2 rounded-xl focus:outline-none" placeholder="Escriba la categoria" :value="categoryNameEdit" @change="$emit('update:categoryNameEdit', $event.target.value)">
                    <div>
                        <button type="submit" class="bg-blue-400 active:bg-blue-700 focus:outline-none py-1 px-4 text-white rounded-md" @click="editCategoryName()">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'ModalCategoryHomeEdit',
    props: {
        categoryNameEdit: {
            type: String,
            required: true,
            default: ''
        },
        categoryIdEdit: {
            type: String,
            required: true,
            default: ''
        },
        categoryNameEditTemp: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            // categoryTemp: null
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        async editCategoryName() {
            console.log(this.categoryNameEditTemp, this.categoryNameEdit, "waa");
            let updateCategoryName = this.capitalizeCategoryName(this.categoryNameEdit);
            if (this.seenCategory(this.categoryNameEditTemp, updateCategoryName)) {
                this.$toast.info('Categoría ya registrada');
            } else{
                this.closeModal();
                await this.$store.dispatch('category/updateCategoryNameById', {
                    newCategoryName: updateCategoryName,
                    categoryId: this.categoryIdEdit
                });
                this.$toast.success('Categoría actualizada');
            }
        }
    },
    computed: {
        categoryName() {
            return this.categoryNameEdit;
        },
        capitalizeCategoryName() {
            return name => {
                return name.charAt(0).toUpperCase() + name.slice(1);
            }
        },
        seenCategory() {
            return (currentName, searchName) => {
                return this.$store.getters['category/seenCategoryNameExceptCurrentName'](currentName, searchName);
            }
        }
    }
}
</script>