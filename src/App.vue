<template>
  <div id="app" class="sm:w-3/5 sm:max-w-sm sm:m-auto">
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    -->
    <transition name="fade-route" mode="out-in" appear>
      <router-view/>
    </transition>
  </div>
</template>

<style>
.fade-route-enter-active, .fade-route-leave-active {
  transition: opacity .2s ease
}

.fade-route-enter, .fade-route-leave-active {
  opacity: 0
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
