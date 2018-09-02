var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	server

var store = {
	home: {
		page: 'Home page',
		content: 'Home, seet home'
	},
	about: {
		page: 'about page',
		content: 'about, seet about',
		clientInfo: {
			ip:'',
			userAgent:'',
			sr:'',
			vp:''
		}
	},
	downloads: {
		page: 'downloads page',
		content: 'downloads, seet downloads'
	},
	profile: {
		page: 'profile page',
		content: 'profile, seet profile'
	}

},
storeKeys = Object.keys(store);

app.set('view engine','pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
	
	console.log('%s %s',req.method,req.url);
	next()
})

app.get('/stat',(req,res)=>{
	console.log(req.query);

	// var data = 
	console.log(req.cookie);
	// res.sendStatus(200);
})

app.get('/about',(req,res)=>{
	var data,page = 'about',
	data = store[page];
	data.clientInfo.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
	data.clientInfo.userAgent = req.get('User-Agent');
	console.log(data);
	
	data.links = storeKeys;
	res.render('about',data)
})



app.route('/new')
	.get((req,res)=>{
		res.render('new',{
			page:'Add new',
			links: storeKeys
		})
	})
	.post((req,res)=>{
		var data = req.body;

		if(data.pageurl && data.pagename && data.pagecontent){
			// console.log(data);
			store[data.pageurl] = {
				page: data.pagename,
				content: data.pagecontent
			};
			storeKeys = Object.keys(store)
		}
		res.redirect('/');
	})

app.get('/:page?',(req,res)=>{
		var page = req.params.page,data;
		if(!page) page = 'home'
		data = store[page];
		if (!data) {
			res.redirect('/');
			return;
		}
		
		data.links = storeKeys;
		res.render('main',data)
});

server = app.listen(3000,()=>{
	console.log('Listen on port 3000');
})
