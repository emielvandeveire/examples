<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import getUser from "@/composables/getUser";
import useSignup from "@/composables/useSignup";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const router = useRouter();
    const { user } = getUser();
    const { addDoc } = useCollection("users");

    const email = ref("");
    const password = ref("");
    const displayName = ref("");

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        router.push({ name: "UserPlaylists" });
      }
      await addDoc({
        email: email.value,
        password: password.value,
        userName: displayName.value,
        userId: user.value.uid,

        title: "",
        content: "",
        description: "",
        description2: "",
        links: [],
        codes: [],
        tags: "",
        preparations: [],
        coverUrl: "",
        videoUrl: "",
        coverFilePath: "",
        videoFilePath: "",
        songs: [],
        type: "user",
        createdAt: timestamp(),
      });
    };

    return { email, password, displayName, handleSubmit, error, isPending };
  },
};
</script>
