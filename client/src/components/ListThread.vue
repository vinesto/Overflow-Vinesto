<template>
<v-container>
  <v-layout v-for="(thread,index) in threads" :key="index">
  <v-layout class="card-thread">
    <v-flex xs12 >
      <v-card>
        <v-card-media>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{thread.subject}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span>{{thread.content}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" :to="`/MyThread/${thread._id}`">Read Detail</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-layout>
</v-container>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    methods:{
        ...mapActions([
            'getAllThread'
        ])
    },
    computed:{
        ...mapState([
            'threads'
        ])
    },
    mounted() {
        this.getAllThread()
    },


};
</script>

<style>
.card-thread {
    padding: 10px;
}
</style>
