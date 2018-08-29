<template>
  <div>
    <!-- <EditThreadForm></EditThreadForm> -->
    <!-- <router-view></router-view> -->
    <v-toolbar flat color="white">
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <!-- <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn> -->
        <v-card>
          <v-card-title>
            <span class="headline">Edit Subject</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.subject" label="Subject Thread"></v-text-field>
                </v-flex>
                
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="threads"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.index + 1 }}</td>
        <td class="text-xs-center">{{ props.item.subject }}</td>
        <td class="text-xs-center">{{ props.item.createdAt }}</td>
        
        <td class="justify-center layout px-0">
            <router-link :to="`/MyThread/EditThread/${props.item._id}`">
          <v-icon
            small
            class="mr-2"  
          >
            edit
          </v-icon>
            </router-link>
          <v-icon
            small
            @click="deleteItem(props.item._id)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddThreadForm from '@/components/AddThreadForm.vue'
import EditThreadForm from '@/components/EditThreadForm.vue'

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "No",
        align: "center",
        sortable: false,
        value: "name"
      },
      { text: "Subject", align: "center", value: "calories" },
      { text: "Created", align: "center", value: "fat" },
      { text: "Actions", align: "center",value: "name", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {
      threads: '',
    },
    defaultItem: {
    //   subject: this,
    }
  }),
  props:[
      'checkData'
  ],

  computed: {
    ...mapState([
        "threads",
        "mythreads"
        ])
  },
  component:{
    //   EditThreadForm
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    mythreads:function(){
        console.log('msaas')
        this.getMyThread()
    },
    getMyThread:function(){
        return this.checkData
    }
  },

  mounted() {
    // this.initialize();
    // this.addThread();
    this.getMyThread()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.threads.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   console.log('ini edited item',this.editedItem);
      this.$store.dispatch("updateThread",item)
      this.dialog = true;
    },

    deleteItem(data) {
      this.$store.dispatch("deleteThread",data)
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.threads[this.editedIndex], this.editedItem);
        // this.addThread(this.threads[this.editedIndex],this.editItem)
      } else {
          console.log('ini edited item di save', this.editedItem.subject);
          
        this.addThread(this.editedItem);
      }
      this.close();
    },
    ...mapActions([
        'getMyThread',
        'addThread',
        'deleteThread',
        'updateThread'
    ])
  }
};
</script>

<style>
</style>
