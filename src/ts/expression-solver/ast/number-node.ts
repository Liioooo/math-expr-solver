import {AstNode} from './ast-node';

export class NumberNode extends AstNode {

	evaluate(): number {
		return this.operation.value;
	}

	serialize(): object {
		return this.operation.value;
	}

}
