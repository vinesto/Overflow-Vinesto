<template>
<div>
    <div class="container">
    <h1>Ini form bwat post</h1>
    <v-form ref="form" >
    <v-text-field
      v-model="subject"
      label="Subject"
      required
    ></v-text-field>
    <wysiwyg v-model="content" label="Content" />
    <v-btn @click="submit">
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: function() {
    return {
      subject: "",
      content: "",
      newPost: ""
    };
  },
  methods: {
    ...mapActions(["addThreadPost", "upVoteThread"]),
    submit() {
      if (this.$refs.form.validate()) {
        let data = {
          subject: this.subject,
          content: this.content
        };
        this.$store.dispatch("addThreadPost", data);
      }
    }
  },
  computed: {
    ...mapState(["threads"])
  }
};
</script>

<style>
</style>
