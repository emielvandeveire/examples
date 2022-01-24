<template>
  <div>
    <button
      class="fa fa-bold"
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleBold()
          .run()
      "
    />
    <button
      class="fa fa-italic"
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleItalic()
          .run()
      "
    />
    <button
      class="fa fa-code"
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleCode()
          .run()
      "
    />
    <editor-content id="editor" class="content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
button {
  margin: 0 5px;
}
</style>
