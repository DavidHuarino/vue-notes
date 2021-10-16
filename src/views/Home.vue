<template>
  <!--
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>-->
  <div class="w-full min-h-screen px-5 bg-gray-300 text-center">
    
    <button class="p-3 bg-blue-600 text-white" @click="logOut()">Log Out</button>
    <h1 class="text-2xl p-3">{{categoryTitle}}</h1>
    <!-- <div>
      wadafas
    </div> -->
    <p>{{ this.$store.getters['notes/getSearchWord'] }}</p>
    <search-note v-if="currentList === 'notes'" />
    <search-todo v-if="currentList === 'todos'" />
    <!-- <list-category-filter class="" :categories="categories" /> -->
    <section class="mb-2 flex">
      <button class="focus:outline-none w-full pb-1 mx-1" :class="{'border-b-2 border-gray-600': currentList === 'notes'}" @click="setCurrentListValue('notes')">Notas</button>
      <button class="focus:outline-none w-full pb-1 mx-1" :class="{'border-b-2 border-gray-600': currentList === 'todos'}" @click="setCurrentListValue('todos')">Tareas</button>
    </section>
    <component :is="selectedList" :currentProperties="currentProperties" />
    <!-- <notes-list :notes="notes" /> -->
    <!-- <todos-list /> -->
    <!--
    <a class="fixed bottom-5 right-5 bg-blue-400 w-14 h-14 rounded-full"></a>-->
    <!-- <router-link class="fixed bottom-5 right-5 bg-blue-400 w-14 h-14 rounded-full" :to="{name: 'createNote'}"><font-awesome-icon class="mt-4 text-2xl text-white" :icon="['fas', 'plus']"/></router-link> -->
    <footer-home @open-modal-category="modalCategory=true" @filter-favorite-note="categoryTitle='Favorite'" @open-modal-pick="modalPick=true" />
    <modal-category-home v-show="modalCategory" @close-modal-category="modalCategory=false" :categories="categories" @emit-category-name="getCategoryName" @category-name-id="getObjectCategory" @open-modal-category-create="modalCategoryCreate=true" @emit-category-all="categoryTitle='vueNotes'" />
    <!-- <modal-delete v-show="modalDelete" @close-modal-delete="modalDelete=false" /> -->
    <modal-category-home-delete v-show="modalCategoryDelete" />
    <modal-category-home-edit v-show="modalCategoryEdit" @close-modal="modalCategoryEdit=false" :categoryNameEdit.sync="categoryNameEdit" :categoryIdEdit.sync="categoryIdEdit" :categoryNameEditTemp="categoryNameEditTemp" />
    <modal-category-home-create v-show="modalCategoryCreate" @close-modal="modalCategoryCreate=false" />
    <modal-pick-editor v-show="modalPick" @close-modal-pick="modalPick=false" />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import SearchNote from '../components/SearchNote.vue';
import ListNotes from '../components/ListNotes.vue';
import SearchTodo from '../components/SearchTodo.vue';
// import ListCategoryToFilter from '../components/ListCategoryToFilter.vue'
import FooterHome from '../components/FooterHome.vue';
import ModalCategoryHome from '../components/ModalCategoryHome.vue';
// import ModalDelete from '../components/ModalDelete.vue'
import ModalCategoryHomeDelete from '../components/ModalCategoryHomeDelete.vue';
import ModalCategoryHomeEdit from '../components/ModalCategoryHomeEdit.vue';
import ModalCategoryHomeCreate from '../components/ModalCategoryHomeCreate.vue';
import ModalPick from '../components/ModalPick.vue';
import ListTodos from '../components/ListTodos.vue'
export default {
  name: 'Home',
  components: {
    'search-note': SearchNote,
    'search-todo': SearchTodo,
    'notes-list': ListNotes,
    // 'list-category-filter': ListCategoryToFilter,
    'footer-home': FooterHome,
    'modal-category-home': ModalCategoryHome,
    'modal-category-home-delete': ModalCategoryHomeDelete,
    'modal-category-home-edit': ModalCategoryHomeEdit,
    'modal-category-home-create': ModalCategoryHomeCreate,
    'modal-pick-editor': ModalPick,
    'todos-list': ListTodos
  },
  data() {
    return {
      modalCategory: false,
      selectedCategoryName: null,
      modalCategoryDelete: false,
      modalCategoryEdit: false,
      modalCategoryCreate: false,
      modalPick: false,
      categoryNameEdit: '',
      categoryIdEdit: '',
      categoryNameEditTemp: '',
      categoryTitle: 'vueNotes',
      // currentList: 'notes'
    }
  },
  created() {
    this.getNotes();
    this.getCategories();
    this.getTodos();
  },
  methods: {
    setCurrentListValue(value) {
      // if (value === 'notes') {
      //   this.$store.dispatch('notes/cleanSearchWord');
      // }
      this.$store.dispatch('todos/setCurrentListValue', {
        value
      });
    },
    getObjectCategory(object) {
      this.modalCategoryEdit = true;
      console.log('click', object, object.categoryName);
      this.categoryNameEdit = object.categoryName;
      this.categoryIdEdit = object.categoryId;
      this.categoryNameEditTemp = object.categoryName;
    },
    getCategoryName(name) {
      this.selectedCategoryName = name;
      this.categoryTitle = name;
      this.$store.dispatch('notes/getCategoryToFilterNotes', {
        categoryName: name
      });
    },
    async getTodos() {
      try {
        this.$store.dispatch('todos/getTodosById');
      } catch (error) {
        console.error(error.message);
      }
    },
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
    },
    getCategories() {
      try {
        this.$store.dispatch('category/getCategories');
      } catch (error) {
        console.error(error.message);
      }
    }
  },
  computed: {
    currentProperties() {
      if (this.selectedList === 'notes-list') {
        return this.notes;
      } else {
        return this.todos;
      }
    },
    selectedList() {
      return `${this.currentList}-list`;
    },
    currentUser() {
      return this.$store.getters.getUser;
    },
    categories() {
      return this.$store.getters['category/categories'];
    },
    notes() {
      return this.$store.getters['notes/getFilteredNotes'];
    },
    todos() {
      return this.$store.getters['todos/getFilteredTodos'];
    },
    currentList() {
      return this.$store.getters['todos/getCurrentList'];
    }
  }
  //components: {
  //  HelloWorld
  //}
}
</script>
