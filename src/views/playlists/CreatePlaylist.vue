<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New Example</h4>
      <input type="text" required placeholder="Example Title" v-model="title" />

      <div class="extra-info">
        <p>Add description</p>
        <div
          class="icon-button disabled"
          v-if="!wantDescription"
          @click="wantDescription = true"
        >
          <i class="material-icons">
            add
          </i>
        </div>
        <div
          class="icon-button enabled"
          v-if="wantDescription"
          @click="wantDescription = false"
        >
          <i class="material-icons">
            add
          </i>
        </div>
        <textarea
          v-if="wantDescription"
          placeholder="Description..."
          v-model="description"
        ></textarea>

        <p>Add Second description</p>
        <div
          class="icon-button disabled"
          v-if="!wantDescription2"
          @click="wantDescription2 = true"
        >
          <i class="material-icons">
            add
          </i>
        </div>
        <div
          class="icon-button enabled"
          v-if="wantDescription2"
          @click="wantDescription2 = false"
        >
          <i class="material-icons">
            add
          </i>
        </div>
        <textarea
          v-if="wantDescription2"
          placeholder="Second Description..."
          v-model="description2"
        ></textarea>

        <p>Add links</p>
        <div
          class="icon-button disabled"
          v-if="!wantLinks"
          @click="wantLinks = true"
        >
          <i class="material-icons">
            add
          </i>
        </div>
        <div
          class="icon-button enabled"
          v-if="wantLinks"
          @click="wantLinks = false"
        >
          <i class="material-icons">
            add
          </i>
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

        <!-- Tags -->
        <p>Add Tags</p>
        <div
          class="icon-button disabled"
          v-if="!wantTags"
          @click="wantTags = true"
        >
          <i class="material-icons">
            add
          </i>
        </div>
        <div
          class="icon-button enabled"
          v-if="wantTags"
          @click="wantTags = false"
        >
          <i class="material-icons">
            add
          </i>
        </div>
        <div class="add-tag">
          <form v-if="wantTags" @submit.prevent="handleTagSubmit">
            <h4>Add Tag</h4>
            <input type="text" placeholder="Song title" v-model="tagTitle" />
            <button>Add tag</button>
          </form>
          <div class="tag-container">
            <div v-for="tag in tags" :key="tag.id">
              <div class="tag">{{ tag.tagTitle }}</div>
            </div>
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

      <input id="video" type="file" @change="handleVideoChange" />
      <div class="error">{{ fileError }}</div>

      <label for="video"
        ><span class="material-icons icon">&#xe02c;</span>Upload Video</label
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
import HideOrShow from "@/components/HideOrShow";

export default {
  setup() {
    const {
      imagefilePath,
      videofilePath,
      imageurl,
      videourl,
      uploadImage,
      uploadVideo,
    } = useStorage();
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
    const tags = ref([]);
    const tagTitle = ref("");
    const imageFile = ref(null);
    const videoFile = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (imageFile.value && videoFile.value) {
        isPending.value = true;
        await uploadImage(imageFile.value);
        await uploadVideo(videoFile.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          description2: description2.value,
          links: links.value,
          tags: tags.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: imageurl.value,
          videoUrl: videourl.value,
          coverFilePath: imagefilePath.value,
          videoFilePath: videofilePath.value, // so we can delete it later
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
    const handleTagSubmit = () => {
      const newTag = {
        tagTitle: tagTitle.value,
        id: Math.floor(Math.random() * 1000000),
      };
      tagTitle.value = "";
      tags.value = [...tags.value, newTag];
      console.log(newTag);
      console.log(tags.value);
    };
    const wantDescription = ref(false);
    const wantDescription2 = ref(false);
    const wantLinks = ref(false);
    const wantTags = ref(false);

    // allowed file imageTypes
    const imageTypes = ["image/png", "image/jpeg", "video/mp4"];
    const handleImageChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && imageTypes.includes(selected.type)) {
        imageFile.value = selected;
        fileError.value = null;
      } else {
        imageFile.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    const videoTypes = ["video/mp4", "video/mov"];
    const handleVideoChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && videoTypes.includes(selected.type)) {
        videoFile.value = selected;
        fileError.value = null;
      } else {
        videoFile.value = null;
        fileError.value = "Please select an image file (mp4 or mov)";
      }
    };

    return {
      title,
      description,
      description2,
      links,
      linkTitle,
      link,
      links,
      tagTitle,
      tags,
      handleSubmit,
      fileError,
      handleImageChange,
      handleVideoChange,
      handleLinkSubmit,
      handleTagSubmit,
      isPending,
      wantDescription,
      wantDescription2,
      wantLinks,
      wantTags,
      wantIt,
    };
  },
  components: {
    HideOrShow,
  },
};
</script>

<style>
div {
  margin: 0;
  padding: 0;
}
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

.icon-button i {
  font-size: 16px;
  height: 16px;
  width: 16px;
  margin: 0;
  color: white;
}

.icon-button {
  background: #4f515a;
  height: 16px;
  width: 16px;
  margin: 0;
  border-radius: 50px;
}

.disabled {
  background: green;
}

.enabled {
  background: red;
}
.enabled i {
  transform: rotate(45deg);
}
</style>
