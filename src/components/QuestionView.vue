<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{ name: 'QuestionDetails', params: { qid: playlist.id } }">
      <div class="single">
        <div class="info">
          <div class="user-info">
            <h3>{{ playlist.title }}</h3>
            <p>created by {{ playlist.userName }}</p>
          </div>

          <div class="icon">
            <span class="material-icons">help</span>
          </div>
          <div class="song-number">
            <div
              class="songs-length-container"
              v-if="playlist.songs.length == 1"
            >
              <p>{{ playlist.songs.length }} comment</p>
            </div>
            <div class="songs-length-container" v-else>
              <p>{{ playlist.songs.length }} comments</p>
            </div>
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
