<template>
<div>

  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{threads.subject}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        <v-card-title>
          <div>
            <span>{{threads.content}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

  <v-container>
    
  <v-layout v-for="(post,index) in threads.posts" :key="index">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">#{{index+1}} {{post.subject}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        <v-card-title>
          <div>
            <span>{{post.content}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    methods:{
        ...mapActions([
            'getOneThread'
        ])
    },
    computed:{
        ...mapState([
            'threads'
        ])
    },
    mounted() {
        let id = this.$route.params.id
        this.getOneThread(id)
    },
}
</script>

<style>

</style>
