<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <!-- <h1 class="display-4">Aino Technical Test</h1> -->
          <!-- <p class="lead">Test Masuk Aino - Damar Suryo Sasono</p> -->
        </div>
        <div class="col-sm-12">
          <div v-if="alert.message" :class="'alert ' + alert.type">{{ alert.message }}</div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  },
  watch: {
    $route() {
      // clear alert on location change
      this.clearAlert();
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
