<template>
    <div class="container">
        <h1 class="title">
            <router-link to="/MyThread">MyThread</router-link>
        </h1>
        <h2 class="subtitle">
        <router-link to="/MyThread/AddThread" @new-thread="getData">Add new thread</router-link>
        </h2>
        <router-view></router-view>
        <br>
        <MyThreadTable :checkData="newThread"></MyThreadTable>
    </div>
</template>

<script>
import MyThreadTable from '@/components/MyThreadTable.vue'
import {mapState,mapActions} from 'vuex'

export default {
    components:{
        MyThreadTable
    },
    data:function(){
        return{
            newThread:''
        }
    },
    methods:{
        getData(data){
            this.newThread = data
        },
    }
}
</script>

<style>

</style>
