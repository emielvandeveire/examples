<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New Example</h4>

      <!-- Title -->
      <input type="text" required placeholder="Example Title" v-model="title" />

      <!-- Video -->
      <input
        accept=".mov, .mp4, .MOV"
        id="video"
        type="file"
        @change="handleVideoChange"
      />
      <div class="error">{{ fileError }}</div>

      <label for="video"
        ><span class="material-icons icon">&#xe02c;</span>Upload Video</label
      >

      <!-- Image -->
      <input
        accept=".heic, .png, .HEIC, .jpeg, .jpg"
        id="image"
        type="file"
        @change="handleImageChange"
      />
      <div class="error">{{ fileError }}</div>

      <label for="image"
        ><span class="material-icons icon">&#xe43e;</span>Upload Playlist Cover
        Image</label
      >

      <div class="extra-info">
        <p>Description</p>
        <HideOrShow
          @showTrue="wantDescription = true"
          @showFalse="wantDescription = false"
        />
        <textarea
          v-if="wantDescription"
          placeholder="Description..."
          v-model="description"
        ></textarea>

        <p>Second Description</p>
        <HideOrShow
          @showTrue="wantDescription2 = true"
          @showFalse="wantDescription2 = false"
        />
        <textarea
          v-if="wantDescription2"
          placeholder="Second Description..."
          v-model="description2"
        ></textarea>

        <p>Links</p>
        <HideOrShow
          @showTrue="wantLinks = true"
          @showFalse="wantLinks = false"
        />
        <div class="add-link">
          <form v-if="wantLinks" @submit.prevent="handleLinkSubmit">
            <h4>Add Link</h4>
            <input type="text" placeholder="Link Title" v-model="linkTitle" />
            <input type="text" placeholder="Link URL" v-model="link" />
            <button>Add Link</button>
          </form>
          <div v-for="link in links" :key="link.id">
            <h4>{{ link.linkTitle }}</h4>
            <a :href="link.link">{{ link.link }}</a>
            <div>
              <button @click="handleLinkDelete(link.id)" class="warning">
                delete
              </button>
            </div>
          </div>
        </div>

        <p>Codes</p>
        <HideOrShow
          @showTrue="wantCodes = true"
          @showFalse="wantCodes = false"
        />
        <div class="add-code">
          <form v-if="wantCodes" @submit.prevent="handleCodeSubmit">
            <h4>Add Code</h4>
            <input
              type="text"
              placeholder="Programming Language"
              v-model="codeLanguage"
            />
            <textarea class="code" placeholder="Code" v-model="code" />
            <button>Add Code</button>
          </form>
          <div v-for="code in codes" :key="code.id">
            <h4 class="codeLanguage">{{ code.codeLanguage }}</h4>
            <textarea readonly class="code" v-model="code.code"></textarea>
          </div>
        </div>

        <!-- Tags -->
        <p>Tags</p>
        <HideOrShow @showTrue="wantTags = true" @showFalse="wantTags = false" />
        <div class="add-tag">
          <form v-if="wantTags" @submit.prevent="handleTagSubmit">
            <h4>Add Tag</h4>
            <input type="text" placeholder="Tag" v-model="tagTitle" />
            <button>Add tag</button>
          </form>
          <div class="tag-container">
            <div v-for="tag in tags" :key="tag.id">
              <div class="tag">{{ tag.tagTitle }}</div>
            </div>
          </div>
        </div>

        <!-- Materials -->
        <p>Preparations</p>
        <HideOrShow
          @showTrue="wantPreparations = true"
          @showFalse="wantPreparations = false"
        />
        <div class="add-tag">
          <form
            v-if="wantPreparations"
            @submit.prevent="handlePreparationSubmit"
          >
            <h4>Add Preparation</h4>
            <input
              type="text"
              placeholder="Preparation"
              v-model="preparationTitle"
            />
            <button>Add Preparation</button>
          </form>
          <ul class="preparation-container">
            <li v-for="preparation in preparations" :key="preparation.id">
              <p class="preparation">{{ preparation.preparationTitle }}</p>
            </li>
          </ul>
        </div>
      </div>
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
    const codeLanguage = ref("");
    const code = ref("");
    const codes = ref([]);
    const tags = ref([]);
    const tagTitle = ref("");
    const preparations = ref([]);
    const preparationTitle = ref("");
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
          codes: codes.value,
          tags: tags.value,
          preparations: preparations.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: imageurl.value,
          videoUrl: videourl.value,
          coverFilePath: imagefilePath.value,
          videoFilePath: videofilePath.value,
          songs: [],
          type: "video",
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
    const handleLinkDelete = (id) => {
      links.value = links.value.filter((link) => link.id != id);
    }
    const handleCodeSubmit = () => {
      const newCode = {
        codeLanguage: codeLanguage.value,
        code: code.value,
        id: Math.floor(Math.random() * 1000000),
      };
      codeLanguage.value = "";
      code.value = "";
      codes.value = [...codes.value, newCode];
      console.log(newCode);
      console.log(codes.value);
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
    const handlePreparationSubmit = () => {
      const newPreparation = {
        preparationTitle: preparationTitle.value,
        id: Math.floor(Math.random() * 1000000),
      };
      preparationTitle.value = "";
      preparations.value = [...preparations.value, newPreparation];
      console.log(newPreparation);
      console.log(preparations.value);
    };
    const wantDescription = ref(false);
    const wantDescription2 = ref(false);
    const wantLinks = ref(false);
    const wantTags = ref(false);
    const wantPreparations = ref(false);
    const wantCodes = ref(false);

    // allowed file imageTypes
    const imageTypes = ["image/png", "image/jpeg", "image/HEIC"];
    const handleImageChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && imageTypes.includes(selected.type)) {
        imageFile.value = selected;
        fileError.value = null;
      } else {
        imageFile.value = selected;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    const videoTypes = ["video/mp4", "video/mov", "video/MOV"];
    const handleVideoChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && videoTypes.includes(selected.type)) {
        videoFile.value = selected;
        fileError.value = null;
      } else {
        videoFile.value = selected;
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
      codeLanguage,
      code,
      codes,
      tagTitle,
      tags,
      preparations,
      preparationTitle,
      handleSubmit,
      fileError,
      handleImageChange,
      handleVideoChange,
      handleLinkSubmit,
      handleLinkDelete,
      handleCodeSubmit,
      handleTagSubmit,
      handlePreparationSubmit,
      isPending,
      wantDescription,
      wantDescription2,
      wantLinks,
      wantCodes,
      wantTags,
      wantPreparations,
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
}
button {
  margin-top: 5px;
}

.extra-info {
  margin: 20px 0;
}

.code {
  margin: 0;
  padding: 10px;
  overflow-x: scroll;
  background-color: #ebebeb;
  border-radius: 10px;
  height: max-content;
}
.codeLanguage {
  margin: 10px 0 0 0;
  font-weight: 500;
}
</style>
