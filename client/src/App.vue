<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->

      <div id="app">
        <v-app id="inspire">
          <v-toolbar>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <div v-if="isLogin">
              <v-btn flat to="/">Home</v-btn>
              <v-btn flat to="/" v-on:click="logout">Logout</v-btn>
              <v-btn flat to="/MyThread">My Thread</v-btn>
              </div>
              <div v-else-if="!isLogin">
              <v-btn flat to="/">Home</v-btn>
              <v-btn flat to="/about">About</v-btn>
              <v-btn flat to="/login">Login</v-btn>
              <v-btn flat to="/register">Register</v-btn>
              </div>
            </v-toolbar-items>
          </v-toolbar>
          <router-view @user-login="userLogin"/>
        </v-app>
    </div>

      <!-- </div>
<router-view/>
    </div> -->
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data: function() {
    return {
      user: "",
      isLogin: false,
      token: localStorage.getItem("token")
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      alert("logout success");
      this.isLogin = false;
      this.$router.push("/");
    },
    userLogin(user) {
      this.user = user;
    }
  },
  watch: {
    user: function() {
      this.isLogin = true;
    }
    // register:this.register(),
    // logout:this.logout()
  },
  created() {
    if(this.token) {
      this.isLogin = true
    }
  }
};
</script>
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
