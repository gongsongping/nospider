<template>
  <div>
    <b-progress v-show="counter<10" :value="counter" :max="mx" show-progress animated variant="info" style="margin:10px;width:400px;"></b-progress>
  <div> {{appname}}</div>
  </div>
</template>

<script>

export default {
  asyncData ({params}) {
    return params
  },
  data (){
      return {
        counter:1,
        mx: 10,
      }
  },
  components: {
  },
  mounted (){
    const intl = setInterval(()=>{
        this.counter = this.counter+1
    },1000)

    setTimeout(()=>{
        clearInterval(intl)
    },20000)
  },
  methods: {
    
  }
}
</script>

<style>

.bgi{
  box-sizing: content-box;
  height:680px;  
  width:380px; 
  padding: 60px 20px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  margin-top:5px;
}
  
</style>