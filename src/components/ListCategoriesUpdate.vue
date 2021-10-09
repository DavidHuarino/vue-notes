<template>
    <div class="grid grid-cols-3 gap-3 p-3 overflow-y-auto h-32 mt-2">
        <div v-for="(category, index) in categoryList" :key="index" class="bg-blue-400 rounded">
            <p class="font-ubuntu text-base font-normal cursor-pointer p-1 rounded truncate" @click="selectedCategoryByName(category.name, index)" :class="{'is-select': selected == index}">{{ category.name }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ListCategoriesUpdate',
    props: {
        categoryList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            // selected: -1
        }
    },
    mounted() {
        this.$store.dispatch('category/updatedSelectedCategory', {
            newCategory: this.note.selectedCategory
        });
    },
    methods: {
        selectedCategoryByName(name, index) {
            try {
                this.selected = index;
                this.$store.dispatch('category/updatedSelectedCategory', {
                    newCategory: name
                });
            } catch (error) {
                console.error(error.message);
            }
        },
    },
    computed: {
        selected: {
            get() {
                let nameCategory = this.$store.getters['category/getSelectedCategory'];
                return this.$store.getters['category/getIndexByName'](nameCategory);
            },
            set(newValue) {
                return this.$store.dispatch('category/updatedSelectedCategory', {
                    newCategory: this.categoryList[newValue]
                });
            }
        },
        note() {
            return this.$store.getters['notes/getNoteUpdate'];
        }
    }
}
</script>
<style>
    .is-select {
        @apply ring-2 ring-gray-600;
    }
</style>