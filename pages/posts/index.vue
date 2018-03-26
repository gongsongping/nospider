<template>
  <h1 class="red">Hello {{ project }}!</h1>
</template>

<script>
export default {
  data () {
    return { project: 'default' }
  },
  asyncData (context) {
    // called every time before loading the component
    return { name: 'users' }
  },
//   fetch () {
//     // The `fetch` method is used to fill the store before rendering the page
//   },
//   head () {
//     // Set Meta Tags for this Page
//   },
//   // and more functionality to discover
}
</script>

<style>
.red {
  color: red;
}
</style>