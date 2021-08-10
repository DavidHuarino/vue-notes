<template>
  <!--
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>-->
  <div class="w-full min-h-screen px-5 bg-gray-300 text-center">
    
    <button class="p-3 bg-blue-600 text-white" @click="logOut()">Log Out</button>
    <h1 class="text-2xl p-3">Notes</h1>
    <search-note />
    <notes-list />
    <!--
    <a class="fixed bottom-5 right-5 bg-blue-400 w-14 h-14 rounded-full"></a>-->
    <router-link class="fixed bottom-5 right-5 bg-blue-400 w-14 h-14 rounded-full" :to="{name: 'createNote'}"><font-awesome-icon class="mt-4 text-2xl text-white" :icon="['fas', 'plus']"/></router-link>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import SearchNote from '../components/SearchNote.vue'
import ListNotes from '../components/ListNotes.vue'
export default {
  name: 'Home',
  components: {
    'search-note': SearchNote,
    'notes-list': ListNotes
  },
  data() {
    return {

    }
  },
  created() {
    this.getNotes();
  },
  methods: {
    async getNotes() {
      try {
        this.$store.dispatch('notes/getNotesById');
      } catch (error) {
        console.error(error.message);
      }
    },
    async logOut() {
      try {
        await this.$store.dispatch('user/doLogOut');
        this.$router.push({name: 'Login'});
        console.log("saliste de la app");
      } catch (error) {
        console.error(error.message);
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.getUser;
    }
  }
  //components: {
  //  HelloWorld
  //}
}
</script>
