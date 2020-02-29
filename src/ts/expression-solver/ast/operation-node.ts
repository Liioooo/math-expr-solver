import {AstNode} from './ast-node';
import {TokenType} from '../token-type';

export class OperationNode extends AstNode {

	evaluate(): number {

		switch (this.operation.type) {
			case TokenType.MINUS:
				return this.left.evaluate() - this.right.evaluate();
			case TokenType.PLUS:
				return this.left.evaluate() + this.right.evaluate();
			case TokenType.MULT:
				return this.left.evaluate() * this.right.evaluate();
			case TokenType.DIV:
				return this.left.evaluate() / this.right.evaluate();
			case TokenType.POWER:
				return this.left.evaluate() ** this.right.evaluate();
		}
	}

}
