export function createMegaDiv() {
	let game = document.createElement('div');
	game.setAttribute('id', 'game');
	for (let i = 0; i < 1225; i++) {
		let cell = document.createElement('div');
		cell.setAttribute('id', cell);
		game.append(cell);
	}
	document.body.append(game);
}
