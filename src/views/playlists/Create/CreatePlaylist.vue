<template>
  <section>
    <form>
      <router-link :to="{ name: 'ExampleVideo' }"
        ><button>
          <span class="material-icons">
            play_circle_filled
          </span>
          <div>Video Example</div>
        </button></router-link
      >
      <router-link :to="{ name: 'ExamplePost' }"
        ><button>
          <span class="material-icons">
            post_add
          </span>
          <div>Post Example</div>
        </button></router-link
      >
    </form>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
button {
  margin: 5px;
}
button:hover div, button:hover span {
  color: white;
}
section {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 200px);
}
form {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  width: 400px;
  height: 100px;
}
</style>
