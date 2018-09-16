var bubls = [], 
	bublCount= 5,
	hight = 500,
	weight = 500,
	depth = 5;


class Bubl{
	constructor(){
		this.x = Math.round(Math.random() * weight);
		this.y = Math.round(Math.random() * hight);
		this.d = Math.round(Math.random() * depth);
	}
	get hight(){return this.d};
};


for (i=0;i<bublCount;i++){
	let bubl = new Bubl();
	bubls.push(bubl)
}

console.log(bubls[4].hight);
