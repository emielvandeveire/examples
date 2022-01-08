<template>
  <div class="checkbox">
    <p>Add description</p>
    <button v-if="!show" @click="show = true">
      <i class="material-icons">
        add
      </i>
    </button>
    <button v-if="show" @click="show = false">
      <i class="material-icons">
        remove
      </i>
    </button>
  </div>
  <!-- <div class="checkbox">
          <p>Add description</p>
          <input
            v-model="wantDescription"
            id="wantDescription"
            type="checkbox"
          />
          <label class="addOrRemove" for="wantDescription">
            <i v-if="wantDescription" class="material-icons">
              remove
            </i>
            <i v-if="!wantDescription" class="material-icons">
              add
            </i>
          </label>
        </div> -->
</template>

<script>
import { ref } from "vue";
export default {
  props: ["wantIt"],
  setup(props) {
    const show = ref(false);
    const handleClick = () => {
      props.wantIt.value = true;
      show.value = true;
    };
    return { show, handleClick };
  },
};
</script>

<style scoped>
button {
  width: 15px;
  height: 15px;
  padding: 0;
}
</style>
