import { auth, storage } from '../firebase';
const state = {
    
};
const mutations = {
    
};
const actions = {
    async uploadImageToStorage(_, {file, photoId, directoryName}) {
        const user = auth.currentUser;
        const uploadPhoto = () => {
          let fileName = `images/${user.uid}/${directoryName}/${photoId}`;
          return storage.ref(fileName).put(file);
        };
        function getDownloadURL(ref) {
          return ref.getDownloadURL();
        }
        try {
          let upload = await uploadPhoto();
          return await getDownloadURL(upload.ref);
        } catch (error) {
          throw Error(error.message);
        }
    },
    async removeItemsByDirectoryName(_, { directoryName }) {
        const user = auth.currentUser;
        const ref = storage.ref(`images/${user.uid}/${directoryName}`);
        const refImages = await ref.listAll();
        refImages.items.forEach(async element => {
          await element.delete();
          console.log("eliminado correctamente")
        });
    },
    async removeUnseenImagesFromStorage(_, { seen, directoryName }) {
        const user = auth.currentUser;
        const ref = storage.ref(`images/${user.uid}/${directoryName}`);
        const refImages = await ref.listAll();
        refImages.items.forEach(async element => {
          let fileName = element.name;
          if (!seen.has(fileName)) {
            await element.delete();
          }
        });
        console.log("se han eliminado los que no estan registrados")
    },
};
const getters = {
  getEditor(state, getters, rootState) {
    return rootState.getEditor;
  }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};