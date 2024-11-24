<template>
  <v-app id="tenderDesktop">
    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row class="justify-space-around">
            <v-col cols="4">

            </v-col>
            <v-col cols="6">
                <v-card
              height="75vh"
              width="25vw"
              id="recipe-card"
              margin="auto"
              @mousedown="startDrag"
              @mousemove="onDrag"
              @mouseup="endDrag"
              @touchstart="startDrag"
              @touchmove="onDrag"
              @touchend="endDrag"
              :style="{ left: cardLeft + 'px' }"
              class="overflow-auto"
            >
              <transition name="flip" mode="out-in">
                <div :key="showDirections" style="height: 100%;">
                  <v-img v-if="!showDirections" :src="recipeImage" height="100%" cover>
                    <v-row class="pa-5" style="position: absolute; bottom: 0; width: 100%;">
                      <h1 class="recipe-name">{{ randomRecipe.name }}</h1>
                    </v-row>
                  </v-img>
                  <div v-else>
                    <h1>{{ randomRecipe.name }}</h1>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" class="px-4">
                          <h2>Ingredients</h2>
                          <ul>
                            <li v-for="ingredient in randomRecipe.ingredients" :key="ingredient">{{ ingredient }}</li>
                          </ul>
                        </v-col>
                        <v-col cols="12" class="px-4">
                          <h2>Directions</h2>
                          <ul>
                            <li v-for="direction in randomRecipe.directions" :key="direction">{{ direction }}</li>
                          </ul>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                </div>
              </transition>
            </v-card>
            </v-col>
            <v-col cols="2">

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
    };
  },
  computed: {
    randomRecipe(){
        let recipes = require('@/assets/recipes.json');
        console.log(recipes[0]);
        return recipes[Math.floor(Math.random() * recipes.length)];
    },
    recipeImage(){
        return require(`@/assets/recipeImages/${this.randomRecipe.imageId}.jpg`);
    }
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
        console.log('ArrowRight key pressed');
      }
      if (event.key === 'ArrowLeft') {
        console.log('ArrowLeft key pressed');
      }
      if (event.key === 'ArrowUp') {
        this.showDirections = !this.showDirections;
      }
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

.flip-enter-active, .flip-leave-active {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-enter, .flip-leave-to {
  transform: rotateY(180deg);
}
</style>