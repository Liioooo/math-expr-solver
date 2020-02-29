import {Token} from '../token';

export abstract class AstNode {

	private _operation: Token;

	private _left: AstNode;
	private _right: AstNode;

	constructor(left: AstNode, right: AstNode, operation: Token) {
		this._left = left;
		this._right = right;
		this._operation = operation;
	}

	get operation(): Token {
		return this._operation;
	}

	get left(): AstNode {
		return this._left;
	}

	get right(): AstNode {
		return this._right;
	}

	public serialize(): object {
		return {
			type: this.operation.value,
			left: this.left.serialize(),
			right: this.right.serialize()
		}
	}

	abstract evaluate(): number;
}
