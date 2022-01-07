<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New Example</h4>
      <input type="text" required placeholder="Example Title" v-model="title" />

      <div class="extra-info">
        <div class="checkbox">
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
        </div>
        <textarea
          v-if="wantDescription"
          placeholder="Description..."
          v-model="description"
        ></textarea>

        <div class="checkbox">
          <p>Add Second description</p>
          <input
            v-model="wantDescription2"
            id="wantDescription2"
            type="checkbox"
          />
          <label class="addOrRemove" for="wantDescription2">
            <i v-if="wantDescription2" class="material-icons">
              remove
            </i>
            <i v-if="!wantDescription2" class="material-icons">
              add
            </i>
          </label>
        </div>
        <textarea
          v-if="wantDescription2"
          placeholder="Second Description..."
          v-model="description2"
        ></textarea>
      </div>

      <!-- upload playlist image -->
      <label for="file"
        ><span class="material-icons icon">&#xe43e;</span>Upload Playlist Cover
        Image</label
      >
      <input id="file" type="file" @change="handleChange" />
      <div class="error">{{ fileError }}</div>

      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();
    const router = useRouter();

    const title = ref("");
    const description = ref("");
    const description2 = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          description2: description2.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value, // so we can delete it later
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
      }
    };
    const wantDescription = ref(false);
    const wantDescription2 = ref(false);

    // allowed file types
    const types = ["image/png", "image/jpeg"];
    const handleChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return {
      title,
      description,
      description2,
      handleSubmit,
      fileError,
      handleChange,
      isPending,
      wantDescription,
      wantDescription2,
    };
  },
};
</script>

<style>
form {
  background: white;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
input[type="checkbox"] {
  display: none;
}
label.addOrRemove {
  background: #4f515a;
  height: 10px;
  width: 10px;
  margin: 0;
  padding: 5px;
  border-radius: 50px;
}
label.addOrRemove i {
  color: white;
  font-size: 16px;
  height: 16px;
  width: 16px;
  margin: 0;
}
</style>
