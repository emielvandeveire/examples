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

        <div class="checkbox">
          <p>Add links</p>
          <input v-model="wantLinks" id="wantLinks" type="checkbox" />
          <label class="addOrRemove" for="wantLinks">
            <i v-if="wantLinks" class="material-icons">
              remove
            </i>
            <i v-if="!wantLinks" class="material-icons">
              add
            </i>
          </label>
        </div>
        <div class="add-link">
          <form v-if="wantLinks" @submit.prevent="handleLinkSubmit">
            <h4>Add Link</h4>
            <input type="text" placeholder="Song title" v-model="linkTitle" />
            <input type="text" placeholder="Artist" v-model="link" />
            <button>Add Link</button>
          </form>
          <div v-for="link in links" :key="link.id">
            <h4>{{ link.linkTitle }}</h4>
            <a :href="link.link">{{ link.link }}</a>
          </div>
        </div>
      </div>

      <!-- upload playlist image -->
      <input id="image" type="file" @change="handleImageChange" />
      <div class="error">{{ fileError }}</div>

      <label for="image"
        ><span class="material-icons icon">&#xe43e;</span>Upload Playlist Cover
        Image</label
      >

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

    const wantIt = ref(false);

    const title = ref("");
    const description = ref("");
    const description2 = ref("");
    const linkTitle = ref("");
    const link = ref("");
    const links = ref([]);
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
          links: links.value,
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
    const handleLinkSubmit = () => {
      const newLink = {
        linkTitle: linkTitle.value,
        link: link.value,
        id: Math.floor(Math.random() * 1000000),
      };
      linkTitle.value = "";
      link.value = "";
      links.value = [...links.value, newLink];
      console.log(newLink);
      console.log(links.value);
    };
    const wantDescription = ref(false);
    const wantDescription2 = ref(false);
    const wantLinks = ref(false);

    // allowed file imageTypes
    const imageTypes = ["image/png", "image/jpeg", "video/mp4"];
    const handleImageChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && imageTypes.includes(selected.type)) {
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
      links,
      linkTitle,
      link,
      handleSubmit,
      fileError,
      handleImageChange,
      handleLinkSubmit,
      isPending,
      wantDescription,
      wantDescription2,
      wantLinks,
      wantIt,
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
