var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	server

var store = {
	home: {
		page: 'Home page',
		content: 'Home, seet home'
	},
	chat: {
		page: 'Chat',
		content: 'Hello my frэnd!'
	},
	about: {
		page: 'About page',
		content: 'About, seet about',
		clientInfo: {
			ip:'',
			userAgent:'',
			sr:'',
			vp:''
		}
	},
	downloads: {
		page: 'Downloads page',
		content: 'Downloads'
	},
	profile: {
		page: 'Profile page',
		content: 'Profile, seet profile'
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

	// store.about 
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

app.route('/chat')
	.get((req,res)=>{
		var data,page = 'chat',
			p = req.params.page,
			data = store[page];
			
			console.log(p);
		
		data.links = storeKeys;
		res.render('chat',data)
	})
	.post((req,res)=>{
		var data,page = 'chat',
			p = req.params.page,
			d = new Date(),
			time = d.getHours() +':'+ d.getMinutes() + ' - ',

			// storeKeys = Object.keys(store);
			data = store[page];
			data.links = storeKeys;

			// console.log('This is log: ' + data.content);
		if(req.body.message) 
				data.content = time + req.body.message + '\n' + data.content
		   res.render('chat',data)
		
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
