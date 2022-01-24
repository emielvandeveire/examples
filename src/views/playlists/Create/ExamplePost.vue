<template>
  <form @submit.prevent="handleSubmit">
    <input placeholder="Title" type="text" required v-model="title" />
    <editor v-model="content" />

    <div class="content"></div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import Editor from "@/components/Editor.vue";
import { timestamp } from "@/firebase/config";
import useCollection from "@/composables/useCollection";
import { ref } from "vue";
export default {
  components: {
    Editor,
  },

  setup() {
    const { addDoc } = useCollection("playlists");

    const content = ref("");
    const title = ref("");
    const isPending = ref(false);
    // const handleSubmit = async () => {
    //   await addDoc({
    //     type: "post",
    //     content: content.value,
    //     title: "",
    //     description: "",
    //     description2: "",
    //     links: "",
    //     codes: "",
    //     tags: "",
    //     preparations: "",
    //     userId: "",
    //     userName: "",
    //     coverUrl: "",
    //     videoUrl: "",
    //     coverFilePath: "",
    //     videoFilePath: "",
    //     songs: [],
    //     createdAt: timestamp(),
    //   });
    //   content.value = "";
    // };
    const handleSubmit = async () => {
      isPending.value = true;
      const res = await addDoc({
        title: title.value,
        content: content.value,
        description: "",
        description2: "",
        links: [],
        codes: [],
        tags: [],
        preparations: [],
        userId: "CNU7H9n7rmMpH8MIuQwbhJ9hyk03",
        userName: "",
        coverUrl: "",
        videoUrl: "",
        coverFilePath: "",
        videoFilePath: "",
        songs: [],
        type: "post",
        createdAt: timestamp(),
      });
      isPending.value = false;
      content.value = "";
    };

    return {
      content,
      handleSubmit,
      isPending,
      title,
    };
  },
};
</script>

<style>
.ProseMirror {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  border: 1px solid var(--secondary);
  background: white;
}
.ProseMirror > * + * {
  margin-top: 0.75em;
}
.ProseMirror:focus {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  border: 1px solid var(--secondary);
  background: white;
  outline: none;
}
.ProseMirror code {
  background-color: rgba(97, 97, 97, 0.1);
  color: #616161;
}
.content {
  padding: 1rem 0 0;
}
.content h3 {
  margin: 1rem 0 0.5rem;
}
.content pre {
  border-radius: 5px;
  color: #333;
}
.content code {
  display: block;
  white-space: pre-wrap;
  font-size: 0.8rem;
  padding: 0.75rem 1rem;
  background-color: #e9ecef;
  color: #495057;
}
</style>
