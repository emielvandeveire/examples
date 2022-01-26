<template>
  <div>
    <!-- <div v-once> -->
      <h1 style="margin-bottom: 20px;">{{ playlists[0].userName }}</h1>
    <!-- </div> -->
    <div v-if="playlists">
      <h2>Videos</h2>
      <ListView :playlists="playlists" />
    </div>

    <div v-if="posts">
      <h2>Posts</h2>
      <PostView :playlists="posts" />
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";
import PostView from "@/components/PostView.vue";

export default {
  props: ["userId"],
  setup(props) {
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      props.userId,
    ]);
    const username = playlists.value
    console.log(username)
    const { documents: posts } = getCollection("posts", [
      "userId",
      "==",
      props.userId,
    ]);
    return {
      playlists,
      posts,
    };
  },
  components: {
    ListView,
    PostView
  },
};
</script>

<style scoped>
h1 {
  border-bottom: 1px solid var(--secondary);
}
</style>
