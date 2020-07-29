import {AstNode} from './ast-node';

export class FunctionNode extends AstNode {

    evaluate(): number {
        switch (this.operation.value) {
            case 'cos':
                return Math.cos(this.child.evaluate());
            case 'sin':
                return Math.sin(this.child.evaluate());
            case 'tan':
                return Math.sin(this.child.evaluate());
            case 'log10':
                return Math.log10(this.child.evaluate());
            case 'sqrt':
                return Math.sqrt(this.child.evaluate());
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
