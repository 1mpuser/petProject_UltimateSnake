//snake is moving through setTimeOut
//to-do
//take a note with that functions which would me moved in different file
let game = document.getElementById('game');
const forbiddenCellClassesForSnake = ['snake'];
const cellClassesForExtending = [];
let eatingCellsArr = [];
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
	for (let i = 0; i < NumOfY; i++) {
		let arr = [];
		for (let j = 0; j < NumOfX; j++) {
			arr.push(cells[i * NumOfY + j]);
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
	//how to avoid obstacles
	//every move we create an arr with enviroment with dangeroys things
	// if we go into that we'll stop the game
	//or we just do some directions which are forbiden to do
	//we ristrict them in array where are the forbidden classes
	arrOfBodyCells = [];
	directionsObj = [];
	interval;
	constructor(x = 18, y = 18, direction = 'right', time = 1000, color = false) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.time = time;
		this.direction = direction;
		this.doubleArr = makeADoubleArray();
	}
	makeADOT(x, y, push = false) {
		let cell = this.doubleArr[y][x];
		if (push) this.arrOfBodyCells.push(cell);
		else this.arrOfBodyCells.unshift(cell);
		cell.classList.add('snake');
		if (this.color) cells[y][x].style.backgroundColor = this.color;
	}
	addTheLength() {
		console.log('added');
		let direction = this.direction;
		let lastCell = this.arrOfBodyCells[this.arrOfBodyCells.length - 1];
		let x = lastCell.getAttribute('x') - 1;
		let y = lastCell.getAttribute('y') - 1;
		if (direction == 'right') {
			x--;
			this.makeADOT(x, y, true);
		}
		if (direction == 'left') {
			x++;
			this.makeADOT(x, y, true);
		}
		if (direction == 'up') {
			y--;
			this.makeADOT(x, y, true);
		}
		if (direction == 'down') {
			y++;
			this.makeADOT(x, y, true);
		}
	}
	deleteLastCell() {
		let lastCell = this.arrOfBodyCells[this.arrOfBodyCells.length - 1];
		lastCell.classList.remove('snake');
		this.arrOfBodyCells.pop();
	}
	moveSnake(direction = 'right') {
		//we'll unshift last element in array and pop the last element
		//we'll try is this direction available or not right here but if it passes
		//the conditional construction we'll do this constuction 4 next move in 4 terms
		//we'll fix them next time
		let tmpAvailableDirectionsArray = [];
		if (direction == 'right') {
			if (+this.arrOfBodyCells[0].getAttribute('x') == doubleArr[0].length)
				this.x = 0;
			else this.x++;
			this.makeADOT(this.x, this.y);
			this.deleteLastCell();
			let availableDirections = this.checkAvailableDirections(direction);
			tmpAvailableDirectionsArray.push(...availableDirections);
		}
		if (direction == 'down') {
			if (+this.arrOfBodyCells[0].getAttribute('y') == doubleArr.length)
				this.y = 0;
			else this.y++;
			this.makeADOT(this.x, this.y);
			this.deleteLastCell();
		}
		if (direction == 'up') {
			if (+this.arrOfBodyCells[0].getAttribute('y') == 1)
				this.y = doubleArr.length - 1;
			else this.y--;
			this.makeADOT(this.x, this.y);
			this.deleteLastCell();
		}
		if (direction == 'left') {
			this.direction = 'left';
			if (+this.arrOfBodyCells[0].getAttribute('x') == 1)
				this.x = doubleArr[0].length - 1;
			else this.x--;
			this.makeADOT(this.x, this.y);
			this.deleteLastCell();
		}
		console.log(this.checkAvailableDirections());
	}
	createAnArrWithNearbyCells(direction) {
		//we'll create an array with clockwise direction from 12 o'clock
		let currentCell = this.arrOfBodyCells[0];
		console.log(currentCell);
		let x = this.x;
		let y = this.y;
		let arrOfNearbyCells = [];
		let rightX = x + 1;
		let leftX = x - 1;
		let upY = y - 1;
		let downY = y + 1;
		if (rightX >= doubleArr[0].length) rightX = 0;
		if (leftX < 0) leftX = doubleArr[0].length - 1;
		if (upY < 0) upY = 0;
		if (downY >= doubleArr.length) downY = doubleArr.length - 1;
		if (direction == 'right') {
			arrOfNearbyCells.push(doubleArr[upY][x]);
			arrOfNearbyCells.push(doubleArr[y][rightX]);
			arrOfNearbyCells.push(doubleArr[downY][x]);
		}
		if (direction == 'left')
			arrOfNearbyCells.push(
				doubleArr[upY][x],
				doubleArr[downY][x],
				doubleArr[y][leftX]
			);
		if (direction == 'up')
			arrOfNearbyCells.push(
				doubleArr[upY][x],
				doubleArr[y][rightX],
				doubleArr[y][leftX]
			);
		if (direction == 'down')
			arrOfNearbyCells.push(
				doubleArr[y][rightX],
				doubleArr[downY][x],
				doubleArr[y][leftX]
			);
		return arrOfNearbyCells;
	}
	checkAvailableDirections(direction = this.direction) {
		let nearbyCells = this.createAnArrWithNearbyCells(direction);
		let availableDirections = nearbyCells.map((cell) => {
			for (let clas of forbiddenCellClassesForSnake) {
				if (cell.classList.contains(clas)) return 'forbidden';
			}
			for (let clas of cellClassesForExtending) {
				if (cell.classList.contains(clas)) return 'extend';
			}
			return 'available';
		});
		return availableDirections;
	}
	playSnake() {
		interval = setInterval(() => this.moveSnake(this.direction), this.time);
	}
	pauseSnake() {
		clearInterval(this.interval);
	}
}
let snake = new Snake(13, 13, 'right');
snake.makeADOT(snake.x, snake.y);
for (let i = 0; i < 10; i++) snake.addTheLength();
window.addEventListener('keydown', function (event) {
	let regEx = new RegExp(/Arrow.+/g);
	if (regEx.test(event.key)) {
		event.preventDefault();
		let direction = event.key.slice(5).toLowerCase();
		if (snake.direction == 'left' && direction == 'right') return;
		else if (snake.direction == 'right' && direction == 'left') return;
		else if (snake.direction == 'down' && direction == 'up') return;
		else if (snake.direction == 'up' && direction == 'down') return;
		else snake.direction = direction;
	}
});
let intercal = setInterval(() => snake.moveSnake(snake.direction), 100);
setTimeout(() => clearInterval(intercal), 3000);
