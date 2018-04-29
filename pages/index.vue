<template>
    
    <div class='box'>

        <div  class='column-1'> 
        </div>
        <div  class='column-2'> 
            <h4 style='text-align:center;margin-top:10px;'>列表页url</h4>
            <div style="display:flex;align-items;center;">
            
                <input type='text' v-model="list.url" style="width:70%;">
                <center>  <button @click='getListDomString()'> 显示&nbsp;>> </button> </center>   
            </div>

            <h4 style='text-align:center;'>详情页url</h4>
            <div style="display:flex;align-items;center;">
                <input type='text' v-model="detail.url" style="width:70%;">
                <center>  <button  @click='getDetailDomString()'> 显示&nbsp;>> </button> </center>   
            
            </div>
            <h4 style='text-align:center;'>翻页-pagination</h4>
            <div style="text-align:right;">  <button  @click="guidePagi=!guidePagi" > <span v-show="guidePagi">关闭</span>使用说明 <span v-show="!guidePagi">....</span> </button>  </div>               
            <div v-show="guidePagi" style="background-color:#54d0e4;padding:5px;">
                抓取数据前请仔细研究要抓取的 url, 大部分网站的 url 都是有规律的 <br>
                翻页-pagination有两种形式, 如下: <br>
                1.如 https://news.ycombinator.com/news?p=2&fi=no <br>
                此时url的前半段是 https://news.ycombinator.com/news?p=, 变化段是 2, 后半段是 &fi=no <br>
                2.如 https://www.lagou.com/zhaopin/Java/4/?filterOption=3 <br>
                此时url的前半段是  https://www.lagou.com/zhaopin/Java/, 变化段是 4, 后半段是 /?filterOption=3
            
            </div>
            <div style="padding-left:10px;">
                <h5 >url前半段</h5>
                <input type='text' v-model="rule.first">
                <h5> url变化段</h5>
                <div>起始 <input type='number' v-model="rule.start" style="width:40%;padding-left:10px;"></div>
                <div>间隔 <input type='number' v-model="rule.step" style="width:40%;padding-left:10px;"></div>
                <div>次数 <input type='number' v-model="rule.times" style="width:40%;padding-left:10px;"></div>
                <h5>url后半段(没有可以空白)</h5>
                <input type='text' v-model="rule.third">
            </div>
            <h4 style='text-align:center;'>详情页链接路径</h4>
            <div style="align-items;center;">
                <p style="font-size: 0.7em;">请在右上方的列表页点击详情页链接所在位置, 并复制路径到下面输入框</p>
                <div>
                    <input type='text' v-model="rule.detailPath" >
                </div>
            </div>   
            <h4 style='text-align:center;'>抓取字段</h4>
                        
         </div>
        <div  class='column-3'>
          <div id='list-p' >
              <div v-html="list.domString"></div>
          </div>
            <div id='selected' style='margin:5px;background-color:#b0e9f3;'></div>
          <center>
            <progress v-if="progress < 100" :value="progress" max="100" style="width:60%;"></progress>
          </center>
          <div id='detail-p'>
              <div v-html="detail.domString"></div>

          </div>
        </div>
       <script>
        window.addEventListener('load', function () {
            $.fn.fullSelector = function () {
                var path = this.parents().addBack();
                var quickCss = path.get().map(function (item) {
                    var self = $(item),
                        id = item.id ? '#' + item.id.trim() : '',
                        clss = item.classList.length ? item.classList.toString()
                        // .split(' ')
                        .split(/(\s+)/).filter( function(e) { return e.trim().length !== 0 } )
                        .map(function (c) {
                            return '.' + c;
                        }).join('') : '',
                        name = item.nodeName.toLowerCase(),
                        index = self.siblings(name).length ? ':nth-child(' + (self.index() + 1) + ')' : '';
                        // console.log( item.classList.toString());
                    if (name === 'html' || name === 'body') {
                        return name;
                    }
                    return name + index + id + clss;

                }).slice(10).join(' > ');

                return quickCss;
            };

            // click on part of the page to see the CSS selector

            $('#list-p, #detail-p').on('click', function (e) {
                console.log(e.target)
                e.preventDefault();
                $('#selected').html($(e.target).fullSelector());
            })
       })      
     </script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
    </div>

</template>

<script>
// import axios from '~/plugins/axios';
import axios from 'axios';

export default {
  data () {
    return { 
        list: {
            url:'',
            domString: '',
        },
        rule :{
             first: '',
            third: '',
            start:1,
            step: 1,
            times: 5,
            detailPath: '',
            fields: [],
        },
        detail: {
            url:'',
            domString: '',           
        },
        progress: 102,
        guidePagi: false,
        guideHome: false, 
    }
  },
  components: {
  },
  methods: {
    async getListDomString(){
       this.progress=0 
       const intl = setInterval(()=>{
          this.progress+=10
          if((this.progress>100)&&Boolean(this.list.domString)){
            clearInterval(intl)              
          }
       },500)
       let res = await axios({
         url: '/napi/url',
         method:'POST',
         data:{
           url: this.list.url
         },
       })
       this.list.domString = res.data.domString
       //    console.log('client----------list', this.list.domString);
    },
    async getDetailDomString(){
       this.progress=0 
       const intl = setInterval(()=>{
          this.progress+=10
          if((this.progress>100)&&Boolean(this.detail.domString)){
            clearInterval(intl)              
          }
       },500)
       let res = await axios({
         url: '/napi/url',
         method:'POST',
         data:{
           url: this.detail.url
         },
       })
       this.detail.domString = res.data.domString
       //    console.log('client----------detail urls', this.detail.domString);
    
    },
  }
}
</script>

<style>
.box {
    width: 100vw;
}
.column-1 {
    display: inline-block;
    width:10vw;
    vertical-align: top; 
}
.column-2 {
    display: inline-block;
    width:24vw;
    background-color:#e5f5f8; 
    vertical-align: top;
    border-left:1px solid lightgrey;
    padding:1px;
    height:100vh;    
}

.column-3{
    display: inline-block;
    width:64vw;
    vertical-align: top;
    border-left:1px solid lightgrey;
}

#list-p {
    padding: 8px;
    height:40vh;
    border-bottom:1px solid lightgrey;
    overflow:scroll;
}

#detail-p {
   padding: 8px;
   height:60vh;
   overflow:scroll;
}
input{
    width: 90%;
    padding: 3px 8px;
    margin:5px;
    min-height: 25px;
    border: none;
    border-radius: 3px;
}
button {
    min-width:60px;
    padding: 5px;
    margin: 5px;
    background-color: #54d0e4;
    border: none;
    border-radius: 3px;
    
}
button:hover{
    background-color: tomato;   
}
</style>