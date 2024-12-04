<template>
    <v-app id="tenderDesktop" class="gradient-background">
        <v-container fluid style="overflow: hidden;">
            <v-row class="justify-center">
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-card height="75vh" width="90vw" id="recipe-card" margin="auto" @touchstart="startDrag"
                                @touchmove="onDrag" @touchend="endDrag"
                                :style="{ left: cardLeft + 'px', transform: `rotate(${cardLeft / 25}deg)` }"
                                class="overflow-auto" color="grey">
                                <transition name="flip" mode="out-in">
                                    <div :key="showDirections" style="height: 100%;">
                                        <v-img v-if="!showDirections && recipeImage" :src="recipeImage" height="100%"
                                            cover>
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
                </v-col>
            </v-row>
        </v-container>
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
            startY: 0,
            cardUp: 0,
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
            if (event.touches && event.touches.length > 0) {
                this.startX = event.touches[0].clientX;
                this.isDragging = true;
            }
        },
        onDrag(event) {
            if (this.isDragging) {
                const deltaX = event.touches[0].clientX - this.startX;
                const deltaY = event.touches[0].clientY - this.startY;
                this.cardLeft += deltaX;
                this.cardUp += deltaY;
                this.startX = event.touches[0].clientX;
                this.dragDirection = deltaX > 0 ? 'right' : 'left';

                if (Math.abs(this.cardLeft) >= 150) {
                    if (this.dragDirection === 'left') {
                        this.addToDislikedRecipes();
                    } else {
                        this.addToLikedRecipes();
                    }
                    this.isDragging = false;
                    this.cardLeft = 0;
                }
            }
        },
        endDrag(event) {
            event.preventDefault();
            this.dragDirection = '';
            this.cardLeft = 0;
            this.cardUp = 0;
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