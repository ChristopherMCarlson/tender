import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    likedRecipes: [],
    dislikedRecipes: [],
    token: localStorage.getItem("token") || "",
    user: {},
    friendCode: "",
    friendsList: [],
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  mutations: {
    auth_success(state, token) {
      state.token = token;
    },
    auth_error(state) {
      state.token = "";
    },
    logout(state) {
      state.token = "";
    },
    addToLikedRecipes(state, recipes) {
      state.likedRecipes = recipes;
    },
    addToDislikedRecipes(state, recipes) {
      state.dislikedRecipes = recipes;
    },
    setFriendCode(state, friendCode) {
      console.log(friendCode);
      state.friendCode = friendCode;
    },
    setFriendsList(state, friendsList) {
      state.friendsList = friendsList;
    },
    authError(state) {
      state.token = "";
    },
  },
  actions: {
    async login({ commit }, user) {
      try {
        const response = await axios.post(
          "https://cmcwebdevelopment.com/tender-api/api/auth/login",
          user
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        commit("auth_success", token);
      } catch (error) {
        commit("auth_error");
        localStorage.removeItem("token");
      }
    },
    async register({ commit }, user) {
      try {
        const response = await axios.post(
          "https://cmcwebdevelopment.com/tender-api/api/auth/register",
          user
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        commit("auth_success", token);
      } catch (error) {
        commit("auth_error");
        localStorage.removeItem("token");
      }
    },
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    async addToLikedRecipes({ commit }, recipe) {
      const response = await axios.post(
        "https://cmcwebdevelopment.com/tender-api/api/likedRecipes/add",
        { recipeId: recipe.imageId }
      );
      commit("addToLikedRecipes", response.data.likedRecipes.recipes);
    },
    async getLikedRecipes({ commit }) {
      const response = await axios.get(
        "https://cmcwebdevelopment.com/tender-api/api/likedRecipes/"
      );
      commit("addToLikedRecipes", response.data.likedRecipes.recipes);
    },
    async addToDislikedRecipes({ commit }, recipe) {
      const response = await axios.post(
        "https://cmcwebdevelopment.com/tender-api/api/dislikedRecipes/add",
        { recipeId: recipe.imageId }
      );
      commit("addToDislikedRecipes", response.data.dislikedRecipes.recipes);
    },
    async getDislikedRecipes({ commit }) {
      const response = await axios.get(
        "https://cmcwebdevelopment.com/tender-api/api/dislikedRecipes/"
      );
      commit("addToDislikedRecipes", response.data.dislikedRecipes.recipes);
    },
    async getFriendCode({ commit }) {
      const response = await axios.get(
        "https://cmcwebdevelopment.com/tender-api/api/friends/code"
      );
      console.log(response.data);
      commit("setFriendCode", response.data.code);
    },
    async addFriend({ commit }, friendCode) {
      try {
        const response = await axios.post(
          "https://cmcwebdevelopment.com/tender-api/api/add",
          {
            code: friendCode,
          }
        );
        console.log(response.data.friendsList.friends);
        commit("setFriendsList", response.data.friendsList.friends);
      } catch (error) {
        console.log(error);
      }
    },
    async getFriendsList({ commit }) {
      const response = await axios.get(
        "https://cmcwebdevelopment.com/tender-api/api/friends/list"
      );
      if (response.data.friendsList) {
        commit("setFriendsList", response.data.friendsList.friends);
      } else {
        commit("setFriendsList", []);
      }
    },
    async checkToken({ commit }) {
      try {
        const response = await axios.get(
          "https://cmcwebdevelopment.com/tender-api/api/protected"
        );
        commit("auth_success", response.data.token);
      } catch (error) {
        commit("auth_error");
        localStorage.removeItem("token");
      }
    },
  },
  modules: {},
});
