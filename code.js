//snake is moving through setTimeOut
//to-do
//take a note with that functions which would me moved in different file
let game = document.getElementById('game');
function createCellsInDiv() {
	for (let i = 0; i < 1225; i++) {
		let cell = document.createElement('div');
		cell.classList.add('cell');
		game.append(cell);
	}
}

createCellsInDiv();
const cells = document.getElementsByClassName('cell');
function addingAlertsWithCoordinates() {
	for (let cell of cells)
		cell.addEventListener('click', function () {
			for (let i = 0; i < cells.length; i++)
				if (this == cells[i]) {
					alert(this.getAttribute('x'));
					alert(this.getAttribute('y'));
				}
		});
}
addingTheCoordinates();
//addingAlertsWithCoordinates();
const doubleArr = makeADoubleArray();
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
	constructor(x = 18, y = 18, time = 1000, color = false) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.time = time;
		this.doubleArr = makeADoubleArray();
	}
	makeADOT(x, y) {
		// console.log(typeof doubleArr[y - 1][x - 1]);
		let cell = this.doubleArr[y - 1][x - 1];
		this.arrOfBodyCells.unshift(cell);
		cell.classList.add('snake');
		if (this.color) cells[y - 1][x - 1].style.backgroundColor = this.color;
	}
	moveADot(direction = 'right') {
		//we'll unshift last element in array and pop the last element
		if (direction == 'right') {
			if (+this.arrOfBodyCells[0].getAttribute('x') == doubleArr[0].length)
				this.x = 0;
			else this.x++;
			this.makeADOT(this.x, this.y);
			console.log(this.arrOfBodyCells);
			let Length = this.arrOfBodyCells.length;
			console.log(Length);
			let lastCell = this.arrOfBodyCells[Length - 1];
			console.log(lastCell);
			lastCell.classList.remove('snake');
			this.arrOfBodyCells.pop();
			console.log(this.arrOfBodyCells);
		}
	}
}
let snake = new Snake();
snake.makeADOT(snake.x, snake.y);
snake.makeADOT(snake.x - 1, snake.y);
snake.makeADOT(snake.x - 2, snake.y);
setTimeout(() => snake.moveADot(), snake.time);
