var express = require('express'),
	partials = require('express-partials'),
    pjax = require('express-pjax'),
    app = express();

// Configuration
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
	app.use(express.logger('dev'));
    app.set('views', __dirname + '/views');
    
    // see http://github.com/visionmedia/ejs
    app.set('view engine', 'ejs');
    
    // see http://github.com/publicclass/express-partials
    app.use(partials());
    
    // see http://github.com/dakatsuka/express-pjax
    app.use(pjax());
    
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public', {redirect: false}));
 });

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

// Routes
app.get('/', function(req, res) {
    console.log('--------[ request for / ]--------');
    res.renderPjax('index');
});

app.get('/with-image', function(req, res) {
    console.log('--------[ request for /with-image ]--------');
    res.renderPjax('with-image');
});

app.get('/without-image', function(req, res) {
    console.log('--------[ request for /without-image ]--------');
    res.renderPjax('without-image');
});

app.use(function(req, res, next){
	console.log('404');
	res.send(404, 'Sorry cant find that');
});

// Start
app.listen(app.get('port'));
console.log('Express server listening on port ', app.get('port'));
