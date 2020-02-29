import {Token} from './token';
import {TokenType} from './token-type';

export class Solver {

	private _tokens: Token[];

	private _currentTokenIndex = 0;

	private get currentToken(): Token {
		return this._tokens[this._currentTokenIndex];
	}

	private eat(type: TokenType) {
		if (this.currentToken.type === type) {
			this._currentTokenIndex++;
		} else {
			const unexpectedToken = this._tokens[this._currentTokenIndex];
			throw new Error(`Unexpected Token: ${unexpectedToken.value}`);
		}
	}

	private multDiv(): number {
		let result = this.factor();

		while ([TokenType.MULT, TokenType.DIV].includes(this.currentToken.type)) {
			const currentToken = this.currentToken;
			if (currentToken.type === TokenType.MULT) {
				this.eat(TokenType.MULT);
				result = result * this.factor();
			} else if (currentToken.type === TokenType.DIV) {
				this.eat(TokenType.DIV);
				result = result / this.factor();
			}
		}

		return result;
	}

	private plusMinus(): number {
		let result = this.multDiv();

		while ([TokenType.PLUS, TokenType.MINUS].includes(this.currentToken.type)) {
			const currentToken = this.currentToken;
			if (currentToken.type === TokenType.PLUS) {
				this.eat(TokenType.PLUS);
				result = result + this.multDiv();
			} else if (currentToken.type === TokenType.MINUS) {
				this.eat(TokenType.MINUS);
				result = result - this.multDiv();
			}
		}

		return result;
	}

	private factor(): number {
		const currentToken = this.currentToken;
		if (currentToken.type === TokenType.NUMBER) {
			this.eat(TokenType.NUMBER);
			return currentToken.value;
		} else {
			this.eat(TokenType.OPEN_PAR);
			let result = this.plusMinus();
			this.eat(TokenType.CLOSE_PAR);
			return result;
		}
	}

	constructor(tokens: Token[]) {
		this._tokens = tokens;
	}

	public solve() {
		return this.plusMinus();
	}

}
