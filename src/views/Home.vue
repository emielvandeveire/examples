<template>
  <div class="home">
    <div class="page-link-container">
      <div class="page-link active-link">
        Videos
      </div>
      <router-link :to="{ name: 'PostPlaylists' }" class="page-link"
        >Posts</router-link
      >
      <router-link
        :to="{ name: 'Questions', params: { tagTitle: 'test' } }"
        class="page-link"
      >
        Questions
      </router-link>
    </div>
    <h2 class="h2-border">Video Examples</h2>
    <input type="text" placeholder="Search..." v-model="searchQuery" />
    
    <div v-if="searchedVideos">
      <ListView :playlists="searchedVideos" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a New Example</router-link
    >
  </div>
</template>

<script>
import firebase from "firebase";
import ListView from "../components/ListView.vue";

import { computed, onMounted, reactive, ref } from "vue";
export default {
  name: "Home",
  components: { ListView },
  setup() {
    const videos = reactive([]);
    const searchQuery = ref("");
    
    const searchedVideos = computed(() => {
      return videos.filter((product) => {
        return (
          product.title
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });
    onMounted(async () => {
      try {
        const productsSnap = await firebase
          .firestore()
          .collection("playlists")
          .get();
        productsSnap.forEach((doc) => {
          let product = doc.data();
          product.id = doc.id;
          videos.push(product);
        });
      } catch (e) {
        console.log("Error Loading Products");
      }
    });

    return { searchedVideos, searchQuery };
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
