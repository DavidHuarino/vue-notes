<template>
  <div>
      {{content}}
    <p
      v-for="(value, index) in content"
      :id="`content-${index}`"
      :key="index"
      contenteditable
      @input="event => onInput(event, index)"
      @keyup.delete="onRemove(index)"
    />
    {{test}}
    <div v-html="test"
      contenteditable="true"
        >
    </div>
    <img src="../assets/logo.png" alt="">
  </div>
</template>

<script>
export default {
    name: 'Test',
  data() {
    return {
      content: [
        { value: 'paragraph 1' },
        { value: 'paragraph 2' },
        { value: 'paragraph 3' },
      ],
      //test: "<img src='https://i.blogs.es/aa1b9a/luna-100mpx/450_1000.jpg'>",
      test: "<p>hola</p>",
    };
  },
  mounted() {
    this.updateAllContent();
    console.log(this.$el.innerHTML, "gaa");
  },
  methods: {
    onInput(event, index) {
      const value = event.target.innerText;
      console.log(value, "updated", value.length)
      if (value.length > 0) {
        this.content[index].value = '<p>' + value + '</p>';
      } else {
        this.content[index].value = value;
      }
    },
    onRemove(index) {
      if (this.content.length > 1 && this.content[index].value.length === 0) {
        this.$delete(this.content, index);
        this.updateAllContent();
      }
    },
    updateAllContent() {
      this.content.forEach((c, index) => {
        const el = document.getElementById(`content-${index}`);
        el.innerText = c.value;
      });
    },
  },
};
</script>