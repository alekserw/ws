console.log('------');
var n = 10000;

let arr = ((t)=>{
    let a = new Array(n);
    switch (t) {
      case 'l': for (i=0;i<n;i++){
                  a[i] = i;
                }
                break;
      case 'r': let a2 = new Array(n);
                for (i=0;i<n;i++){
                  a2[i] = i;
                };
                // console.log(a2);
                for (i=0;i<n;i++){
                  let random = Math.round(Math.random()*(a2.length-1))
                  // console.log(i +'  ' +random + '  ' + a2.length);
                  a[i] = a2[random];
                  a2.splice(random,1)
                };
                // console.log(a2);
                break;
    }

    return a
  })


function iteractions(c,a) {
  let b= [];
  for (i=0;i<c;i++){
    let rand = Math.round(Math.random()*n);
      let Break = {};
      try {
        a.forEach((e,i)=>{
          if(e==rand){
            // console.log('Guessed! ' + i);
            b.push(i)
            throw Break
          }
        })

      } catch (e) {
          if (e !== Break) throw e;
      }

  }
  let s=0;
  b.forEach(e=>s+=e);
  return Math.round(s/b.length,2);
}

var randArray = arr('r');
var lineArray = arr('l');
var int = 10000

console.log(iteractions(int,randArray));
console.log(iteractions(int,randArray));
console.log(iteractions(int,randArray));
console.log(iteractions(int,randArray));
console.log(iteractions(int,randArray));
console.log('---------');
console.log(iteractions(int,lineArray));
console.log(iteractions(int,lineArray));
console.log(iteractions(int,lineArray));
console.log(iteractions(int,lineArray));
console.log(iteractions(int,lineArray));
