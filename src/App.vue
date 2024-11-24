<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list>
        <v-list-item @click="activeComponent = 'DesktopDiscover'" prepend-icon="mdi-desktop-mac"
          title="Discover Recipes">
        </v-list-item>
        <v-list-item @click="activeComponent = 'LikedRecipes'" prepend-icon="mdi-heart"
          title="Liked Recipes"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <component :is="activeComponent"></component>
    </v-main>
  </v-app>
</template>

<script>
import DesktopDiscover from './components/DesktopDiscover.vue';
import LikedRecipes from './components/LikedRecipes.vue';

export default {
  name: 'App',
  components: {
    DesktopDiscover,
    LikedRecipes,
  },
  data: () => ({
    activeComponent: 'DesktopDiscover',
  }),
}
</script>
