
var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	app = express(),
	request = require('request'),
	server;



	// const Telegraf = require('telegraf');
	// const TOKEN = 'bot778483037:AAGn4BTNbmM7M_nlISzxvQLspP36jslw8eI'
	// const bot = new Telegraf(process.env.TOKEN)
	//
	// bot.start((ctx) => ctx.reply('Welcome!'))
	// bot.help((ctx) => ctx.reply('Send me a sticker'))
	// bot.on('sticker', (ctx) => ctx.reply('👍'))
	// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
	// bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'))
	//
	// bot.startPolling()




	const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '778483037:AAGn4BTNbmM7M_nlISzxvQLspP36jslw8eI';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
	console.log(msg);
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
	console.log(msg);

	
	request('https://geek-jokes.sameerkumar.website/api', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
			bot.sendMessage(chatId, body);
	    // console.log(body) // Show the HTML for the Google homepage.
	  }
	});


  // send a message to the chat acknowledging receipt of their message

});





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
users = {},
storeKeys = Object.keys(store);

app.set('view engine','pug');

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());

// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.userId;
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
			user = req.cookies.user,
			data = store[page];
			data.links = storeKeys;


			if (!user) {

				function clone(obj) {
				    if (null == obj || "object" != typeof obj) return obj;
				    var copy = obj.constructor();
				    for (var attr in obj) {
				        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
				    }
				    return copy;
				}

				var dataLogin =  clone(data);
				dataLogin.content = 'AI: Введите Ваше имя сударь';

				res.render('chat',dataLogin)

			}
			else res.render('chat',data);

			console.log(data);



	})
	.post((req,res)=>{
		var data,page = 'chat',
			p = req.params.page,
			d = new Date(),
			user = req.cookies.user,
			time = d.getHours() +':'+ d.getMinutes() + ' - ',
			cookie = req.cookies.userId,
			message = req.body.message;

			data = store[page];
			data.links = storeKeys;


			if (user === undefined) {
				res.cookie('user',message, { maxAge: 9000000000, httpOnly: true });
				console.log('cookies user set');
				console.log(data);
				return res.render('chat',data);

			}



			// console.log('This is log: ' + data.content);

			function updateMessage(){
					if (user === undefined){
										}
					else
						data.content = user + 	' ' + time + message + '\n' + data.content;

			}
			if(req.body.message) updateMessage();
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

		if(data.name){
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
