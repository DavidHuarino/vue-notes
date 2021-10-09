<template>
    <div class="mb-3">
        <span class="absolute p-3"><font-awesome-icon :icon="['fas', 'search']"/></span>
        <input class="w-full py-3 pl-10 pr-3 rounded focus:outline-none" type="search" placeholder="search your notes" v-model="filter">
    </div>
</template>
<script>
export default {
    name: 'SearchNote',
    computed: {
        filter: {
            get() {
                return this.$store.state.searchWord;
            },
            set(value) {
                this.$store.dispatch('notes/getWordToSearch', {
                    searchWord: value
                });
            }
        }
    }
}
</script>