<template>
  <div class="page-link-container">
    <router-link :to="{ name: 'Home' }" class="page-link">
      Videos
    </router-link>
    <router-link :to="{ name: 'PostPlaylists' }" class="page-link"
      >Posts</router-link
    >
    <router-link
      :to="{ name: 'Questions', params: { tagTitle: 'test' } }"
      class="page-link"
    >
      Questions
    </router-link>
    <div class="page-link active-link">
      Users
    </div>
  </div>
  <h2 class="h2-border">Users</h2>
  <input type="text" placeholder="Search..." v-model="searchQuery" />
  <UserView :playlists="searchedUsers" />
</template>

<script>
import firebase from "firebase";
import UserView from "@/components/UserView";
import { computed, onMounted, reactive, ref } from "vue";
export default {
  setup() {
    const users = reactive([]);
    const searchQuery = ref("");
    
    const searchedUsers = computed(() => {
      return users.filter((product) => {
        return (
          product.email
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });
    onMounted(async () => {
      try {
        const productsSnap = await firebase
          .firestore()
          .collection("users")
          .get();
        productsSnap.forEach((doc) => {
          let product = doc.data();
          product.id = doc.id;
          users.push(product);
        });
      } catch (e) {
        console.log("Error Loading Products");
      }
    });

    return { searchedUsers, searchQuery };
  },
  components: {
    UserView,
  },
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}
.info {
  margin: 0 30px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.song-number {
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.songs-length-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
