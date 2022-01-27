<template>
  <div class="home">
    <div class="page-link-container">
      <div v-if="currentRouteName == 'Home'" class="page-link active-link">
        Videos
      </div>
      <router-link :to="{ name: 'PostPlaylists' }" class="page-link"
        >Posts</router-link
      >
      <!-- <router-link
        :to="{ name: 'Questions', params: { tagTitle: 'test' } }"
        class="page-link"
      >
        Questions
      </router-link> -->
    </div>
    <h2 class="h2-border">Video Examples</h2>
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a New Example</router-link
    >
  </div>
</template>

<script>
import ListView from "../components/ListView.vue";
import getCollection from "../composables/getCollection";
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "Home",
  components: { ListView },
  setup() {
    const { error, documents } = getCollection("playlists");
    const route = useRoute();
    const currentRouteName = computed(() => {
      return route.name;
    });
    return { error, documents, currentRouteName };
  },
};
</script>

<style>
.page-link {
  background: var(--secondary);
  border-radius: 8px;
  border: 0;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
  margin: 5px;
}
.active-link {
  background: var(--primary);
  color: white;
}
.page-link-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
