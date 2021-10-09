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
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
//import { Extension } from '@tiptap/core'
//import { FontColor } from './font-color'
//import { FontColor } from '../editor/font-color.ts'
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
          },
          style: {
            default: 'width: 95%; margin: auto'
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
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        TextStyle,
        Underline,
        FontFamily,
        TaskList.configure({
          HTMLAttributes: {
            class: 'flex',
          }
        }),
        TaskItem.configure({
          HTMLAttributes: {
            class: ''
          }
        })
        //FontColor,
      ],
      content: this.value,
      autofocus: 'end',
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
      this.$store.dispatch('notes/addEditorToState', editor);
    }
  },
  computed: {
    editor() {
      return this.$store.getters['notes/getEditor'];
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
}
</script>
<style>
  .my-custom-list-ul {
    ul[data-type="taskList"] {
      display: flex;
    }
  }
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
  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;
    margin-left: 20px;
  }
  li {
    display: flex;
    align-items: center;
  }
  li  > label {
    flex: 0 0 auto;
    margin-right: 0.5rem;
  }
  input[type="checkbox"] {
    height: 20px;
    width: 20px;
    outline: none;
    cursor: pointer;
    @apply rounded-lg;
  }
</style>