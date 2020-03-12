<template>
  <div id="app">
    <router-view name='app'/>
  </div>
</template>

<script>
import {demo} from './api/api'
export default {
  data(){
    return{}
  },
  provide(){
    return{
      boxHeightInit:this.boxHeightInit
    }
  },
  created() {
    this.$store.commit('setWindowH',document.documentElement.clientHeight);
  },
  methods:{
    boxHeightInit(){
      let { windowHeight } = this.$store.state;
      let box = document.querySelectorAll(".box");
      box.forEach((v,i)=>{
        v.style.height = windowHeight - 120 - 35 + "px";
      })
      return windowHeight - 120 - 35;
    },

  }
}
</script>

<style>

</style>
