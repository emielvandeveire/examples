import { projectStorage } from "../firebase/config";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const imageurl = ref(null);
  const videourl = ref(null);
  const imagefilePath = ref(null);
  const videofilePath = ref(null);

  const uploadImage = async (file) => {
    imagefilePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(imagefilePath.value);

    try {
      const res = await storageRef.put(file);
      imageurl.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };
  const uploadVideo = async (file) => {
    videofilePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(videofilePath.value);

    try {
      const res = await storageRef.put(file);
      videourl.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);

    try {
      await storageRef.delete();
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  return {
    uploadImage,
    uploadVideo,
    deleteImage,
    imageurl,
    videourl,
    imagefilePath,
    videofilePath,
    error,
  };
};

export default useStorage;
