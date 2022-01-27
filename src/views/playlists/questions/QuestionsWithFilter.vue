<template>
  <div class="post-playlists">
    <div class="page-link-container">
      <router-link :to="{ name: 'Home' }" class="page-link">
        Videos
      </router-link>
      <router-link :to="{ name: 'PostPlaylists' }" class="page-link"
        >Posts</router-link
      >
      <div class="page-link active-link">Questions</div>
    </div>
    <h2 class="h2-border">Questions with tag '{{ tagTitle }}'</h2>
    <div v-if="playlists">
      <QuestionView :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a New Example</router-link
    >
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import QuestionView from "@/components/QuestionView";

export default {
  props: ["tagTitle"],
  setup(props) {
    const { documents: playlists } = getCollection("questions", [
        "tags",
        "array-contains-any",
        [{ tagTitle: props.tagTitle }],
    ]);
    const tagTitle = props.tagTitle

    return { playlists, tagTitle };
  },
  components: {
    QuestionView,
  },
};
</script>

<style>
.btn {
  margin-top: 20px;
}
.h2-border {
  border-bottom: 1px solid var(--secondary);
}
</style>
