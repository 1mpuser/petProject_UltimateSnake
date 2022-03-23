//snake is moving through setTimeOut
// import { createMegaDiv } from './createElems.js';
// createMegaDiv();
let cells = document.getElementsByClassName('cell');
for (let cell of cells)
	cell.addEventListener('click', function () {
		for (let i = 0; i < cells.length; i++)
			if (this == cells[i]) {
				alert(this.getAttribute('x'));
				alert(this.getAttribute('y'));
			}
	});
addingTheCoordinates();
const doubleArr = makeADoubleArray();
console.log(doubleArr);
function addingTheCoordinates() {
	let numerationOnY = 1;
	for (let i = 0; i < cells.length; i++) {
		let numerationOnX = (i + 1) % 35;
		if (numerationOnX == 0) {
			numerationOnX = 35;
			numerationOnY++;
		}
		cells[i].setAttribute('x', numerationOnX);
		cells[i].setAttribute('y', numerationOnY);
	}
}
function makeADoubleArray(NumOfX = 35, NumOfY = 35) {
	const DoubleArr = [];
	for (let i = 0; i < NumOfX; i++) {
		let arr = [];
		for (let j = 0; j < NumOfY; j++) {
			arr.push(cells[i * NumOfX + j]);
		}
		DoubleArr.push(arr);
	}
	return DoubleArr;
}
class Snake {
	//to-do
	//make method move who will paint some cells in different colours which by the way
	//will painted in classes
	//move is just a timeout with some different speeds who just changing the timeOut
	//eating is just a one more method with different booleans or smth
	//that could be an arr with variables, where could be moved some with some movement
	arrOfBodyCells = [];
	constructor(x, y, time = 1000, color = 'green') {
		this.x = x;
		this.y = y;
		this.color = color;
		this.time = time;
	};
	function makeADOT(x,y) {
		arrOfBodyCells.length;
	};
}
