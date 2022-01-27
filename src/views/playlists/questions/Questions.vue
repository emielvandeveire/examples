<template>
  <div class="post-playlists">
    <div class="page-link-container">
      <router-link :to="{ name: 'Home' }" class="page-link">
        Videos
      </router-link>
      <div class="page-link active-link">Posts</div>
      <!-- <router-link
        :to="{ name: 'Questions', params: { tagTitle: 'test' } }"
        class="page-link"
      >
        Questions
      </router-link> -->
    </div>
    <h2 class="h2-border">Questions</h2>
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
  setup() {
    const { documents: playlists } = getCollection("questions");

    return { playlists };
  },
  components: {
    QuestionView,
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
