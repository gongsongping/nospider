<template>
    
    <div class='box'>

        <div  class='column-1'> 
        </div>
        <div  class='column-2'> 
            <div style='padding:5px;'>列表页url</div>
            <input type='text' v-model="list.url">
            <center>  <button @click='getListDomString()'> 显示 </button> </center>

            <div style='padding:5px;'></div>
            <div style='padding:5px;'>详情页url</div>
            <input type='text' v-model="detail.url">
            <center>  <button  @click='getDetailDomString()'> 显示 </button> </center>
            <div id='selected' style='margin:5px;background-color:lightgrey;'></div>
        </div>
        <div  class='column-3'>
          <div id='list-p' >
              <div v-html="list.domString"></div>
          </div>
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
        detail: {
            url:'',
            domString: '',           
        },
        progress: 110
    }
  },
  components: {
  },
  methods: {
    async getListDomString(){
       this.progress=0 
       let res = await axios({
         url: '/napi/url',
         method:'POST',
         data:{
           url: this.list.url
         },
       })
       this.list.domString = res.data.domString
       //    console.log('client----------list', this.list.domString);
       const intl = setInterval(()=>{
          this.progress+=10
          if((this.progress>100)&&Boolean(this.detail.domString)){
            clearInterval(intl)              
          }
       },500)
    },
    async getDetailDomString(){
       this.progress=0 
       let res = await axios({
         url: '/napi/url',
         method:'POST',
         data:{
           url: this.detail.url
         },
       })
       this.detail.domString = res.data.domString
       //    console.log('client----------detail urls', this.detail.domString);
       const intl = setInterval(()=>{
          this.progress+=10
          if((this.progress>100)&&Boolean(this.detail.domString)){
            clearInterval(intl)              
          }
       },500)
    
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
    height:50vh;
    border-bottom:1px solid lightgrey;
    overflow:scroll;
}

#detail-p {
   padding: 8px;
   height:50vh;
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
    width:60px;
    padding: 10px 10px;
    margin: 10px;
    background-color: #54d0e4;
    border: none;
    border-radius: 3px;
    
}
button:hover{
    background-color: tomato;   
}
</style>