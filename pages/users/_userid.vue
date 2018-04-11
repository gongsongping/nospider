<template>
  <div style='margin:0 auto;max-width:700px;'>
    <div style='padding:8px;'>
        <div v-for='(item, index) of tweets' :key='index'  style='padding-bottom:10px;'>
          <nuxt-link :to="{ path: '/users/'+index, query: { tweet: JSON.stringify(item) }}" >  
            <div style='display:flex;flex-direction:row;'>
              <div style='display:flex;flex-direction:row;justify-content:center;align-items:center;'>
                <div style='flex:2;background-color:tomato;border-radius:50%;width:70px;height:70px;'>
                  <img :src='item.avatar_url' style='border-radius:50%;width:70px;height:70px;' />
                </div>
              </div>
              <div style='flex:8;padding-left:20px;'>
                <div>{{item.name}}</div>
                <div style='font-size:0.8em;'>2-7 13:50:22 </div>
              </div>
            </div>
          </nuxt-link>
          
          <nuxt-link :to="{ path: '/posts/'+index, query: { tweet: JSON.stringify(item) }}" >            
            <div style='padding:10px;'>
              <p style='padding:10px;line-height:1.5em;'>{{item.tweet}}</p>
            </div>
          </nuxt-link>          
          <div style='display:flex;flex-direction:row;justify-content:space-around;align-items:center;padding:20px; border-top: 0.5px solid lightgrey; border-bottom: 15px solid lightgrey;'>
            <i style='color:grey;' class='fa fa-external-link'></i>
            <i style='color:grey;' class='fa fa-folder'></i>
            <i style='color:grey;' class='fa fa-thumbs-up'></i>
          </div>
        </div>
    </div>

      <no-ssr>

            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </no-ssr>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  data () {
    return { 
      tweets:[],
    }
  },
  components: {
    InfiniteLoading,
  },
  asyncData (context) {
    return { userid: context.params, tweet: JSON.parse(context.query.tweet) }
  },
  methods: {
    infiniteHandler($state) {
      this.tweets.push(this.tweet,this.tweet,this.tweet,this.tweet,this.tweet)
    //   = this.tweets.concat(this.list)
      $state.loaded()
    },
  }
}
</script>

<style>
.red {
  color: red;
}
</style>