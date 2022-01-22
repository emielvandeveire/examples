<template>
  <div>
    <router-link :to="{ name: 'ExampleVideo' }"
      ><button>Video Example</button></router-link
    >
    <router-link :to="{ name: 'ExamplePost' }"
      ><button>Post Example</button></router-link
    >
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>