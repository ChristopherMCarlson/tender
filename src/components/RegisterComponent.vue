<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex justify-center text-center">
                <v-card width="25vw" margin="auto">
                    <v-card-title>
                        <h2>Register</h2>
                    </v-card-title>
                    <v-card-text>
                        <form @submit.prevent="register">
                            <v-text-field v-model="email" label="Email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-btn type="submit">Register</v-btn>
                        </form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        ...mapActions(['register']),
        async register() {
            await this.register({ email: this.email, password: this.password });
            this.$router.push('/login');
        },
    },
};
</script>