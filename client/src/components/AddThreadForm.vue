<template>
    <div class="container">
        <h1>Add New Thread Form</h1>
    <v-form ref="form" >
    <v-text-field
      v-model="subject"
      label="Subject"
      required
    ></v-text-field>
    <wysiwyg v-model="content" label="Content" />
    <v-btn
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: function() {
    return {
      subject: "",
      content:"",
      newThread: ""
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        let data = {
          subject: this.subject,
          content: this.content
        };
        this.$store.dispatch("addThread", data);
      }
    },
    ...mapActions(["addThread"]),
    clear() {
      this.$refs.form.reset();
    }
  },
  computed: {
    ...mapState(["threads"])
  }
};
</script>

<style>
</style>
