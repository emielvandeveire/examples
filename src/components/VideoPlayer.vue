<template>
  <div class="video">
    <video width="600" controls :src="playlist.videoUrl"></video>
  </div>
</template>

<script>
export default {
  props: ["playlist"],
}
</script>

<style></style>
