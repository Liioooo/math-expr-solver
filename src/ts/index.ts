import {Lexer} from './expression-solver/lexer';
import {Solver} from './expression-solver/Solver';
import {Parser} from './expression-solver/parser';

const input = document.getElementById('input') as HTMLInputElement;
const solveButton = document.getElementById('solve');

solveButton.addEventListener('click', () => {
	console.log(solve(input.value));
});

function solve(expression: string): number {
	const lexer = new Lexer(expression);
	const tokens = lexer.tokenize();
	console.log(tokens);
	const parser = new Parser(tokens);
	const rootNode = parser.parse();
	console.log(rootNode.serialize());
	return rootNode.evaluate();
	//const solver = new Solver(tokens);
	//return solver.solve();
}
