import {Token} from './token';
import {AstNode} from './ast/ast-node';
import {TokenType} from './token-type';
import {OperationNode} from './ast/operation-node';
import {NumberNode} from './ast/number-node';
import {UnaryNode} from './ast/unary-node';
import {FunctionNode} from "./ast/function-node";

export class Parser {

	private _tokens: Token[];

	private _currentTokenIndex = 0;

	constructor(tokens: Token[]) {
		this._tokens = tokens;
	}

	public parse(): AstNode {
		return this.plusMinus();
	}

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

	private plusMinus(): AstNode {
		let node = this.multDiv();

		while ([TokenType.PLUS, TokenType.MINUS].includes(this.currentToken.type)) {
			const currentToken = this.currentToken;
			if (currentToken.type === TokenType.PLUS) {
				this.eat(TokenType.PLUS);
			} else if (currentToken.type === TokenType.MINUS) {
				this.eat(TokenType.MINUS);
			}

			node = new OperationNode(node, this.multDiv(), currentToken);
		}

		return node;
	}

	private multDiv(): AstNode {
		let node = this.power();

		while ([TokenType.MULT, TokenType.DIV].includes(this.currentToken.type)) {
			const currentToken = this.currentToken;
			if (currentToken.type === TokenType.MULT) {
				this.eat(TokenType.MULT);
			} else if (currentToken.type === TokenType.DIV) {
				this.eat(TokenType.DIV);
			}

			node = new OperationNode(node, this.power(), currentToken);
		}

		return node;
	}

	private power(): AstNode {
		let node = this.factor();

		while (this.currentToken.type === TokenType.POWER) {
			const currentToken = this.currentToken;
			this.eat(TokenType.POWER);
			node = new OperationNode(node, this.factor(), currentToken);
		}

		return node;
	}

	private factor(): AstNode {
		const currentToken = this.currentToken;
		switch (currentToken.type) {
			case TokenType.MINUS:
				this.eat(TokenType.MINUS);
				return new UnaryNode(this.factor(), undefined, currentToken);
			case TokenType.PLUS:
				this.eat(TokenType.PLUS);
				return new UnaryNode(this.factor(), undefined, currentToken);
			case TokenType.NUMBER:
				this.eat(TokenType.NUMBER);
				return new NumberNode(undefined, undefined, currentToken);
			case TokenType.FUNCTION:
				this.eat(TokenType.FUNCTION);
				this.eat(TokenType.OPEN_PAR);
				let fnNode = new FunctionNode(this.plusMinus(), undefined, currentToken);
				this.eat(TokenType.CLOSE_PAR);
				return fnNode;
			default:
				this.eat(TokenType.OPEN_PAR);
				let node = this.plusMinus();
				this.eat(TokenType.CLOSE_PAR);
				return node;
		}
	}

}
