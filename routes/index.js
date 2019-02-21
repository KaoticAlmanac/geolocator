var express = require('express');
let app = express();
var router = express.Router();
let mongo = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require("path");
let request = require('request');
let Handlebars = require('hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(router);

let apikey = "cce1e25f86d4cae3b83bd873829a3618";



/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', {geoLang:1});//geolang tells the page that it will need to get the language data

    console.log("In Get Language");
    let ip = req.connection.remoteAddress;
    console.log(req.body);
    //getLocationFromIP(ip);

    Promise.all([getLocationFromIP(ip)]).then(function (data) {
        res.countryCode=data;
        next();
    });
});

router.get("/",function (req,res,next) {
    let languageSet = getLanguage(res.countryCode);
    let language = languageSet[0];
    res.langCode = languageSet[1];
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get('/:limit(\\d+)/', function (req, res, next) {
    //res.render('index', {geoLang:1});//geolang tells the page that it will need to get the language data

    console.log("In Get Language");
    let ip = req.connection.remoteAddress;
    console.log(req.body);
    //getLocationFromIP(ip);

    Promise.all([getLocationFromIP(ip)]).then(function (data) {
        res.countryCode=data;
        next();
    });
});

router.get("/:limit(\\d+)/",function (req,res,next) {
    let languageSet = getLanguage(res.countryCode);
    let language = languageSet[0];
    res.langCode = languageSet[1];
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }

        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/english/",function (req,res,next) {
    let language = "English";
    res.langCode = "en";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/english/:limit(\\d+)/",function (req,res,next) {
    let language = "English";
    res.langCode = "en";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/spanish/",function (req,res,next) {
    let language = "Spanish";
    res.langCode = "es";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/spanish/:limit(\\d+)/",function (req,res,next) {
    let language = "Spanish";
    res.langCode = "es";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/french/",function (req,res,next) {
    let language = "French";
    res.langCode = "fr";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/french/:limit(\\d+)/",function (req,res,next) {
    let language = "French";
    res.langCode = "fr";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/german/",function (req,res,next) {
    let language = "German";
    res.langCode = "de";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/german/:limit(\\d+)/",function (req,res,next) {
    let language = "German";
    res.langCode = "de";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/chinese/",function (req,res,next) {
    let language = "Chinese";
    res.langCode = "zh";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/chinese/:limit(\\d+)/",function (req,res,next) {
    let language = "Chinese";
    res.langCode = "zh";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/japanese/",function (req,res,next) {
    let language = "Japanese";
    res.langCode = "ja";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/japanese/:limit(\\d+)/",function (req,res,next) {
    let language = "Japanese";
    res.langCode = "ja";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.render('index', context);//geolang tells the page that it will need to get the language data
        });

    });
});


router.get("/api/",function (req,res,next) {
    //res.render('index', {geoLang:1});//geolang tells the page that it will need to get the language data

    console.log("In Get Language");
    let ip = req.connection.remoteAddress;
    console.log(req.body);
    //getLocationFromIP(ip);

    Promise.all([getLocationFromIP(ip)]).then(function (data) {
        res.countryCode=data;
        next();
    });
});

