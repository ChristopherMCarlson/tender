<template>
    <v-app id="tenderDesktop">
        <v-main>
            <v-container class="py-8 px-6" fluid>
                <v-row class="justify-center">
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12" class="d-flex justify-center">
                                <v-fab-transition>

                                </v-fab-transition>
                                <v-card height="75vh" width="25vw" id="recipe-card" margin="auto" @mousedown="startDrag"
                                    @mousemove="onDrag" @mouseup="endDrag" @touchstart="startDrag" @touchmove="onDrag"
                                    @touchend="endDrag" :style="{ left: cardLeft + 'px' }" class="overflow-auto">
                                    <transition name="flip" mode="out-in">
                                        <div :key="showDirections" style="height: 100%;">
                                            <v-img v-if="!showDirections && recipeImage" :src="recipeImage"
                                                height="100%" cover>
                                                <v-row class="pa-5" style="position: absolute; bottom: 0; width: 100%;">
                                                    <h1 class="recipe-name">{{ activeRecipe.name }}</h1>
                                                </v-row>
                                            </v-img>
                                            <div v-else>
                                                <h1>{{ activeRecipe.name }}</h1>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col cols="12" class="px-4">
                                                            <h2>Ingredients</h2>
                                                            <ul>
                                                                <li v-for="ingredient in activeRecipe.ingredients"
                                                                    :key="ingredient">{{ ingredient }}
                                                                </li>
                                                            </ul>
                                                        </v-col>
                                                        <v-col cols="12" class="px-4">
                                                            <h2>Directions</h2>
                                                            <ul>
                                                                <li v-for="direction in activeRecipe.directions"
                                                                    :key="direction">{{ direction }}</li>
                                                            </ul>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </div>
                                        </div>
                                    </transition>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="justify-center">
                            <v-col cols="6">
                                <v-row>
                                    <v-spacer></v-spacer>
                                    <v-col cols="3" class="text-center">
                                        <v-btn icon="mdi-close" color="red" @click="addToDislikedRecipes()"></v-btn>
                                    </v-col>
                                    <v-col cols="3" class="text-center">
                                        <v-btn icon="mdi-arrow-up" color="blue"
                                            @click="showDirections = !showDirections"></v-btn>
                                    </v-col>
                                    <v-col cols="3" class="text-center">
                                        <v-btn icon="mdi-check" color="green" @click="addToLikedRecipes()"></v-btn>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row class="justify-center">
                            <v-col cols="12" class="text-center">
                                <span style="opacity: 75%;">Keyboard Shortcuts</span>
                            </v-col>
                        </v-row>
                        <v-row class="justify-center">
                            <v-col cols="6" class="text-center">
                                <v-row>
                                    <v-spacer></v-spacer>
                                    <v-col cols="3" class="text-center">
                                        <span style="opacity: 75%;">
                                            <v-icon>mdi-arrow-left-box</v-icon>
                                            Dislike
                                        </span>
                                    </v-col>
                                    <v-col cols="3" class="text-center">
                                        <span style="opacity: 75%;">
                                            <v-icon>mdi-arrow-up-box</v-icon>
                                            Flip Card
                                        </span>
                                    </v-col>
                                    <v-col cols="3" class="text-center">
                                        <span style="opacity: 75%;">
                                            <v-icon>mdi-arrow-right-box</v-icon>
                                            Like
                                        </span>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            drawer: true,
            isDragging: false,
            startX: 0,
            cardLeft: 0,
            dragDirection: '',
            showDirections: false,
            activeRecipe: null,
            recipeImage: null,
        };
    },
    computed: {
        viewedRecipes() {
            return this.$store.state.likedRecipes.concat(this.$store.state.dislikedRecipes);
        },
    },
    beforeMount() {
        this.$store.dispatch('getLikedRecipes');
        this.$store.dispatch('getDislikedRecipes');
        let viewedRecipeIds = this.viewedRecipes;
        let avilableRecipes = require('@/assets/recipes.json').filter(recipe => !viewedRecipeIds.includes(recipe.imageId));
        this.activeRecipe = avilableRecipes[Math.floor(Math.random() * avilableRecipes.length)];
        this.recipeImage = require(`@/assets/recipeImages/${this.activeRecipe.imageId}.jpg`);
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    methods: {
        startDrag(event) {
            this.isDragging = true;
            this.startX = event.clientX;
        },
        onDrag(event) {
            if (this.isDragging) {
                const deltaX = event.clientX - this.startX;
                this.cardLeft += deltaX;
                this.startX = event.clientX;
                this.dragDirection = deltaX > 0 ? 'right' : 'left';

                if (Math.abs(this.cardLeft) >= 200) {
                    console.log('Card has been dragged 200px to the ' + this.dragDirection);
                    if (this.dragDirection === 'left') {
                        this.addToDislikedRecipes();
                    } else {
                        this.addToLikedRecipes();
                    }
                    this.isDragging = false;
                }
            }
        },
        endDrag() {
            this.dragDirection = '';
            this.cardLeft = 0;
            this.isDragging = false;
        },
        handleKeyDown(event) {
            if (event.key === 'ArrowRight') {
                this.addToLikedRecipes();
            }
            if (event.key === 'ArrowLeft') {
                this.addToDislikedRecipes();
            }
            if (event.key === 'ArrowUp') {
                this.showDirections = !this.showDirections;
            }
        },
        addToLikedRecipes() {
            this.$store.dispatch('addToLikedRecipes', this.activeRecipe);
            this.getNewRecipe();
        },
        addToDislikedRecipes() {
            this.$store.dispatch('addToDislikedRecipes', this.activeRecipe);
            this.getNewRecipe();
        },
        getNewRecipe() {
            console.log('Getting new recipe');
            let viewedRecipeIds = this.viewedRecipes.map(recipe => recipe.imageId);
            console.log(viewedRecipeIds);
            let avilableRecipes = require('@/assets/recipes.json').filter(recipe => !viewedRecipeIds.includes(recipe.imageId));
            this.activeRecipe = avilableRecipes[Math.floor(Math.random() * avilableRecipes.length)];
            this.recipeImage = require(`@/assets/recipeImages/${this.activeRecipe.imageId}.jpg`);
        },
    },
};
</script>

<style scoped>
#recipe-card {
    position: relative;
    cursor: grab;
}

.recipe-name {
    color: white;
    text-shadow: 1px 1px 2px black;
}

.flip-enter-active,
.flip-leave-active {
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.flip-enter,
.flip-leave-to {
    transform: rotateY(180deg);
}
</style>