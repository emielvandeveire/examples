<template>
  <div>
    <!-- <div v-once> -->
      <h2>{{ documents[0].userName }}</h2>
    <!-- </div> -->
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";

export default {
  props: ["userId"],
  setup(props) {
    const { documents } = getCollection("playlists", [
      "userId",
      "==",
      props.userId,
    ]);
    return {
      documents,
    };
  },
  components: {
    ListView,
  },
};
</script>

<style></style>
