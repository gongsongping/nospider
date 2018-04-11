<template>
<div style='margin:0 20%;padding:10px;'>
  <center style='padding:10px'>
    <b-button @click="hisp" variant="primary">p</b-button>
    <b-button @click="hisr" variant="primary">r</b-button>
    <b-btn v-b-modal.myModal>Show Modal</b-btn>
    <b-btn v-b-modal="'myModal'">Show Modal</b-btn>
    <b-modal id="myModal">
      Hello From My Modal!
    </b-modal>
  </center>

  <div style='text-align:center;'>
    <textarea v-model="content" id="" cols="30" rows="5"></textarea>
    <div>
      <b-button @click="sendPost" variant="primary">提交</b-button>    
    </div>
  </div>
  <div style='padding:10px;'>
      <div v-for='(item, index) of posts' :key='index'  style='padding:10px 0px;border-bottom:0.5px solid lightgrey;'>   
          <p style='margin:0px;'>
            {{item.content}}
          </p>

      </div>
  </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  
</div>
</template>

<script>
import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    InfiniteLoading
  },
  async asyncData (context) {
    console.log('-------isDeve?',context.isDev);
    // axios.defaults.baseURL = context.env.baseURL;
    context.isDev? (axios.defaults.baseURL = 'http://localhost:3001'):(axios.defaults.baseURL = 'http://gongsongping.com')
    // let url = context.env.baseUrl+'/posts'
    let res  = await axios.get('/xapi/posts?skip=0')
    console.log(res.data);
    return { posts: res.data }
    // return { name: context.params }
  },
  data(){
     return {content:'', skip: 0}
  },
  methods:{
    async sendPost(){
      //  console.log(this.$nuxt,'----',this.$router);    
       let res = axios({
         url: '/xapi/posts',
         method:'POST',
         data:{
           content: this.content
         },
       })
      //  history.go(0)
      this.$nuxt.$router.go()
    },
    async infiniteHandler($state) {
       this.skip = this.skip+1
       let res  = await axios.get('/xapi/posts?skip='+this.skip)
       console.log(res.data);
       this.posts = this.posts.concat(res.data)
       $state.loaded()
    },
    hisp(to){
       history.pushState({},null,'/nuxta/posts/0?tweet=%7B"name"%3A"聪聪","avatar_url"%3A"https%3A%2F%2Fs3.amazonaws.com%2Fuifaces%2Ffaces%2Ftwitter%2Fladylexy%2F128.jpg","images"%3A"https%3A%2F%2Fs3.amazonaws.com%2Fuifaces%2Ffaces%2Ftwitter%2Fladylexy%2F128.jpg","tweet"%3A"评论里留下你的〖生日和所在地〗。看到有缘的就找ta聊聊呗！遇到同一天生日的，互粉一个，以后过生日就不孤单啦！"%7D')
       history.pushState({},null,'/nuxta/posts/0?tweet=%7B"name"%3A"聪聪","avatar_url"%3A"https%3A%2F%2Fs3.amazonaws.com%2Fuifaces%2Ffaces%2Ftwitter%2Fladylexy%2F128.jpg","images"%3A"https%3A%2F%2Fs3.amazonaws.com%2Fuifaces%2Ffaces%2Ftwitter%2Fladylexy%2F128.jpg","tweet"%3A"评论里留下你的〖生日和所在地〗。看到有缘的就找ta聊聊呗！遇到同一天生日的，互粉一个，以后过生日就不孤单啦！"%7D')
      //  history.pushState({},null,to)
      //  history.replaceState({},null,'/posts/0?tweet=%7B"name"%3A"聪聪","avatar_url"%3A"https%3A%2F%2Fs3.amazonaws.com%2Fuifaces%2Ffaces%2Ftwitter%2Fladylexy%2F128.jpg","images"%3A"https%3A%2F%2Fs3.amazonaws.com%2Fuifaces%2Ffaces%2Ftwitter%2Fladylexy%2F128.jpg","tweet"%3A"评论里留下你的〖生日和所在地〗。看到有缘的就找ta聊聊呗！遇到同一天生日的，互粉一个，以后过生日就不孤单啦！"%7D')
      //  history.replaceState({},null,to)
    },
    hisr(to){
      //  history.pushState({},null,to)
      //  history.pushState({},null,to)
       history.replaceState({},null,'/nuxta/posts/0?tweet=%7B"name"%3A"聪聪","avatar_url"%3A"https%3A%2F%2Fs3.amazonaws.com%2Fuifaces%2Ffaces%2Ftwitter%2Fladylexy%2F128.jpg","images"%3A"https%3A%2F%2Fs3.amazonaws.com%2Fuifaces%2Ffaces%2Ftwitter%2Fladylexy%2F128.jpg","tweet"%3A"评论里留下你的〖生日和所在地〗。看到有缘的就找ta聊聊呗！遇到同一天生日的，互粉一个，以后过生日就不孤单啦！"%7D')
       history.replaceState({},null,'/nuxta/posts/0?tweet=%7B"name"%3A"聪聪","avatar_url"%3A"https%3A%2F%2Fs3.amazonaws.com%2Fuifaces%2Ffaces%2Ftwitter%2Fladylexy%2F128.jpg","images"%3A"https%3A%2F%2Fs3.amazonaws.com%2Fuifaces%2Ffaces%2Ftwitter%2Fladylexy%2F128.jpg","tweet"%3A"评论里留下你的〖生日和所在地〗。看到有缘的就找ta聊聊呗！遇到同一天生日的，互粉一个，以后过生日就不孤单啦！"%7D')
      //  history.replaceState({},null,to)
    },
  }
}
</script>

<style>
.red {
  color: red;
}
</style>