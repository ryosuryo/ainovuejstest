<template>
  <div class="col-md-6 offset-md-3">
    <h2>Login Sistem</h2>
    <form @submit.prevent="handleSubmit">
      <div class="row"></div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">mail_outline</i>
          <input
            class="form-control"
            id="email"
            type="email"
            v-model="username"
            name="username"
            :class="{ 'is-invalid': submitted && !username }"
          />
          <label for="email" data-error="wrong" data-success="right">Email/Username</label>
          <div v-show="submitted && !username" class="invalid-feedback">
            Email/Username Harus Diisi
          </div>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">lock_outline</i>
          <input
            v-model="password"
            name="password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && !password }"
          />
          <label for="password">Password</label>
          <div v-show="submitted && !password" class="invalid-feedback">Password Harus Diisi</div>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m12 l12 login-text">
          <input type="checkbox" id="remember-me" />
          <label for="remember-me">Remember me</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12" :disabled="status.loggingIn">
          <!-- <a href="#" class="btn waves-effect waves-light col s12">Masuk Sistem</a> -->
          <button class="btn waves-effect waves-light col s12" :disabled="status.loggingIn">
            Masuk Sistem
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  created() {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    handleSubmit() {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password });
      }
    }
  }
};
</script>

<style></style>
