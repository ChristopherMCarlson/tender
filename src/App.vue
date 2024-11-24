<template>
  <v-app>
      <DesktopView />
  </v-app>
</template>

<script>
import DesktopView from './views/DesktopView.vue';

export default {
  name: 'App',
  components: {
    DesktopView,
  },
  data: () => ({
    //
  }),
}
</script>
