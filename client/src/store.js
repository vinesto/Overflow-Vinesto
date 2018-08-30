import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    threads: [],
    mythreads: []
  },
  mutations: {
    SET_THREAD(state, payload) {
      state.threads = payload
    },
    CONFIRM_MYTHREAD(state, payload) {
      state.mythreads = payload
    }
  },
  actions: {
    register(context, data) {
      axios({
        method: "POST",
        url: "http://localhost:3000/users/register",
        data: data
      })
        .then(function (data) {
          console.log(data);
          alert('register success')
          // context.commit(data) 
        })
        .catch(function (err) {
          console.log(err.message);
          alert('register failed')
        })
    },
    login(context, data) {
      axios({
        method: "POST",
        url: "http://localhost:3000/users/login",
        data: data
      })
        .then(function (user) {
          // console.log(user);
          alert('login success')
          context.commit('CONFIRM_MYTHREAD', user.data.data)
          localStorage.setItem("token", user.data.token)
          this.$router.push('/')
        })
        .catch(function (err) {
          // console.log(err.message);
          // alert('login failed')
        })
    },
    addThread(context, data) {
      console.log('masuuk add di store', data);
      console.log('ini context di addthread store', context);
      let token = localStorage.getItem("token")
      axios({
        method: "POST",
        url: `http://localhost:3000/threads`,
        data: data,
        headers: {
          token
        }
      })
        .then(function ({ data }) {
          console.log('ini new thread', data);
          context.commit('CONFIRM_MYTHREAD', data.data)

        })
        .catch(function (err) {
          console.log('masuk error');
        })
    },
    getMyThread(context, data) {
      // console.log('masukk my thread');
      let token = localStorage.getItem("token")
      axios({
        method: "GET",
        url: `http://localhost:3000/threads/user`,
        headers: {
          token
        }
      })
        .then(function ({ data }) {
          // alert('add thread success')
          console.log('ini my thread', data);
          context.commit('SET_THREAD', data.data)
        })
        .catch(function (err) {
          console.log('ini error nya', err.message);
        })
    },
    deleteThread(context, id) {
      let token = localStorage.getItem("token")
      axios({
        method: "DELETE",
        url: `http://localhost:3000/threads/${id}`,
        headers: {
          token
        }
      })
        .then(function ({ data }) {
          // alert('Delete success')
          context.commit('CONFIRM_MYTHREAD', data.data)
          // self.$router.push('/MyArticle')
        })
        .catch(function () {
          alert('Delete failed')
          // self.$router.push('/MyArticle')
        })
    },
    updateThread(context, data) {
      console.log('masuuk update ini isi context', context);
      console.log('masuuk update ini id', data._id);

      let token = localStorage.getItem("token")
      axios({
        method: "PUT",
        url: `http://localhost:3000/threads/${data._id}`,
        headers: {
          token
        },
        data: {
          subject: data.subject,
          content: data.content
        }
      })
        .then(function ({ data }) {
          context.commit('CONFIRM_MYTHREAD', data.data)
        })
        .catch(function (err) {
          alert('Update failed')
          console.log(err.message);
        })
    },
    getOneThread(context, id) {
      let token = localStorage.getItem("token")
      axios({
        method: "GET",
        url: `http://localhost:3000/threads/${id}`,
        headers: { token }
      })
        .then(function ({ data }) {
          console.log('ini data dari get one', data);
          context.commit('SET_THREAD', data.data)
        })
    },
    getAllThread(context, data) {
      // let token = localStorage.getItem("token")
      axios({
        method: "GET",
        url: `http://localhost:3000/threads`,
        // headers: { token }
      })
        .then(function ({ data }) {
          console.log('ini data data all thread', data, data);
          context.commit('SET_THREAD', data.data)
        })
        .catch(function (err) {
          console.log('find all thread failed')
        })
    },
    addThreadPost(context, data) {
      let token = localStorage.getItem("token")
      axios({
        method: "POST",
        url: `http://localhost:3000/posts/${data._id}/articles`,
        data: {
          subject: data.subject,
          content: data.content
        },
        headers: { token }
      })
      .then(function ({ data }) {
        context.commit('CONFIRM_MYTHREAD',data.data)
      })
      .catch(function(err){
        alert("add post failed", err.message)
      })
    },
    upVoteThread(context,data){
      let token = localStorage.getItem("token")
      axios({
        method:"POST",
        url:`http://localhost:3000/votes/up/threads/${data._id}`,
        headers:{token}
      })
      .then(function({data}){
        context.commit('CONFIRM_MYTHREAD',data.data)
      })
      .catch(function(err){
        alert("add upvotes failed", err.message)
      })
    }
  }
})
