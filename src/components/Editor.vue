<template>
  <!-- <div>
    <button
      class="fa fa-bold"
      @click.prevent.prevent="
        editor
          .chain()
          .focus()
          .toggleBold()
          .run()
      "
    />
    <button
      class="fa fa-italic"
      @click.prevent.prevent="
        editor
          .chain()
          .focus()
          .toggleItalic()
          .run()
      "
    />
    <button
      class="fa fa-h1"
      @click.prevent="editor.commands.toggleHeading({ level: 1 })"
    />
    <button
      class="fa fa-h2"
      @click.prevent="editor.commands.toggleHeading({ level: 2 })"
    />
    <button
      class="fa fa-h3"
      @click.prevent="editor.commands.toggleHeading({ level: 3 })"
    />
    <button
      class="fa fa-h4"
      @click.prevent="editor.commands.toggleHeading({ level: 4 })"
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
    <editor-content class="content" :editor="editor" />
  </div> -->
  <div class="grid-container" v-if="editor">
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
      class="fa fa-strikethrough"
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleStrike()
          .run()
      "
    />

    <button
      class="fa fa-code"
      @click.prevent.prevent="
        editor
          .chain()
          .focus()
          .toggleCode()
          .run()
      "
    />

    <button
      class="fa fa-file-code"
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleCodeBlock()
          .run()
      "
      :class="{ 'is-active': editor.isActive('codeBlock') }"
    />

    <button
      class="fa fa-remove-format"
      @click.prevent="
        editor
          .chain()
          .focus()
          .unsetAllMarks()
          .run()
      "
    />

    <!-- <button
      class="fa fa-window-close"
      @click.prevent="
        editor
          .chain()
          .focus()
          .clearNodes()
          .run()
      "
    /> -->

    <button
      class="fa fa-paragraph"
      @click.prevent="
        editor
          .chain()
          .focus()
          .setParagraph()
          .run()
      "
      :class="{ 'is-active': editor.isActive('paragraph') }"
    />

    <button
      class="fa fa-list-ul"
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleBulletList()
          .run()
      "
      :class="{ 'is-active': editor.isActive('bulletList') }"
    />

    <button
      class="fa fa-list-ol"
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleOrderedList()
          .run()
      "
      :class="{ 'is-active': editor.isActive('orderedList') }"
    />

    <button
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 1 })
          .run()
      "
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      H1
    </button>

    <button
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 2 })
          .run()
      "
    >
      H2
    </button>

    <button
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 3 })
          .run()
      "
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
    >
      H3
    </button>

    <button
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 4 })
          .run()
      "
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
    >
      H4
    </button>

    <button
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 5 })
          .run()
      "
      :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
    >
      H5
    </button>

    <button
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 6 })
          .run()
      "
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
    >
      H6
    </button>

    <button
      class="fa fa-quote-right"
      @click.prevent="
        editor
          .chain()
          .focus()
          .toggleBlockquote()
          .run()
      "
      :class="{ 'is-active': editor.isActive('blockquote') }"
    />

    <button
      class="fa fa-horizontal-rule"
      @click.prevent="
        editor
          .chain()
          .focus()
          .setHorizontalRule()
          .run()
      "
    />

    <button
      class="fa fa-page-break"
      @click.prevent="
        editor
          .chain()
          .focus()
          .setHardBreak()
          .run()
      "
    />

    <!-- <button
      class="fa fa-undo"
      @click.prevent="
        editor
          .chain()
          .focus()
          .undo()
          .run()
      "
    />

    <button
      class="fa fa-redo"
      @click.prevent="
        editor
          .chain()
          .focus()
          .redo()
          .run()
      "
    /> -->
  </div>
  <editor-content :editor="editor" />
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
  padding: 0;
  margin: 0;
  height: 40px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 5px;
}
</style>
