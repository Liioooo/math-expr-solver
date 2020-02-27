import {Lexer} from './expression-solver/lexer';

const input = document.getElementById('input') as HTMLInputElement;
const solveButton = document.getElementById('solve');

solveButton.addEventListener('click', () => {
	solve(input.value);
});

function solve(expression: string): string {
	const lexer = new Lexer(expression);
	console.log(lexer.tokenize());
	return '';
}
