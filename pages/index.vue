<template>
    
    <div class="row">
        <div class='col-md-2'>
            <div v-for="a of apps" :key='a' style='border-bottom:1px solid tomato;'>
                <nuxt-link :to="a" style='padding:3px 10px;display:block;'>
                    {{a}}
                </nuxt-link>
            </div>
        </div>
        <div class='col-md-2'> </div>
        <div class='col-md-8'>
          <nuxt-child :key='$route.params.appname'></nuxt-child>
        </div>
    </div>

</template>

<script>

export default {
  data () {
    return { 
      apps:['changeion','changev3','public2','staff2','language','cafe','zhongviet'],
    }
  },
  components: {
  },
  methods: {
    
  }
}
</script>

<style>
  
</style>