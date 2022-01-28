<template>
  <section>
    <form>
      <router-link :to="{ name: 'ExampleVideo' }"
        ><button class="create">
          <div>Video</div>
          <span class="material-icons">
            play_circle
          </span>
        </button></router-link
      >
      <router-link :to="{ name: 'ExamplePost' }"
        ><button class="create">
          <div>Post</div>
          <span class="material-icons">
            post_add
          </span>
        </button></router-link
      >
      <router-link :to="{ name: 'CreateQuestion' }"
        ><button class="create">
          <div>Question</div>
          <span class="material-icons">
            help_outline
          </span>
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
button:hover div,
button:hover span {
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
.create {
  width: 100px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
</style>
