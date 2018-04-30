const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

const bodyParser = require("body-parser");
// import {createConnection, getManager} from "typeorm";
// import cors from 'cors';
const cors = require('cors')

// We instantiate Nuxt.js with the options
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
const axios = require('axios')
const URL = require('url-parse')
const cheerio = require('cheerio');

app.use(bodyParser.json());
app.use(cors());

app.get('/test', function  (req, res, next) {
    console.log(req.query.q);
    let url = new URL('https://github.com/foo/bar');
    // {"slashes":true,"protocol":"https:","hash":"","query":"","pathname":"/foo/bar","auth":"","host":"github.com","port":"","hostname":"github.com","password":"","username":"",
    // "origin":"https://github.com","href":"https://github.com/foo/bar"}}
    res.json({test:url})

})

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// // const { window } = new JSDOM('<html></html>');
// // const { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
// const { window } = new JSDOM(`https://news.ycombinator.com/`, {
//     url: "https://news.ycombinator.com/",
//     referrer: "https://news.ycombinator.com/",
//     contentType: "text/html",
//     userAgent: "Mellblomenator/9000",
//     includeNodeLocations: true
//   });
//   var $ = require('jquery')(window);

app.post('/napi/url', async function  (req, res, next) {
    console.log('----------body-parser',req.body.url);
    if (!req.body.url){return}
    let resp = await axios.get(req.body.url)
    // console.log(resp.data);
    // let $ = cheerio.load(resp.data);
  
    // const { window } = new JSDOM(resp.data, {
    //     url: "https://news.ycombinator.com/",
    //     referrer: "https://news.ycombinator.com/",
    //     contentType: "text/html",
    //     userAgent: "Mellblomenator/9000",
    //     includeNodeLocations: true
    // });
    // let $ = require('jquery')(window);
    // $('a').each(function(i,a){console.log('------',a.href ,'---')})     

    res.json({domString: resp.data})
})


app.post('/napi/scrawl', function  (req, res, next) {
    console.log('----------body-parser-body',req.body);
    const rule = req.body.rule
    // let p = rule.start
    let url = new URL(rule.detailurl);
    let detailword = url.pathname.split('/')[1]
    let urlps = rule.urlps
    console.log('-----detailword---',detailword,'---urlps---',urlps);
    
    urlps.forEach((p, idx) => {
        console.log('-----fullurl--',rule.first+p+rule.third);
        axios.get(rule.first+p+rule.third)
        .then(function (resp) {
            console.log('-----scrawling-page--',p,'---');
            // let $ = cheerio.load(resp.data);
            // $('a').filter(`[href*=${detailword}]`).each(function(i,a){console.log('------',a.__proto__)})
            // $('tr.athing:has(td.votelinks)').each(function( index ) {
            //     var title = $(this).find('td.title > a').text().trim();
            //     var link = $(this).find('td.title > a').attr('href');
            //     fs.appendFileSync('hackernews.txt', title + '\n' + link + '\n');
            // });

            // let { window } = new JSDOM(resp.data, {
            //     url: url.origin,
            //     referrer: url.origin,
            //     contentType: "text/html",
            //     userAgent: "Mellblomenator/9000",
            //     includeNodeLocations: true
            // });
            // let $ = require('jquery')(window);

            // $('a').filter(`[href*=${detailword}]`).each(function(i,a){console.log('------',a.href)})
            
        })
    });

    // for(let i=0;i<rule.times;i++){

    // }

    res.json({ok:'ok'})

})



app.use(nuxt.render)
// Build only in dev mode
// // if (config.dev) {
// // }
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


