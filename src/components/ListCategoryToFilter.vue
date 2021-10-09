<template>
    <div class="space-x-3 overflow-x-auto flex p-2">
        <button v-for="(category, index) in categories" :key="index" class="bg-blue-400">
            {{ category.name }}
        </button>
    </div>
</template>
<script>
export default {
    name: 'ListCategoryToFilter',
    props: {
        categories: {
            type: Array,
            required: true
        }
    }
}
</script>