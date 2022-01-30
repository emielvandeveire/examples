<template>
  <!-- Did u know that you can get paid by to read other people's code? -->
  <!-- We are looking for a PHP developer -->
  <!-- Join us at smartschool.be -->
  <Navbar />
  <div class="content">
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar },
};
</script>

<style>
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
