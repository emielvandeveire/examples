<template>
  <div class="ui cards" style="margin: 10px">
    <div class="ui icon input" style="width: 100%">
      <input type="text" placeholder="Search..." v-model="searchQuery" />
    </div>
    <div v-if="searchQuery">
      <h2 class="h2-border">Videos</h2>
      <ListView :playlists="searchedVideos" />
      <div class="error" v-if="!searchedVideos.length">
        there are no videos with this search
      </div>

      <h2 class="h2-border">Posts</h2>
      <PostView v-if="searchedPosts.length" :playlists="searchedPosts" />
      <div class="error" v-else>
        there are no posts with this search
      </div>

      <h2 class="h2-border">Questions</h2>
      <QuestionView
        v-if="searchedQuestions.length"
        :playlists="searchedQuestions"
      />
      <div class="error" v-else>
        there are no questions with this search
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import ListView from "@/components/ListView";
import PostView from "@/components/PostView";
import QuestionView from "@/components/QuestionView";
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
  },
};
</script>
