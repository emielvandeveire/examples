<template>
  <div class="post-playlists">
    <div class="page-link-container">
      <router-link :to="{ name: 'Home' }" class="page-link">
        Videos
      </router-link>
      <router-link :to="{ name: 'PostPlaylists' }" class="page-link"
        >Posts</router-link
      >
      <div class="page-link active-link">
        Questions
      </div>
    </div>
    <h2 class="h2-border">Questions</h2>
    <input type="text" placeholder="Search..." v-model="searchQuery" />
    <div v-if="searchedVideos">
      <QuestionView :playlists="searchedVideos" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a New Example</router-link
    >
  </div>
</template>

<script>
import firebase from "firebase";
import QuestionView from "@/components/QuestionView";
import { computed, onMounted, reactive, ref } from "vue";

export default {
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
          .collection("questions")
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
