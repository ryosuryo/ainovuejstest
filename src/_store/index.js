import Vue from "vue";
import Vuex from "vuex";
import { katalogService } from "../_services/katalog.service";
import { userService } from "../_services/user.service";
import router from "../_router";

Vue.use(Vuex);

const katalog = {
  namespaced: true,
  state: {
    all: {},
    category: {},
    product: {}
  },
  actions: {
    getAllCategory({ commit }) {
      commit("getAllCategory");

      katalogService.getListCategory().then(
        category => commit("getAllCategorySuccess", category),
        error => commit("getAllCategoryFailure", error)
      );
    },
    getProductByID({ commit }, { id, page, limit }) {
      commit("getAllProduct");
      console.log(id);
      katalogService.getProductByID(id, page, limit).then(
        product => commit("getAllProductSuccess", product),
        error => commit("getAllProductFailure", error)
      );
    }
  },
  mutations: {
    getAllCategory(state) {
      state.category = { loading: true };
    },
    getAllCategorySuccess(state, category) {
      state.category = { items: category };
    },
    getAllCategoryFailure(state, error) {
      state.category = { error };
    },
    getAllProduct(state) {
      state.product = { loading: true };
    },
    getAllProductSuccess(state, product) {
      state.product = { items: product };
    },
    getAllProductFailure(state, error) {
      state.product = { error };
    }
  }
};

const alert = {
  namespaced: true,
  state: {
    type: null,
    message: null
  },
  actions: {
    success({ commit }, message) {
      commit("success", message);
    },
    error({ commit }, message) {
      commit("error", message);
    },
    clear({ commit }) {
      commit("clear");
    }
  },
  mutations: {
    success(state, message) {
      state.type = "alert-success";
      state.message = message;
    },
    error(state, message) {
      state.type = "alert-danger";
      state.message = message;
    },
    clear(state) {
      state.type = null;
      state.message = null;
    }
  }
};

const account = {
  namespaced: true,
  // var user = JSON.parse(localStorage.getItem("user"));
  state: {
    status: {},
    user: JSON.parse(localStorage.getItem("user"))
  },
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit("loginRequest", { username });

      userService.login(username, password).then(
        user => {
          commit("loginSuccess", user);
          router.push("/");
        },
        error => {
          commit("loginFailure", error);
          dispatch("alert/error", error, { root: true });
        }
      );
    },
    logout({ commit }) {
      userService.logout();
      commit("logout");
    }
  },

  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    }
  }
};

// const store = new Vuex.Store({
export default new Vuex.Store({
  modules: {
    katalog: katalog,
    alert: alert,
    account: account
  }
});

// store.state.a; // -> `moduleA`'s state
// store.state.b; // -> `moduleB`'s state
