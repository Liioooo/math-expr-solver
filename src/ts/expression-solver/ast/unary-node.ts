import {AstNode} from './ast-node';
import {TokenType} from '../token-type';

export class UnaryNode extends AstNode {

	evaluate(): number {
		switch (this.operation.type) {
			case TokenType.PLUS:
				return +this.child.evaluate();
			case TokenType.MINUS:
				return -this.child.evaluate();
		}
	}

	serialize(): object {
		return {
			type: this.operation.value,
			child: this.child.serialize()
		};
	}

	private get child(): AstNode {
		if (this.left) return this.left;
		return this.right;
	}

}
