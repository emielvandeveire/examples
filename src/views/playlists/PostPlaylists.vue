<template>
  <div class="post-playlists">
    <div class="page-link-container">
      <router-link :to="{ name: 'Home' }" class="page-link">
        Videos
      </router-link>
      <div class="page-link active-link"
        >Posts</div
      >
    </div>
    <h2 class="h2-border">Post Examples</h2>
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
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const { documents: playlists } = getCollection("playlists", [
      "type",
      "==",
      "post",
    ]);
    const route = useRoute();
    const currentRouteName = computed(() => {
      return route.name;
    });

    return { playlists, currentRouteName };
  },
  components: {
    PostView,
    
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
.h2-border {
  border-bottom: 1px solid var(--secondary);
}
</style>
