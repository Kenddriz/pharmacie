<template>
  <q-img :src="model.url[0]||curAvatar||'avatar.svg'">
    <div class="absolute-bottom-left transparent">
      <template v-if="model.avatar.length">
        <div v-if="dense" class="row no-wrap">
          <q-icon
            class="cursor-pointer"
            style="margin-left: -5px"
            size="sm"
            name="check"
            @click="submit"
            color="primary"
          />
          <q-icon
            color="deep-orange"
            @click="submit(false)"
            class="cursor-pointer"
            size="sm"
            name="close"
          />
        </div>
        <q-btn-group v-else rounded push>
          <q-btn
            color="primary"
            size="sm"
            icon="check"
            text-color="white"
            @click="submit"
          />
          <q-btn
            color="deep-orange"
            size="sm"
            icon="close"
            text-color="white"
            @click="submit(false)"
          />
        </q-btn-group>
      </template>
      <AvatarInput
        v-else
        v-model="model"
      />
    </div>
  </q-img>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useUpdateProviderAvatar } from '../../graphql/provider/provider.service';
import { AvatarModel } from '../../graphql/user/user.sdl';
import AvatarInput from '../shared/AvatarInput.vue';

export default defineComponent({
  name: 'UpdateProviderAvatar',
  components: { AvatarInput },
  props: {
    avatar: {
      type: String,
      default: ''
    },
    providerId: {
      type: Number,
      default: 0
    },
    dense: Boolean
  },
  setup(props) {
    const model = ref<AvatarModel>({ avatar: [], url: [] });
    const { updateAvatar } = useUpdateProviderAvatar();
    function submit(save = true) {
      if(save)updateAvatar(model.value.avatar[0], props.providerId);
      model.value.avatar.length = 0;
    }
    return {
      submit,
      curAvatar: computed(() => props.avatar ? String(process.env.uri) + 'avatars/providers/' + props.avatar : ''),
      model
    }
  }
});
</script>

<style scoped>

</style>
