<template>
  <div>
    <input type="search" v-model="searchTerm" />
    <button @click="handleSearch">Search</button>
    <ListView :playlists="playlists" />
  </div>
</template>

<script>
import ListView from "@/components/ListView.vue";
import getCollection from "@/composables/getCollection";

import { ref, onMounted } from "vue";

export default {
  setup() {
    const searchTerm = ref("second video");
    // my getCollection composable is for filtering documents from a firestore collection
    const { documents: playlists } = getCollection("playlists", [
      "title",
      "==",
      searchTerm.value,
    ]);
    const handleSearch = async () => {
      // here I want to update the playlists value
    };
    return {
      searchTerm,
      playlists,
      handleSearch,
    };
  },
  components: {
    ListView,
  },
};
</script>

<style></style>
