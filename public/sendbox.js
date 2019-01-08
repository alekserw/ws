var treeObj = {
  hight : 10,
  weight : 10,
  background : '*'
}


var hight = 31,
    weight = 10,
    background = ' ',
    tree = [];
console.log(' ');
var isPrinted = true;

function print(){
  console.log('\033[2J');
  for (i = 0; i < weight ; i++){
    for (j = 0; j < hight ; j++){
      tree[i,j] = background;
      if (  j >= (hight -1 ) / 2 - i   &&   j <= (hight -1 ) / 2 + i  ) {
        if (Math.random() > 0.1 ) {
          process.stdout.write('*');
        } else process.stdout.write('@');
      } else process.stdout.write(background)
    }
    process.stdout.write('\n')
  }

  isPrinted = true;
}

setInterval(()=>{
  print();

},1000)
console.log('');

// setUpTree(tree);
// print(tree);
