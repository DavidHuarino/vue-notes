<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute p-3">
            <div class="bg-gray-200 w-full text-center relative h-40 rounded-lg">
                <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button>
                <h2 class="text-xl mb-2 text-center">Eliminar Categoría</h2>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'ModalCategoryHomeDelete'
}
</script>