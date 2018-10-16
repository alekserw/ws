console.log('============================')

var o = {
	a:1,
	b:2
};

var o1 = Object.create(o);

o1.z=1

for (property in o1)
	console.log(property)








// function Employee() {
//   this.name = "";
//   this.dept = "general";
// }



// function Manager() {
//   Employee.call(this);
//   this.reports = [];
// }
// Manager.prototype = Object.create(Employee.prototype);
// //создаем пустой объект с прототипом от коструктора Employee
// //и используем этот объект как прототип для Manager

// console.log('1'+ Manager)


// function WorkerBee() {
//   Employee.call(this);
//   this.projects = [];
// }

// WorkerBee.prototype = Object.create(Employee.prototype);
// function SalesPerson() {
//    WorkerBee.call(this);
//    this.dept = "sales";
//    this.quota = 100;
// }
// SalesPerson.prototype = Object.create(WorkerBee.prototype);

// function Engineer() {
//    WorkerBee.call(this);
//    this.dept = "engineering";
//    this.machine = "";
// }
// Engineer.prototype = Object.create(WorkerBee.prototype);