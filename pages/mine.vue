<template>
<div style='margin:0 20%;padding:10px;'>
  <div>
    <b-card title="Card Title"
            img-src="https://lorempixel.com/600/300/food/5/"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </p>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>

  </div>
    <div>
      <b-btn v-b-modal.myModal>Show Modal</b-btn>
      <b-btn v-b-modal="'myModal'">Show Modal</b-btn>
      <b-modal id="myModal">
        Hello From My Modal!
      </b-modal>
    </div>
</div>
</template>

<script>
export default {
  asyncData (context) {
    return { name: context.params }
  },
}
</script>

<style>
.red {
  color: red;
}
</style>