<template>
    <div class="square-container">
        <div v-for="objectTodo in currentProperties" :key="objectTodo.noteId" class="square rounded-lg bg-gray-400">
            <div class="content p-2">
                <!-- <button class="absolute left-0 top-0 ml-1 focus:outline-none p-1" @click.stop="updateFavoriteNote(objectNote.noteId, objectNote.favoriteNote)"><font-awesome-icon class="text-base text-black" :class="{'background-text-favorite-note': objectNote.favoriteNote}" :icon="['fas', 'star']"/></button> -->
                <router-link :to="{name: 'updateTodo', params: {id: objectTodo.todoId}}" class="w-full h-full flex items-center justify-center">
                    <h2 v-if="objectTodo.title.length > 0" class="truncate">{{objectTodo.title}}</h2>
                    <h2 v-else>Sin titulo</h2>
                    <div class="absolute inset-x-0 bottom-0 text-sm w-11/12 text-right pt-1">
                        {{getDate(objectTodo.createdAt)}}
                    </div>
                </router-link>
            </div>
            <!-- <button class="bg-gray-500 text-white p-1 " @click="removeNote(objectNote.noteId, objectNote.directoryName)">Remove <font-awesome-icon class="text-base" :icon="['fas', 'trash']"/></button> -->
            <!-- <button class="bg-gray-500 text-white p-1 focus:outline-none" @click="getObjectNote(objectNote)">Remove <font-awesome-icon class="text-base" :icon="['fas', 'trash']"/></button> -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'ListTodos',
    props: {
        currentProperties: {
            type: Array,
            required: true
        }
    },
    computed: {
        getDate() {
            return date => {
                return date.split(',')[0];
            }
        }
    }
}
</script>
<style scoped>
    .square-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
        grid-gap: 10px;
    }

    .square {
        /* background: cadetblue; */
        padding-top: 100%; /* padding trick directly on the grid item */
        box-sizing: border-box;
        position: relative;
    }

    .square .content { /* absolutely positioned */
        position: absolute;
        top: 0;
        right:0;
        left: 0;
        bottom: 0;
    }
</style>