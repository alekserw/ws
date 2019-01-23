
var a = [];
function decorator(f,log){
  return function(){
    console.log(this)
    a.push(arguments);
    return f.apply(this,arguments)
  }
}

Array.prototype.slice = decorator(Array.prototype.slice,'log')

console.log('tre'.slice(1))
console.log('tre'.slice(2))
console.log('tred'.slice(3))
console.log(a)
 