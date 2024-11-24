import { createStore } from 'vuex'

export default createStore({
  state: {
    likedRecipes: [],
    dislikedRecipes: [],
  },
  getters: {
  },
  mutations: {
    addToLikedRecipes(state, recipe) {
      state.likedRecipes.push(recipe)
      console.log(state.likedRecipes)
    },
    addToDislikedRecipes(state, recipe) {
      state.dislikedRecipes.push(recipe)
      console.log(state.dislikedRecipes)
    }
  },
  actions: {
    addToLikedRecipes(context, recipe) {
      context.commit('addToLikedRecipes', recipe)
    },
    addToDislikedRecipes(context, recipe) {
      context.commit('addToDislikedRecipes', recipe)
    }
  },
  modules: {
  }
})
