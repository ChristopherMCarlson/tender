<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="3" v-for="recipe in likedRecipes" :key="recipe.imageId">
                <v-card height="40vh">
                    <v-img :src="require(`@/assets/recipeImages/${recipe.imageId}.jpg`)" height="100%" cover>
                        <v-row class="pa-5" style="position: absolute; bottom: 0; width: 100%;">
                            <v-col cols="12">
                                <h3 class="recipe-name">{{ recipe.name }}</h3>
                            </v-col>
                            <v-col cols="6">
                                <v-btn text @click="viewRecipe(recipe)">View Recipe</v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn text @click="removeRecipe(index)">Remove</v-btn>
                            </v-col>
                        </v-row>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="activeRecipeDialog" max-width="800">
            <v-app-bar v-if="isMobile" dense flat color="transparent">
                <v-spacer></v-spacer>
                <v-btn icon @click="activeRecipeDialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-app-bar>
            <v-card class="overflow-auto">
                <v-img :src="require(`@/assets/recipeImages/${activeRecipe.imageId}.jpg`)" height="40vh" cover>
                    <v-row class="pa-5" style="position: absolute; bottom: 0; width: 100%;">
                        <v-col cols="12">
                            <h3 class="recipe-name">{{ activeRecipe.name }}</h3>
                        </v-col>
                    </v-row>
                </v-img>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="px-4">
                            <h2>Ingredients</h2>
                            <ul>
                                <li v-for="ingredient in activeRecipe.ingredients" :key="ingredient">{{ ingredient }}
                                </li>
                            </ul>
                        </v-col>
                        <v-col cols="12" class="px-4">
                            <h2>Directions</h2>
                            <ul>
                                <li v-for="direction in activeRecipe.directions" :key="direction">{{ direction }}</li>
                            </ul>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const isMobile = computed(() => mobile.value)

</script>

<script>
export default {
    name: 'LikedRecipes',
    data() {
        return {
            likedRecipes: [],
            activeRecipe: {},
            activeRecipeDialog: false,
        };
    },
    created() {
        this.likedRecipes = this.$store.state.likedRecipes;
    },
    methods: {
        viewRecipe(recipe) {
            this.activeRecipe = recipe;
            this.activeRecipeDialog = true;
        },
        // removeRecipe(index) {
        //     this.likedRecipes.splice(index, 1);
        //     localStorage.setItem('likedRecipes', JSON.stringify(this.likedRecipes));
        // },
    },
}
</script>

<style scoped>
.recipe-name {
    color: white;
    text-shadow: 1px 1px 2px black;
}
</style>