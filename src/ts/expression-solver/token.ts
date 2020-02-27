import {TokenType} from './token-type';

export class Token {

	private readonly _type: TokenType;
	private readonly _value: any;

	constructor(type: TokenType, value: any) {
		this._type = type;
		this._value = value;
	}

	get type(): TokenType {
		return this._type;
	}

	get value(): any {
		return this._value;
	}
}
