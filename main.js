var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
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

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());

// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('userId',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
	
	console.log('%s %s',req.method,req.url);
	next()
})

app.get('/stat',(req,res)=>{
	// console.log(req.query);

	// store.about 
	// console.log(req.cookie);
	// res.sendStatus(200);
})

app.get('/about',(req,res)=>{
	var data,page = 'about',
	data = store[page];
	data.clientInfo.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
	data.clientInfo.userAgent = req.get('User-Agent');
	// console.log(data);
	
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
			cookie = req.cookies.cookieName,
			message = req.body.message,
			// userName = 
			// storeKeys = Object.keys(store);
			data = store[page];
			data.links = storeKeys;

			// console.log('This is log: ' + data.content);
		if(req.body.message) 
				data.content = cookie + ' ' + time + message + '\n' + data.content
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
