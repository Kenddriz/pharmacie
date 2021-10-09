import { ref } from 'vue';

export const useImageLoader = () => {
  const urlList = ref<Array<string>>([]);
  const emptyPreviewImageList = () => {
    urlList.value.splice(0, urlList.value.length);
  }
  const previewImages = (images: FileList): void => {
    emptyPreviewImageList();
    if(images) {
      for(const image of images)
        urlList.value.push(URL.createObjectURL(image));
    }
  }
  return {
    urlList,
    emptyPreviewImageList,
    previewImages
  }
}

