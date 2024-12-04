<template>
  <v-app class="gradient-background">
    <v-main>
      <router-view />
      <v-snackbar v-model="error">
        An unexpected error occurred. Please try again.
        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="clearError">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data: () => ({
  }),
  methods: {
    clearError() {
      this.$store.dispatch('clearError');
    },
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
  },

}
</script>

<style>
.gradient-background {
  background: linear-gradient(to bottom right, #B0BEC5, #1c2529);
  min-height: 100vh;
  /* Ensure it covers the full height */
}
</style>