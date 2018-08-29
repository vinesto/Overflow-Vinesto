<template>
<div class="container">
    <h1>Login Form</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
        :append-icon="show3 ? 'visibility_off' : 'visibility'"
        v-model="password"
        :rules="[passwordRules.required , passwordRules.min]"
        :type="show3 ? 'text' : 'password'"
        name="input-10-2"
        hint="At least 6 characters"
        class="input-group--focused"
        @click:append="show3 = !show3"
        label="Password"
        required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</div>
</template>

<script>
import axios from "axios";
import {mapState, mapActions} from 'vuex'

export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    show3:false,
    passwordRules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 6 || "Min 6 characters"
    },
    select: null,
    items: ["Item 3"],
    checkbox: false
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        let data = {
            email: this.email,
            password: this.password
        }
        this.$store.dispatch('login',data)
        this.$emit('user-login',data)
        // this.$router.go('/')
        this.$router.push('/')
        // console.log(this.$router);
        
      }
    },
    ...mapActions([
        'login'
    ]),
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
</style>
