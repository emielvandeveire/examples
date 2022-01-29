<template>
  <form @submit.prevent="handleSubmit">
    <input placeholder="Question" type="text" required v-model="title" />
    <editor v-model="content" />
    <div class="extra-info">
      <!-- Tags -->
      <p>Tags</p>
      <HideOrShow @showTrue="wantTags = true" @showFalse="wantTags = false" />
      <div class="add-tag">
        <form v-if="wantTags" @submit.prevent="handleTagSubmit">
          <h4>Add Tag</h4>
          <input type="text" placeholder="Tag" v-model="tagTitle" />
          <button>Add tag</button>
        </form>
        <div class="tag-container">
          <div v-for="tag in tags" :key="tag.id">
            <div class="tag">{{ tag.tagTitle }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content"></div>
    <button v-if="!isPending">Ask</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import Editor from "@/components/Editor.vue";
import { timestamp } from "@/firebase/config";
import getUser from "@/composables/getUser";
import useCollection from "@/composables/useCollection";
import HideOrShow from "@/components/HideOrShow";
import { ref } from "vue";
export default {
  components: {
    Editor,
    HideOrShow,
  },

  setup() {
    const { addDoc } = useCollection("questions");
    const { user } = getUser();

    const content = ref("");
    const title = ref("");
    const isPending = ref(false);
    const tags = ref([]);
    const tagTitle = ref("");
    const wantTags = ref(false);

    const handleSubmit = async () => {
      isPending.value = true;
      if (title.value && content.value && content.value != "<p></p>") {
        const res = await addDoc({
          title: title.value,
          content: content.value,
          description: "",
          description2: "",
          links: [],
          codes: [],
          tags: tags.value,
          preparations: [],
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: "",
          videoUrl: "",
          coverFilePath: "",
          videoFilePath: "",
          songs: [],
          type: "post",
          createdAt: timestamp(),
          views: [],
        });
      }
      isPending.value = false;
      content.value = "";
      title.value = "";
      tags.value = [];
    };
    const handleTagSubmit = () => {
      const newTag = {
        tagTitle: tagTitle.value,
      };
      tagTitle.value = "";
      tags.value = [...tags.value, newTag];
      console.log(newTag);
      console.log(tags.value);
    };

    return {
      content,
      handleSubmit,
      isPending,
      title,
      wantTags,
      tags,
      tagTitle,
      handleTagSubmit,
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
blockquote {
  padding-left: 1rem;
  border-left: 2px solid var(--secondary);
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
ol, ul {
  padding-left: 15px;
}
</style>
