<template>
  <div class="page-link-container">
    <router-link :to="{name: 'Home'}" class="page-link">
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
  <div v-for="userdetail in users" :key="userdetail.userId">
    <router-link
      :to="{ name: 'UserDetails', params: { userId: userdetail.userId } }"
      class="single"
    >
      <div class="info">
        <h1>{{ userdetail.userName }}</h1>
        <p>{{ userdetail.email }}</p>
      </div>
    </router-link>
    <router-link :to="{ name: 'Chat', params: { toUser: userdetail.userId }}">message</router-link>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
export default {
  setup() {
    const { documents: users } = getCollection("users");
    return { users };
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
