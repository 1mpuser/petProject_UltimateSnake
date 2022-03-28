export default class eatingCell {
	cells = document.getElementsByClassName('cell');
	constructor(x, y, width = 1) {
		this.x = x;
		this.y = y;
		this.width = width;
	}
	putFoodInCell() {}
	findTheCell(x, y) {
		let rightCell;
		for (let cell of this.cells) {
			if (+cell.getAttribute('x') == x + 1 && +cell.getAttribute('y') == y + 1)
				rightCell = cell;
			break;
		}
		return rightCell;
	}
}
