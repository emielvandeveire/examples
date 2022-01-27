<template>
  <div class="ui cards" style="margin: 10px">
    <div class="ui icon input" style="width: 100%">
      <input type="text" placeholder="Search..." v-model="searchQuery" />
    </div>
    <h2>Test</h2>
    <ListView :playlists="searchedVideos" />
    <h2>Test</h2>
    <PostView :playlists="searchedPosts" />
    <h2>Test</h2>
    <QuestionView :playlists="searchedQuestions" />
  </div>
</template>

<script>
import firebase from "firebase";
import ListView from "@/components/ListView"
import PostView from "@/components/PostView"
import QuestionView from "@/components/QuestionView"
import { computed, onMounted, reactive, ref } from "vue";
export default {
  setup() {
    const videos = reactive([]);
    const posts = reactive([]);
    const questions = reactive([]);
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
    const searchedPosts = computed(() => {
      return posts.filter((product) => {
        return (
          product.title
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });
    const searchedQuestions = computed(() => {
      return questions.filter((product) => {
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
    onMounted(async () => {
      try {
        const productsSnap = await firebase
          .firestore()
          .collection("posts")
          .get();
        productsSnap.forEach((doc) => {
          let product = doc.data();
          product.id = doc.id;
          posts.push(product);
        });
      } catch (e) {
        console.log("Error Loading Products");
      }
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
          questions.push(product);
        });
      } catch (e) {
        console.log("Error Loading Products");
      }
    });
    return { searchedVideos, searchedPosts, searchedQuestions, searchQuery };
  },
  components: {
    ListView,
    PostView,
    QuestionView,
  }
};
</script>
