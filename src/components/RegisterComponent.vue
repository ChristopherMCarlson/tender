<template>
    <v-container class="gradient-background" fluid>
        <v-row>
            <v-col md="6" cols="12">
                <v-row class="pt-5 justify-center">
                    <v-col cols="8" class="text-center">
                        <h1 class="caveat-brush">Tender</h1>
                    </v-col>
                    <v-col cols="8" class="text-center">
                        <h2>Welcome!</h2>
                    </v-col>
                    <v-col cols="8" class="text-center">
                        <h4>Create an account to continue</h4>
                    </v-col>
                    <v-col cols="8" class="text-center">
                        <form @submit.prevent="register">
                            <v-text-field v-model="email" label="Email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-btn type="submit" color="primary">Register</v-btn>
                        </form>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col cols="8" class="text-center">
                        <span>
                            <h5>Already have an account?</h5>
                            <h5>Login <router-link to="/login">here</router-link></h5>
                        </span>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6" v-if="display.mdAndUp" class="text-center">
                <v-img :src="require('@/assets/splashImage.jpg')" cover height="95vh" width="100%"></v-img>
            </v-col>
        </v-row>
        <v-overlay :model-value="overlay" class="align-center justify-center">
            <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

const display = ref(useDisplay());

</script>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
            overlay: false,
        };
    },
    methods: {
        ...mapActions(['register']),
        async register() {
            this.overlay = true;
            await this.$store.dispatch('register', { email: this.email, password: this.password });
            this.$router.push('/');
        },
    },
};
</script>