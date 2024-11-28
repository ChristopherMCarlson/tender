<template>
  <v-app>
    <v-navigation-drawer app color="primary">
      <v-list-item>
        <v-list-item-title class="caveat-brush">Tender</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item @click="activeComponent = 'DesktopDiscover'" prepend-icon="mdi-desktop-mac"
          title="Discover Recipes">
        </v-list-item>
        <v-list-item @click="activeComponent = 'LikedRecipes'" prepend-icon="mdi-heart" title="Liked Recipes">
        </v-list-item>
        <v-list-item @click="activeComponent = 'FriendsList'" prepend-icon="mdi-account-multiple" title="Friends List">
        </v-list-item>
        <v-list-item @click="logout" prepend-icon="mdi-logout" title="Logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <component :is="activeComponent"></component>
    </v-main>
  </v-app>
</template>

<script>
import DesktopDiscover from '../components/DesktopDiscover.vue';
import LikedRecipes from '../components/LikedRecipes.vue';
import FriendsList from '@/components/FriendsList.vue';

export default {
  name: 'HomeView',
  components: {
    DesktopDiscover,
    LikedRecipes,
    FriendsList,
  },
  data: () => ({
    activeComponent: 'DesktopDiscover',
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap');

.caveat-brush {
  font-family: 'Caveat Brush', cursive;
  font-size: 2.5rem;
  color: #e0390f;
}
</style>