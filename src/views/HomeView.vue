<template>
  <v-app>
    <v-navigation-drawer app color="primary" v-model="drawer">
      <v-list-item>
        <v-list-item-title class="caveat-brush">Tender</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-if="display.mdAndUp" @click="changeComponent('DesktopDiscover')" prepend-icon="mdi-desktop-mac"
          title="Discover Recipes">
        </v-list-item>
        <v-list-item v-else @click="changeComponent('MobileDiscover')" prepend-icon="mdi-desktop-mac"
          title="Discover Recipes">
        </v-list-item>
        <v-list-item @click="changeComponent('LikedRecipes')" prepend-icon="mdi-heart" title="Liked Recipes">
        </v-list-item>
        <v-list-item @click="changeComponent('FriendsList')" prepend-icon="mdi-account-multiple" title="Friends List">
        </v-list-item>
        <v-list-item @click="logout" prepend-icon="mdi-logout" title="Logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="display.smAndDown">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="caveat-brush">Tender</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <component :is="activeComponent"></component>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import DesktopDiscover from '../components/DesktopDiscover.vue';
import MobileDiscover from '@/components/MobileDiscover.vue';
import LikedRecipes from '../components/LikedRecipes.vue';
import FriendsList from '@/components/FriendsList.vue';

export default {
  name: 'HomeView',
  components: {
    DesktopDiscover,
    MobileDiscover,
    LikedRecipes,
    FriendsList,
  },
  setup() {
    const display = ref(useDisplay());

    return {
      display,
    }
  },
  data: () => ({
    activeComponent: 'DesktopDiscover',
    drawer: false,
  }),
  beforeMount() {
    if (this.display.smAndDown) {
      this.activeComponent = 'MobileDiscover';
    } else {
      this.drawer = true;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    changeComponent(component) {
      this.activeComponent = component;
      if (this.display.smAndDown) {
        this.drawer = false;
      }
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