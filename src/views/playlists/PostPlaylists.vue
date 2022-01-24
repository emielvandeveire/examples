<template>
  <div class="post-playlists">
    <h2>My Examples</h2>
    <div v-if="playlists">
      <div v-for="playlist in playlists" :key="playlist.id">
        <!-- <div v-html="playlist.content"></div> -->
        <div>{{ playlist.title }}</div>
      </div>
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a New Example</router-link
    >
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";

export default {
  setup() {
    const { documents: playlists } = getCollection("playlists", [
      "type",
      "==",
      "post",
    ]);
    console.log(playlists)
    return { playlists };
  },
};
</script>

<style>
h2 {
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--secondary);
}
.btn {
  margin-top: 20px;
}
</style>
