<template>
  <q-btn
    outline
    color="warning"
    round
    size="sm"
    icon="photo_camera"
    @click="$refs.file.$el.click()"
  >
    <q-file
      v-model="images"
      accept=".jpg, image/*"
      multiple
      max-files="1"
      max-file-size="2048000"
      @update:model-value="preview($event)"
      v-show="false"
      ref="file" />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useImageLoader } from '../../graphql/utils/preview';
import { AvatarModel } from '../../graphql/user/user.sdl';

export default defineComponent({
    name: 'AvatarInput',
    props: {
      modelValue: Object as PropType<AvatarModel>
    },
    emits: ['update:modelValue'],
    setup(_, { emit }) {
      const { urlList, previewImages} = useImageLoader();
      const preview = (e: FileList) => {
        if (e && e.length) {
          previewImages(e);
          emit('update:modelValue',{ avatar: e, url:  urlList.value });
        }
      }
      return {
        images: ref(null),
        preview
      }
    }
  })
</script>

<style scoped>

</style>
