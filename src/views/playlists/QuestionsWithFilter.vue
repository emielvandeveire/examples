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
    <h2 class="h2-border">Questions</h2>
    <div v-if="playlists">
      <PostView :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a New Example</router-link
    >
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import PostView from "@/components/PostView";

export default {
  props: ["tagTitle"],
  setup(props) {
    const { documents: playlists } = getCollection("questions", [
        "tags",
        "array-contains-any",
        [{ tagTitle: props.tagTitle }],
    ]);

    return { playlists };
  },
  components: {
    PostView,
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
