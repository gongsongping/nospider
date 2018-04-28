<template>
    
    <div class="row">

        <div class='col-sm-2'  style=''> 
        </div>
        <div class='col-sm-4'  style='background-color:#e5f5f8; height:100vh; border-left:1px solid lightgrey;'> 
            <b-input-group prepend="列表页url">
                <b-form-input v-model="list.url"></b-form-input>
                <b-input-group-append>
                <b-btn @click='getListDomString()' variant="info">go</b-btn>
                </b-input-group-append>
            </b-input-group>
            <b-input-group prepend="详情页url">
                <b-form-input  v-model="detail.url"></b-form-input>
                <b-input-group-append>
                <b-btn  @click='getDetailDomString()' variant="info">go</b-btn>
                </b-input-group-append>
            </b-input-group>

        </div>
        <div class='col-sm-6' style='height:100vh;border-left:1px solid lightgrey;'>
          <div id='list-p' style='width:100%;height:50%;'>
          </div>
          <div id='detail-p' style='width:100%;height:50%;'>
          </div>
        </div>
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
        }
    }
  },
  components: {
  },
  methods: {
    async getListDomString(){
       let res = await axios({
         url: '/napi/url',
         method:'POST',
         data:{
           url: this.list.url
         },
       })
       this.list.domString = res.data.domString
       console.log('client----------list', this.list.domString);
    },
    async getDetailDomString(){
       let res = await axios({
         url: '/napi/url',
         method:'POST',
         data:{
           url: this.detail.url
         },
       })
       this.detail.domString = res.data.domString
       console.log('client----------detail urls', this.detail.domString);
    },
  }
}
</script>

<style>
  
</style>