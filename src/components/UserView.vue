<template>
  <!-- <div v-for="playlist in playlists" :key="playlist.id">
    <router-link
      :to="{ name: 'UserDetails', params: { userId: playlist.userId } }"
    >
      <div class="single">
        <div class="info">
          <div class="user-info">
            <p>created by {{ playlist.userName }}</p>
          </div>

          <div class="icon">
            <router-link
              class="material-icons"
              :to="{ name: 'Chat', params: { toUser: userdetail.userId } }"
              >message</router-link
            >
          </div>
        </div>
      </div>
    </router-link>
  </div> -->
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link
      :to="{ name: 'UserDetails', params: { userId: playlist.userId } }"
    >
      <div class="single">
        <div class="info">
          <div class="user-info">
            <h3>{{ playlist.userName }}</h3>
          </div>

          <div class="icon">
            <router-link
              class="material-icons"
              :to="{ name: 'Chat', params: { toUser: playlist.userId } }"
              >message</router-link
            >
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["playlists"],
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