router.get("/api/",function (req,res,next) {
    let languageSet = getLanguage(res.countryCode);
    let language = languageSet[0];
    res.langCode = languageSet[1];
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json(context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get('/api/:limit(\\d+)/', function (req, res, next) {
    //res.render('index', {geoLang:1});//geolang tells the page that it will need to get the language data

    console.log("In Get Language");
    let ip = req.connection.remoteAddress;
    console.log(req.body);
    //getLocationFromIP(ip);

    Promise.all([getLocationFromIP(ip)]).then(function (data) {
        res.countryCode=data;
        next();
    });
});

router.get("/api/:limit(\\d+)/",function (req,res,next) {
    let languageSet = getLanguage(res.countryCode);
    let language = languageSet[0];
    res.langCode = languageSet[1];
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }

        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json(context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/english/",function (req,res,next) {
    let language = "English";
    res.langCode = "en";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json( context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/english/:limit(\\d+)/",function (req,res,next) {
    let language = "English";
    res.langCode = "en";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json(context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/spanish/",function (req,res,next) {
    let language = "Spanish";
    res.langCode = "es";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json(context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/spanish/:limit(\\d+)/",function (req,res,next) {
    let language = "Spanish";
    res.langCode = "es";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json( context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/french/",function (req,res,next) {
    let language = "French";
    res.langCode = "fr";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json(context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/french/:limit(\\d+)/",function (req,res,next) {
    let language = "French";
    res.langCode = "fr";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json(context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/german/",function (req,res,next) {
    let language = "German";
    res.langCode = "de";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json( context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/german/:limit(\\d+)/",function (req,res,next) {
    let language = "German";
    res.langCode = "de";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json(context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/chinese/",function (req,res,next) {
    let language = "Chinese";
    res.langCode = "zh";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json( context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/chinese/:limit(\\d+)/",function (req,res,next) {
    let language = "Chinese";
    res.langCode = "zh";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json( context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/japanese/",function (req,res,next) {
    let language = "Japanese";
    res.langCode = "ja";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language}).sort({pubDate:-1}).limit(50);
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json(context);//geolang tells the page that it will need to get the language data
        });

    });
});

router.get("/api/japanese/:limit(\\d+)/",function (req,res,next) {
    let language = "Japanese";
    res.langCode = "ja";
    console.log("Language: "+language);
    //get mongo articles
    //add each article to the list context.articles
    let mongoURL = "mongodb://localhost/TT";
    let articleDB = mongo.connect(mongoURL,function (err,db) {
        console.log("Connected to db");
        if(err){
            console.log("Error connecting to Mongo");
            console.log(err);
            reject(err);
        }
        let cursor = db.collection('articles').find({language:language})
            .sort({pubDate:-1}).limit(parseInt(req.params.limit));
        let context = {};
        context.articles=[];
        cursor.toArray((error,docs) =>{
            for(let i =0;i<docs.length;i++){
                context.articles.push({
                    post_link:docs[i].link,
                    post_date:docs[i].pubDate,
                    post_title:docs[i].title})
            }
            console.log("Articles");
            console.log(context.articles);
            context.langCode = res.langCode;
            res.json(context);//geolang tells the page that it will need to get the language data
        });

    });
});



function getLanguage(countryCode){
    let listOfLanguageCodes = {en:"English",es:"Spanish",de:"German",fr:"French",ja:"Japanese",zh:"Chinese"};
    //let listOfCountryCodes = fs.readFileSync(path.resolve(__dirname,"../json/countries.js"));
    let listOfCountryCodes = require("../json/countries");

    console.log("Got list of country codes");
    console.log("Current country code: "+countryCode);
    console.log(listOfCountryCodes[countryCode]);
    let languagesOfCurrentCountry = listOfCountryCodes[countryCode].languages;
    console.log("Got languages of country: ");
    console.log(languagesOfCurrentCountry);
    for(let x =0;x<languagesOfCurrentCountry.length;x++){
        if(listOfLanguageCodes[languagesOfCurrentCountry[x]]){
            //This tests to see if one of the languages the country speaks is one of the TechTarget languages
            //if it is then the if statement will go through and return the language name
            return [listOfLanguageCodes[languagesOfCurrentCountry[x]],languagesOfCurrentCountry[x]];
        }
    }
    console.log("FAILED GETTING LANGUAGE");
    return "English";
}

function getLocationFromIP(ip){
    return new Promise(function (resolve,reject) {
        request({
            url:"http://api.ipstack.com/"+ip+"?access_key="+apikey,
            json:true,
        },function(err,response,body){
            console.log("Getting ip")
            if (!err && response.statusCode === 200) {
                console.log("Resolving ip")
                console.log(body);
                resolve(body.country_code);
            }else{
                console.log("Failed to access ipstack");
                reject(err);
            }
        });
    });
}

Handlebars.registerHelper('post', function(post) {
    return post;
});

module.exports = router;
