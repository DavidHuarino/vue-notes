<template>
    <div>
        <transition name="fade">
            <div v-if="showModalColor" class="bg-black inset-0 bg-opacity-50 flex justify-center items-end absolute">
                <div class="bg-gray-200 w-full text-center relative h-48">
                    <button @click="showModalColor=false"><font-awesome-icon class="text-black text-2xl top-2 right-1 absolute" :icon="['fas', 'times-circle']"/></button>
                    <h2 class="text-xl">Colors</h2>
                    <div class="grid grid-cols-5 p-3 choose">
                        <label :class="bg" v-for="(bg, index) in classesColor" :key="index" class="w-10 h-10 rounded-full">
                            <input type="radio" :value="bg" class="hidden" v-model="bgColorContainer"/>
                        </label>
                        <!--
                        <label class="bg-red-500 w-10 h-10 rounded-full">
                            <input type="radio" value="group1" class="hidden" v-model="selected"/>
                        </label>
                        <label class="bg-blue-500 w-10 h-10 rounded-full">
                            <input type="radio" value="group2" class="hidden" v-model="selected"/>
                        </label>
                        <label class="bg-green-500 w-10 h-10 rounded-full">
                            <input type="radio" value="group3" class="hidden" v-model="selected"/>
                        </label>-->
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'ModalColor'
}
</script>