<template>
    <transition name="fade" mode="out-in" appear>
        <div class="bg-black inset-0 bg-opacity-50 flex justify-center items-center absolute z-10">
            <div class="bg-gray-200 w-full relative h-32 rounded-lg m-3 p-3">
                <!-- <button @click="closeModal()"><font-awesome-icon class="text-black text-2xl top-2 right-2 absolute" :icon="['fas', 'times-circle']"/></button> -->
                <h2 class="text-lg text-left text-black">Eliminar</h2>
                <p class="text-left text-gray-500">¿Seguro que desea mover la nota al cubo de basura?</p>
                <div class="flex justify-end">
                    <button class="text-blue-600 mr-3 text-sm focus:outline-none" @click="closeModal()">CANCELAR</button>
                    <button class="text-blue-600 text-sm focus:outline-none" @click="removeNote()">ACEPTAR</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'ModalDelete',
    props: {
        objectNote: {
            type: Object,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal-delete');
        },
        async removeNote() {
            this.closeModal();
            if (Object.entries(this.objectNote).length === 0) {
                this.$router.push({ name: 'Home' });
                // this.$toast.success('Nota Removida');
                this.$store.dispatch('notes/getWordToSearch', {
                    searchWord: ''
                });
                return
            }
            await this.$store.dispatch('notes/removeNote', this.objectNote.noteId);
            try {
                await this.$store.dispatch('images/removeItemsByDirectoryName', {
                    directoryName: this.objectNote.directoryName
                });
                this.$toast.success('Nota removida');
                this.$router.push({name: 'Home'});
                this.$store.dispatch('notes/getWordToSearch', {
                    searchWord: ''
                });
            } catch (error) {
                console.error(error.message);
            }
        }
    }
}
</script>