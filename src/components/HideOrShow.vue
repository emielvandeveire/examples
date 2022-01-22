<template>
  <div class="checkbox">
    <div class="icon-button disabled" v-if="!show" @click="show = true, $emit('showTrue')">
      <i class="material-icons">
        expand_more
      </i>
    </div>
    <div class="icon-button enabled" v-if="show" @click="show = false, $emit('showFalse')">
      <i class="material-icons">
        expand_less
      </i>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["wantIt"],
  setup(props) {
    const show = ref(false);
    return { show };
  },
};
</script>

<style scoped>
button {
  width: 15px;
  height: 15px;
  padding: 0;
}
.icon-button i {
  font-size: 16px;
  height: 16px;
  width: 16px;
  margin: 0;
  padding: 0;
  color: white;
}

.icon-button {
  background: #4f515a;
  height: 16px;
  width: 16px;
  margin: 0 0 5px 0;
  padding: 0;
  display: flex;
  align-items: center;
  border-radius: 50px;
}
.icon-button:hover {
  cursor: pointer;
}

.disabled {
  background: green;
}

.enabled {
  background: red;
}
</style>