<template>
    <div class="mb-3">
        <span class="absolute p-3"><font-awesome-icon :icon="['fas', 'search']"/></span>
        <input class="w-full py-3 pl-10 pr-3 rounded focus:outline-none" type="search" placeholder="search your todos" v-model="filter">
    </div>
</template>
<script>
export default {
    name: 'SearchTodo',
    computed: {
        filter: {
            get() {
                return this.$store.getters['todos/getSearchWord'];
            },
            set(value) {
                this.$store.dispatch('todos/getWordToSearch', {
                    searchWord: value
                });
            }
        }
    }
}
</script>