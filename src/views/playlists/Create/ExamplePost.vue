<template>
  <form >
    <editor v-model="postContent" />
    <button @click.prevent="handleSubmit">Submit</button>
    <pre><code>{{ postContent }}</code></pre>
  </form>
</template>

<script>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import useCollection from "@/composables/useCollection";
import StarterKit from "@tiptap/starter-kit";
import { ref } from "@vue/reactivity";
import Editor from "@/components/Editor.vue"

export default {
  components: {
    Editor,
  },

  setup() {
    const postContent = ref("");
    // const { addDoc } = useCollection("playlists");

    const handleSubmit = async () => {
      console.log(postContent)
    };

    return {
      postContent,
      handleSubmit,
    };
  },
};
</script>
