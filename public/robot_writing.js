console.log('============================')

var text = 'JavaScript concat string with backspace - Stack Overflow'


function rand(i){
	setInterval(()=>{
		var r = Math.random().toString(36).substring(10)[1];
		process.stdout.write(r)
		if (r == text[i]) {clearInterval()} else {
			process.stdout.write('\b')
		}
	},50);
}

for (i=0;i<text.length;i++){
	rand(i);
}
