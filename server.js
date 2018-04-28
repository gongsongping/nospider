const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)

// Build only in dev mode
// // if (config.dev) {
// // }


app.get('/test', function  (req, res, next) {
    res.json({test:'test'})
})

app.use(nuxt.render)

new Builder(nuxt).build()
.then(function () {
    console.log('-----build over------');
      app.listen(3000,'0.0.0.0',function () {
        console.log('--nuxt------listen',3000,'------',config.dev);
    });
})
.catch((error) => {
    console.error(error)
    process.exit(1)
})

// setTimeout(()=>{
  
// },8000)

// nuxt.listen(3000, '0.0.0.0')
