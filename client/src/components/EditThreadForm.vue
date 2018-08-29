<template>
    <div class="container">
        <h1>Edit Thread Form</h1>
    <v-form ref="form" >
    <v-text-field
      v-model="threads.subject"
      label="Subject"
      required
    ></v-text-field>
    <wysiwyg v-model="threads.content" label="Content" />
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
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("updateThread",this.threads );
      }
    },
    ...mapActions(["updateThread", "getOneThread"]),
    clear() {
      this.$refs.form.reset();
    }
  },
  computed: {
    ...mapState([
        'threads'
    ])
  },
  mounted() {
      let id = this.$route.params.id
      this.getOneThread(id)
  },
};
</script>

<style>
</style>
