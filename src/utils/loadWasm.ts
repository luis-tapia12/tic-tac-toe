export type WasmModules = {
	check_winner: (board: number[]) => number;
	board_is_full: (board: number[]) => number;
	make_random_move: (board: number[]) => number;
	make_minimax_move: (board: number[]) => number;
};

const importObject = {
	module: {},
	env: {
		memory: new WebAssembly.Memory({ initial: 256 }),
		emscripten_resize_heap: () => {},
	},
};

export const loadWasm = async () => {
	return new Promise<WasmModules>((resolve, reject) => {
		WebAssembly.instantiateStreaming(fetch('core.wasm'), importObject)
			.then(({ instance }) => {
				const load_board = instance.exports.load_board as Function;

				const check_winner = (board: number[]) => {
					load_board(...board);
					return (instance.exports.check_winner as Function)();
				};

				const board_is_full = (board: number[]) => {
					load_board(...board);
					return (instance.exports.board_is_full as Function)();
				};

				const make_random_move = (board: number[]) => {
					load_board(...board);
					return (instance.exports.make_random_move as Function)(Date.now());
				};

				const make_minimax_move = (board: number[]) => {
					load_board(...board);
					return (instance.exports.make_minimax_move as Function)();
				}

				resolve({
					check_winner,
					board_is_full,
					make_random_move,
					make_minimax_move
				});
			})
			.catch(reject);
	});
};
