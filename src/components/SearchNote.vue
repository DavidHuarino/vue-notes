<template>
    <div class="mb-5">
        <span class="absolute p-3"><font-awesome-icon :icon="['fas', 'search']"/></span>
        <input class="w-full py-3 pl-10 pr-3 rounded focus:outline-none" type="search" placeholder="search your notes">
    </div>
</template>
<script>
export default {
    name: 'SearchNote'
}
</script>