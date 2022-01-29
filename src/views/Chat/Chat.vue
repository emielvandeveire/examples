<template>
  <h1>{{ sendUser[0].userName }}</h1>
  <div v-for="message in sentMessages" :key="message.id">
    <!-- This is sent message -->
    <div class="received-container">
      <div
        class="received"
        v-if="message.fromId == user.uid && message.toId == fromUser"
      >
        <h4>{{ message.message }}</h4>
      </div>
    </div>

    <!-- This is received -->
    <div class="sent-container">
      <div
        class="sent"
        v-if="message.toId == user.uid && message.fromId == fromUser"
      >
        <h4>{{ message.message }}</h4>
      </div>
    </div>
  </div>
  <!-- <div v-for="message in sentMessages" :key="message.id">
    <h1>{{ message.message }}</h1>
    <p>{{ message.fromId }}</p>
    <p>{{ message.toId }}</p>
  </div> -->
  <form @submit.prevent="handleSend">
    <input placeholder="Type something..." type="text" v-model="message" />
  </form>
</template>

<script>
import getDocument from "@/composables/getDocument";
import getCollection from "@/composables/getCollection";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config";
import { ref } from "@vue/reactivity";
import getUser from "@/composables/getUser";
import { onMounted } from "@vue/runtime-core";

export default {
  props: ["toUser"],
  setup(props) {
    const message = ref("");
    const toUser = props.toUser;
    const { addDoc } = useCollection("chat");
    const { user } = getUser();
    const fromUser = props.toUser;
    // const { error, document: chat } = getDocument("chat", props.id);
    const { documents: sendUser } = getCollection("users", [
      "userId",
      "==",
      props.toUser,
    ]);
    // const { documents: gotMessages } = getCollection("chat", [
    //   "toId",
    //   "==",
    //   user.value.uid,
    // ]);
    const { documents: sentMessages } = getCollection("chat");

    const handleSend = async () => {
      const res = await addDoc({
        message: message.value,
        fromId: user.value.uid,
        toId: props.toUser,
        userName: user.value.displayName,
        coverUrl: "",
        videoUrl: "",
        coverFilePath: "",
        videoFilePath: "",
        songs: [],
        type: "chat",
        createdAt: timestamp(),
        views: [],
      });

      message.value = "";
    };
    return {
      toUser,
      message,
      handleSend,
      sentMessages,
      user,
      fromUser,
      sendUser,
    };
  },
};
</script>

<style scoped>
.sent-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.sent {
  background: var(--primary);
}
.sent h4 {
  color: white;
}

.received-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.received {
  background: var(--secondary);
}

.sent,
.received {
  padding: 5px 15px;
  border-radius: 150px;
  margin: 2px 0;
}
</style>
