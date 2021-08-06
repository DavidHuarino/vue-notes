<template>
  <div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Highlight from '@tiptap/extension-highlight'
export default {
  name: 'Editor',
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      //editor: null,
    }
  },

  watch: {
    value(value) {
      // HTML
      //const isSame = this.editor.getHTML() === value
      
      const isSame = this.editor.getHTML() === value;
      // JSON
      // const isSame = this.editor.getJSON().toString() === value.toString()

      if (isSame) {
        return
      }

      //this.editor.commands.setContent(this.value, false)
      this.editor.commands.setContent(this.value, false);
    },
  },
  created() {
    const customImage = Image.extend({
      addAttributes() {
        return {
          ...this.parent?.(),
          fileName: {
            default: null,
            rendered: false
          }
        }
      }
    });
    const createEditor = new Editor({
      editorProps: {
        attributes: {
          class: ''
        }
      },
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "Ingrese el contenido de la nota aqui",
        }),
        Document,
        Paragraph,
        Text,
        customImage,
        Dropcursor,
        Highlight
      ],
      content: this.value,
      autofocus: true,
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        //this.$emit('input', this.editor.getJSON())
      },
    });
    this.setContentToEditor(createEditor);
  },
  methods: {
    setContentToEditor(editor) {
      this.$store.dispatch('addEditorToState', editor);
    }
  },
  computed: {
    editor() {
      return this.$store.getters.getEditor;
    }
  },
  beforeDestroy() {
    //this.editor.destroy()
    this.editor.destroy();
  }
}
</script>
<style>
  .ProseMirror:focus {
    outline: none;
  }
  /* Placeholder (at the top) */
  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #A9A9A9;
    pointer-events: none;
    height: 0;
  }
</style>