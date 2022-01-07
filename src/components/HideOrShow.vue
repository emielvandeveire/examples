<template>
  <div class="checkbox">
    <p>Add description</p>
    <label class="addOrRemove">
      <button @click="handleClick">
        <i v-if="show" class="material-icons">
          remove
        </i>
        <i v-if="!show" class="material-icons">
          add
        </i>
      </button>
    </label>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  props: ["wantIt"],
  setup(props) {
    const show = ref(false);
    const handleClick = () => {
        props.wantIt.value = true
        show.value = true
    }
    return { show, handleClick };
  },
};
</script>

<style scoped>
button {
    width: 0;
    height: 0;
    padding: 0;
}
</style>
