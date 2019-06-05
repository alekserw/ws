var characters = [
    { 'name': 'barney', 'age': 36 },
    { 'name': 'fred', 'age': 40 }
  ];

  function pluck(a,n){
      let v = [];
      a.forEach(e => {
        if(e[n]) v.push(e[n])
      });
      return v
  }
  
  console.log(pluck(characters, 'name')); // ['barney', 'fred']