<template>
  <!--
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>-->
  <div class="text-center my-6">
    <button class="p-3 bg-blue-600 text-white" @click="logOut()">Log Out</button>
    <p>Bienvenido {{currentUser.displayName}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  methods: {
    async logOut() {
      try {
        await this.$store.dispatch('doLogOut');
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
