const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)

// Build only in dev mode
// // if (config.dev) {
// // }

new Builder(nuxt).build()
.catch((error) => {
    console.error(error)
    process.exit(1)
})

app.get('/test', function  (req, res, next) {
    res.json({test:'test'})
})

app.use(nuxt.render)


app.listen(3000,'0.0.0.0',function () {
    console.log('--nuxt------listen',3000,'------');
    // nuxt.showOpen()
});

// nuxt.listen(3000, '0.0.0.0')
