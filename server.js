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


const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const jsonfile = require('jsonfile')
const phantom = require('phantom');


const getjq = (JSDOM,url,html)=>{
    let { window } = new JSDOM(html, {
        url: url.origin,
        referrer: url.origin,
        contentType: "text/html",
        userAgent: "Mellblomenator/9000",
        includeNodeLocations: true
    });
    let $ = require('jquery')(window);
    return $
}

const getobj = (fds, $)=>{
    let obj = {}
    fds.forEach((f,idx)=>{
        if (f.type==='text'){ obj[f.name]=$(f.path).text() }
        if (f.type==='image'){ obj[f.name]=$(f.path).attr('src') }
        if (f.type==='link'){ obj[f.name]=$(f.path).attr('href') }
    })
    return obj
}

app.get('/test', function  (req, res, next) {
    console.log(req.query.q);
    // let url = new URL('https://github.com/foo/bar');
    // https://www.lagou.com/jobs/3928433.html
    axios.get('https://www.lagou.com/jobs/3928433.html')
    .then(function (respo) {
        console.log(respo);
        let $ = getjq(JSDOM,url,respo.data)
        // let obj = getobj(rule.fields,$)
        let txt = $('div:nth-child(22)#container.container.clearfix > div:nth-child(1).content_l.fl > dl:nth-child(1)#job_detail.job_detail > dd:nth-child(3).job_bt > div > p').text()
        // obj['url'] = a.href
        console.log('----txt----',txt);
    })

    res.json({test:'ok'})

})

app.post('/napi/url', async function  (req, res, next) {
    console.log('----------body-parser',req.body.url);
    if (!req.body.url){return}
    let resp = await axios.get(req.body.url) 

    res.json({domString: resp.data})
})


app.post('/napi/scrawl', function  (req, res, next) {
    console.log('----------body-parser-body',req.body);
    const rule = req.body.rule

    let url = new URL(rule.detailurl);
    let detailword = url.pathname.split('/')[1]
    let urlps = rule.urlps
    console.log('-----detailword---',detailword,'---urlps---',urlps,'---fields--',rule.fields);

    let objalls = []
    
    
    (async function() {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', function(requestData) {
            console.info('Requesting', requestData.url);
        });

        urlps.forEach( async function(p, idx) {
            console.log('-----scrawling-fullurl--',rule.first+p+rule.third);

            const status = await page.open(rule.first+p+rule.third);//https://stackoverflow.com/ ;//https://www.google.com
            await page.includeJs("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js")
    
            const alinks = await page.evaluate(function  () {
                //   console.log('----------title-inside', document.title);
                //   return document.title
                return $('a').filter(`[href*=${detailword}]`)
            })
            alinks.each( async function(i,a){
                console.log('----------scrawling-page--', a.href);
                const status = await page.open(a.href);
                await page.includeJs("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js")
                const ob = await page.evaluate(function  () {
                    let obj = getobj(rule.fields,$)
                    obj['url'] = a.href
                   
                    console.log('----obj----', obj);
                    return obj
                })
                jsonfile.writeFile('./tmp/test.json', ob, {flag: 'a'}, function (err) {
                    console.error(err)
                })
            })
        })

        await instance.exit();
        
    })();

    
    // urlps.forEach((p, idx) => {
    //     console.log('-----fullurl--',rule.first+p+rule.third);
    //     axios.get(rule.first+p+rule.third)
    //     .then(function (resp) {
    //         console.log('-----scrawling-page--',p,'---');
    //         // let $ = cheerio.load(resp.data);
    //         // fs.appendFileSync('hackernews.txt', title + '\n' + link + '\n');

    //         let $ = getjq(JSDOM,url,resp.data)
    //         // let $ = cheerio.load(resp.data)             

    //         $('a').filter(`[href*=${detailword}]`).each(function(i,a){
    //             console.log('------',a.href)
    //             axios.get(a.href)
    //             .then(function (respo) {
    //                 // console.log('-----detaildom',respo.data);
    //                 // let $ = getjq(JSDOM,url,respo.data)
    //                 // let obj = getobj(rule.fields,$)
    //                 // obj['url'] = a.href
                   
    //                 const $ = cheerio.load(respo.data) 
    //                 let obj = getobj(rule.fields,$)
    //                 obj['url'] = a.href
                    
    //                 // let obj = { url: a.href, html: respo.data}
    //                 // let obj = { url: a.href, comment: $('.comment').text()}
    //                 console.log('----obj----', obj);
    //                 jsonfile.writeFile('./tmp/test.json', obj, {flag: 'a'}, function (err) {
    //                     console.error(err)
    //                 })
    //             })
    //         })
            
    //     })
    // });

    
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


