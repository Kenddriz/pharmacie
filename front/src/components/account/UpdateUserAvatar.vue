<template>
  <q-avatar color="grey" size="150px">
    <q-img :src="model.url[0]||curAvatar||'register.svg'" />
    <q-btn-group v-if="model.avatar.length" rounded push class="absolute-center">
      <q-btn
        color="primary"
        size="sm"
        icon="check"
        text-color="white"
        @click="updateAvatar(model.avatar[0]);model.avatar.length = 0;"
      />
      <q-btn
        color="deep-orange"
        size="sm"
        icon="close"
        text-color="white"
        @click="model.avatar.length = 0"
      />
    </q-btn-group>
    <AvatarInput
      v-else
      v-model="model"
      class="absolute-bottom-right"
      style="right: 10px;"
    />
  </q-avatar>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useUpdateUserAvatar } from '../../graphql/user/user.service';
import AvatarInput from '../shared/AvatarInput.vue';
import { AvatarModel } from '../../graphql/user/user.sdl';

export default defineComponent({
  name: 'UpdateUserAvatar',
  components: { AvatarInput },
  props: {
    avatar: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const model = ref<AvatarModel>({ avatar: [], url: [] });
    return {
      ...useUpdateUserAvatar(),
      curAvatar: computed(() => props.avatar ? String(process.env.uri) + 'avatars/users/' + props.avatar : ''),
      model
    }
  }
});
</script>

<style scoped>

</style>
