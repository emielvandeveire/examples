<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div>
      <VideoPlayer :playlist="playlist" />
      <!-- song list -->
      <div class="song-list">
        <div v-if="!playlist.songs.length">
          No comments have been added yet.
        </div>
        <div v-for="song in playlist.songs" :key="song.id" class="single-song">
          <div class="details">
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
          <button v-if="ownership" @click="handleClick(song.id)">delete</button>
        </div>
        <AddSong :playlist="playlist" />
      </div>
    </div>

    <!-- playlist information -->
    <div class="playlist-info">
      <!-- <div class="video">
        <video width="600" controls :src="playlist.videoUrl"></video>
      </div> -->
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>

      <div v-if="playlist.description">
        <h3>Description</h3>
        <p class="description">{{ playlist.description }}</p>
      </div>
      <div v-if="playlist.description2">
        <h3>Second Description</h3>
        <p class="description">{{ playlist.description2 }}</p>
      </div>
      <h3 v-if="playlist.links.length">Links</h3>
      <div v-for="link in playlist.links" :key="link.id">
        <h4>{{ link.linkTitle }}</h4>
        <a class="link-container" :href="link.link"
          ><div class="material-icons link-icon icon">
            &#xe157;
          </div>
          <p>{{ link.link }}</p></a
        >
      </div>
      <h3 v-if="playlist.tags.length">Tags</h3>
      <div class="tag-container">
        <div v-for="tag in playlist.tags" :key="tag.id">
          <div class="tag">{{ tag.tagTitle }}</div>
        </div>
      </div>
      <div
        v-if="playlist.preparations.length"
        class="preparation-container-div"
      >
        <h3>What you will learn</h3>
        <ul class="preparation-container">
          <li
            v-for="preparation in playlist.preparations"
            :key="preparation.id"
          >
            <p class="preparation">{{ preparation.preparationTitle }}</p>
          </li>
        </ul>
      </div>

      <button class="warning" v-if="ownership" @click="handleDelete">
        Delete Playlist
      </button>
    </div>
  </div>
</template>

<script>
import AddSong from "@/components/AddSong.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  components: { AddSong, VideoPlayer },
  setup(props) {
    const { error, document: playlist } = getDocument("playlists", props.id);
    const { user } = getUser();
    const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
    const { deleteImage } = useStorage();
    const router = useRouter();

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    const handleDelete = async () => {
      await deleteDoc();
      await deleteImage(playlist.value.filePath);
      router.push({ name: "Home" });
    };

    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id != id);
      await updateDoc({ songs });
    };

    return { error, playlist, ownership, handleDelete, handleClick };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}

.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
div h3,
div h4,
.link-link {
  text-align: start;
}
div h3 {
  margin-top: 15px;
}
div h4 {
  margin-top: 5px;
}
div a p {
  text-align: start;
  color: #999;
}
.link-container {
  display: flex;
  gap: 5px;
}
.link-icon {
  color: #999;
}
li {
  text-align: start;
  margin: 0;
}
</style>
