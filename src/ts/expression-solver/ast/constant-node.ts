import {AstNode} from './ast-node';

export class ConstantNode extends AstNode {

	evaluate(): number {
		switch (this.operation.value) {
			case 'e':
				return Math.E;
			case 'PI':
				return Math.PI;
		}
	}

	serialize(): object {
		return this.operation.value;
	}

}
