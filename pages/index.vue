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
          
          <nuxt-link :to="{ path: '/posts/'+index, query: { tweet: JSON.stringify(item) }}">            
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

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue';
import InfiniteLoading from 'vue-infinite-loading';
// import { Card } from 'bootstrap-vue/es/components';

export default {
  components: {
    AppLogo,
    InfiniteLoading,
    // Card,
  },
  data () {
    return { 
      tweets:[],
      list: [
        {
          name: '聪聪',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          images: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          tweet: '评论里留下你的〖生日和所在地〗。看到有缘的就找ta聊聊呗！遇到同一天生日的，互粉一个，以后过生日就不孤单啦！'
        },
        {
          name: '慕小白',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          images: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          tweet: '说一件你经历的，最幸运爆棚的事！！！让我们沾沾喜气！出生前追上卵子那次不算 ​​​ ​​​​'
        },
        {
          name: '龙仔',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
          images: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
          tweet: '低潮时没有，但生死悠关时有一句话很给力，13年出车祸的那天，我被120送到医院，快失去意识的时候，我感觉我的眼睛像虚焦的镜头一样，什么都是模糊的，能看的稍微清楚点的以及现在唯一能记在脑海里的就是医生和护士的白大褂。然后模糊的听见一句话，不知道是谁说的“赶紧的吧！你妈买彩票中奖了！” '
        },
        {
          name: '妻弄',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          images: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          tweet: '以前我很怕得罪人，不敢迟到，不敢要求，不敢说错话，怕冷场，怕对方不高兴，诚惶诚恐的面对所有人。遗憾的是，我并没有得到相应的尊重。后来，我开始宠爱和迁就自己，你迟到我先走，不想做绝不勉强，冷场就玩手机，多顾个人感受，其他人关我屁事。然后发现，我不但被重视，而且更开心了。——易术 '
        },
        {
          name: '妻弄',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          images: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          tweet: '以前我很怕得罪人，不敢迟到，不敢要求，不敢说错话，怕冷场，怕对方不高兴，诚惶诚恐的面对所有人。遗憾的是，我并没有得到相应的尊重。后来，我开始宠爱和迁就自己，你迟到我先走，不想做绝不勉强，冷场就玩手机，多顾个人感受，其他人关我屁事。然后发现，我不但被重视，而且更开心了。——易术 '
        }
      ]
    }
  },
  asyncData (context) {
    // console.log(context); 
    return { name: 'index' }
  },
  methods: {
    infiniteHandler($state) {
      this.tweets = this.tweets.concat(this.list)
      $state.loaded()
      // this.$nuxt.$router.replace({ path: '/mine' })
    },
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
