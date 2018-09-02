var express = require('express')
	,app = express()
	,server

var store = {
	home: {
		page: 'Home page',
		content: 'Home, seet home'
	},
	about: {
		page: 'about page',
		content: 'about, seet about'
	},
	downloads: {
		page: 'downloads page',
		content: 'downloads, seet downloads'
	},
	profile: {
		page: 'profile page',
		content: 'profile, seet profile'
	}

}

app.set('view engine','pug');
app.use(express.static(__dirname + '/public'))
app.use((req,res,next)=>{
	console.log('%s %s',req.method,req.url);
	next()
})



app.get('/:page?',(req,res)=>{
		var page = req.params.page,data;
		if(!page) page = 'home'
		data = store[page];
		if (!data) {
			res.redirect('/');
			return;
		}
		
		data.links = Object.keys(store);
		res.render('main',data)
});

server = app.listen(3000,()=>{
	console.log('Listen on port 3000');
})
