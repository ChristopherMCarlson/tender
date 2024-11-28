<template>
    <v-container class="gradient-background">
        <v-row class="justify-center">
            <v-col cols="12" class="text-center">
                <h1>
                    My Friend Code: {{ friendCode }}
                </h1>
            </v-col>
            <v-col cols="12" md="7">
                <v-card color="primary">
                    <v-card-title>
                        Add a Friend
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="friendToAdd" label="Friend Code"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="addFriend">Add Friend</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="7" class="text-center">
                <v-row>
                    <v-col cols="12">
                        <h2>
                            Friends List
                        </h2>
                    </v-col>
                    <v-col v-for="friend in friendsList" :key="friend" cols="12">
                        <v-card color="primary">
                            <v-card-title>
                                {{ friend }}
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            friendToAdd: '',
        };
    },
    async mounted() {
        this.$store.dispatch('getFriendCode');
        this.$store.dispatch('getFriendsList');
    },
    computed: {
        friendCode() {
            return this.$store.state.friendCode;
        },
        friendsList() {
            return this.$store.state.friendsList;
        },
    },
    methods: {
        addFriend() {
            this.$store.dispatch('addFriend', this.friendToAdd);
        },
    },
}
</script>

<style lang="scss" scoped></style>