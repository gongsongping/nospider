<template>
    
    <div class='box'>

        <div  class='column-1'> 
        </div>
        <div  class='column-2' style="overflow-y:scroll;">             
            <div style="text-align:right;">
                <button @click="beginScrawl()" id="beginbtn">开始抓取</button> 
            </div> 

            <h4 style='text-align:center;'>翻页-pagination</h4>
            <div style="text-align:right;">  <button  @click="guidePagi=!guidePagi" > <span v-show="guidePagi">关闭</span>使用指南 <span v-show="!guidePagi">....</span> </button>  </div>               
            <div v-show="guidePagi" style="background-color:#cceff6;padding:5px;font-size:0.8em;">
               <p> 抓取数据前请仔细研究要抓取的 url, 大部分网站的 url 都是有规律的 </p>
               <p>翻页-pagination有两种形式, 如下: </p> 
               <p> 1.如 https://news.ycombinator.com/news?p=<span style="color:tomato;">2</span>&fi=no,  https://news.ycombinator.com/news?p=<span style="color:tomato;">3</span>&fi=no </p>
               <p> 此时url的前段是 https://news.ycombinator.com/news?p=, 变化段是 <span style="color:tomato;">[2,3]</span>, 后段是 &fi=no </p> 
               <p> 2.如 https://www.lagou.com/zhaopin/Java/<span style="color:tomato;">4</span>/?filterOption=3, https://www.lagou.com/zhaopin/Java/<span style="color:tomato;">5</span>/?filterOption=3 </p>
               <p> 此时url的前段是  https://www.lagou.com/zhaopin/Java/, 变化段是<span style="color:tomato;">[4,5]</span> , 后段是 /?filterOption=3 </p>
            
            </div>
            <div style="padding-left:10px;margin-bottom:5px;">
                <h5 >1. url前段</h5>
                <input @input="paginations()" type='text' v-model="rule.first">

                <h5> 2. url变化段</h5>
                <div style="display:flex;align-items;center;">
                    起始: <input @input="paginations()" type='number' v-model="rule.start" style="padding-left:5px;">
                    间隔: <input @input="paginations()" type='number' v-model="rule.step" style="padding-left:5px;">
                    次数: <input @input="paginations()" type='number' v-model="rule.times" style="padding-left:5px;">
                </div>

                <h5>3. url后段(没有可以空白)</h5>
                <input @input="paginations()" type='text' v-model="rule.third">
                <div v-show="rule.generatefi" style="background-color:#cceff6;margin:5px;padding:5px;font-size:0.8em;">
                    将产生如下urls, 检查是否如预期  <span @click="rule.generatefi=false" style="margin-left:30px;background-color:tomato;font-size:1.2em;display:inline-block;padding:5px;">确定</span><br>
                  <div> urlps: {{rule.urlps}} </div>
                   <p>{{rule.first}}<span style="color:tomato;">{{rule.urlps[0]}}</span>{{rule.third}}</p>
                   <p v-if="rule.urlps[1]">{{rule.first}}<span style="color:tomato;">{{rule.urlps[1]}}</span>{{rule.third}}</p>
                   <p v-if="rule.urlps[2]">{{rule.first}}<span style="color:tomato;">{{rule.urlps[2]}}</span>{{rule.third}}</p>
                   <p style="text-align:center;">...........</p>
                </div>
            </div>
            
            <hr>
            <h4 style='text-align:center;'>抓取字段</h4>
            <button @click="rule.fields.push({name:'',path:'',type:'text'})"> 添加字段 </button>                
            <table>
               <tr> <th>字段名</th> <th>css选择器</th> <th>类型</th> <th>删除</th> </tr>
              <tr  v-for="(f,index) in rule.fields" :key="index">
                 <td> <input type='text' v-model="f.name" style="max-width: 70px; margin: 0; border:0.5px solid lightgrey;"></td>
                 <td> <input type='text' @input="checkCss(f)" v-model="f.path" style="max-width: 140px; margin: 0; border:0.5px solid lightgrey;">  </td>
                 <td> 
                     <select @change="checkCss(f)" v-model="f.type">
                        <option value="text"> 文本 </option>
                        <option value="image"> 图片链接 </option>
                        <option value="link"> 链接 </option>
                     </select> 
                </td>
                <td @click="rule.fields.splice(index,1)">
                 <span style="margin-left:5px;color:tomato;">x</span>
                </td>
              </tr>
            
            </table>
            
         </div>
        <div  class='column-3'>
            <div style="display:flex;align-items;center;margin-top:5px;">
                <h5 style='text-align:center;'>列表页&nbsp;&nbsp;</h5>
                <input  @change='getListDomString()' type='text' v-model.lazy="rule.listurl" class="list-detail-input">
                <center>  <button @click='getListDomString()'> 显示&nbsp;v </button> </center>   
            </div>
          <div id='list-p' >
              <div v-html="list.domString"></div>
          </div>

          <center>
            <progress v-if="progress < 100" :value="progress" max="100" style="width:60%;"></progress>
          </center>
          <div id='selected' style='margin:5px;background-color:#b0e9f3;'></div>
          <div style="display:flex;align-items;center;">
                <h5 style='text-align:center;'>详情页&nbsp;&nbsp;</h5>
                <input @change='getDetailDomString()' type='text' v-model="rule.detailurl" class="list-detail-input">
                <center>  <button @click='getDetailDomString()'> 显示&nbsp;v </button> </center>   
          </div>
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
        detail: {
            url:'',
            domString: '',           
        },
        rule :{
            project:'test',
            first: '',
            third: '',
            start: 1,
            step: 1,
            times: 3,
            generated:[],
            generatefi: false,
            urlps: [],
            listurl:'',
            detailurl: '',
            fields: [{name:'',path:'',type:'text'}],
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
           url: this.rule.listurl
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
           url: this.rule.detailurl
         },
       })
       this.detail.domString = res.data.domString
       //    console.log('client----------detail urls', this.detail.domString);
    
    },
    paginations (){
       if (!this.rule.first){ return}
       if (!this.rule.start){ return}
       if (!this.rule.step){ return}
       if (!this.rule.times){ return}

       this.rule.urlps = []
       let p=parseInt(this.rule.start)
       
       for (let i=0;i<parseInt(this.rule.times);i++){
           this.rule.urlps.push(p)
           p+=parseInt(this.rule.step)
       }

    //    this.rule.generated = [`${this.rule.first}${this.rule.urlps[0]}${this.rule.third}`,`${this.rule.first}${this.rule.urlps[1]}${this.rule.third}`,'..........']
       this.rule.generatefi = true
    },
    checkCss (f){
        try {
            document.querySelector(f.path);
        } catch (e) {
            alert(f.name+'字段css选择器错误无效')
        }       
        if (document.querySelector(f.path)===null) {alert(f.name+'字段css选择器无效'); return}
        if (f.type==='image'){
                // if (f.path.indexOf('> img') < 0 ){ alert(f.name+'字段css选择器里没有图片image'); return }
            let last = f.path.split('>').reverse()[0].trim().slice(0,3)
            if (last!=='img') { alert(f.name+'图片选择器最后一个元素应该为img' ) }
        }
        if (f.type==='link'){
                // if (f.path.indexOf('> a') < 0){ alert(f.name+'字段css选择器里没有有效链接a'); return }
            let last = f.path.split('>').reverse()[0].trim()[0]
            if (last!=='a') { alert(f.name+'链接选择器最后一个元素应该为a' ) }
        }
    },
    async beginScrawl(){
        if (!this.rule.first){alert('url前段不能为空'); return}
        // if (!this.rule.third){alert('url后段不能为空'); return}
        if (!this.rule.start){alert('起始不能为空'); return}
        if (!this.rule.step){alert('间隔不能为空'); return}
        if (!this.rule.times){alert('次数不能为空'); return}
        if (!this.rule.detailurl){alert('详情页url不能为空'); return}
        if (!this.rule.listurl){alert('列表页url不能为空'); return}
       
        this.rule.fields.forEach(function(f,i){
            if (!f.name){alert('第'+(i+1)+'字段名字不能为空'); return}
            if (!f.path){alert('第'+(i+1)+'字段css选择器不能为空'); return}
            try {
                document.querySelector(f.path);
            } catch (e) {
                alert('第'+(i+1)+'字段css选择器错误无效')
            }       
            if (document.querySelector(f.path)===null) {alert('第'+(i+1)+'字段css选择器无效'); return}
            if (f.type==='image'){
                  if (f.path.indexOf('> img') < 0 ){ alert('第'+(i+1)+'字段css选择器里没有图片image'); return }
            }
            if (f.type==='link'){
                  if (f.path.indexOf('> a') < 0){ alert('第'+(i+1)+'字段css选择器里没有有效链接a'); return }
            }
        })
        
        let res = await axios({
            url: '/napi/scrawl',
            method:'POST',
            data:{
               rule: this.rule
            },
        })

    }
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
    height:130vh;    
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

.list-detail-input {
    margin:0;
    padding:2px;
    height:20px;
    border:0.5px solid lightgrey;
    width:70%;
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
#beginbtn {
    background-color:tomato;
    
}
#beginbtn:hover {
    background-color:#54d0e4;
    
}

table, td, th {    
    border: 1px solid #ddd;
    text-align: left;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    padding: 2px;
}
th:nth-child(1), td:nth-child(1) {
    width: 25%;
}
th:nth-child(2), td:nth-child(2) {
    width: 50%;
}
th:nth-child(3), td:nth-child(3) {
    width: 25%;
}

p:nth-of-type(odd){
    background-color: snow;
}

</style>