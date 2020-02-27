import {Token} from './token';
import {tokenConfiguration, TokenType} from './token-type';

export class Lexer {

	private _text: string;
	private _position = 0;

	constructor(text: string) {
		this._text = text;
	}

	private skipWhitespace() {
		while (this._text.charAt(this._position) === ' ') {
			this._position++;
		}
	}

	private getNextToken(): Token {
		this.skipWhitespace();
		if (this._position >= this._text.length) {
			return new Token(TokenType.EOF, null);
		}
		const textToTest = this._text.substr(this._position);
		for (const [tokenType, config] of tokenConfiguration) {
			const regexResult = textToTest.match(config.matcher);
			if (regexResult) {
				this._position += regexResult[0].length;
				return new Token(tokenType, config.typeConverter(regexResult[0]));
			}
		}
		throw Error(`Unexpected input: ${textToTest.substr(0, 1)} at position: ${this._position + 1}`);
	}

	public tokenize(): Token[] {
		let tokens: Token[] = [];
		let currentToken: Token;
		while ((currentToken = this.getNextToken()).type !== TokenType.EOF) {
			tokens.push(currentToken)
		}
		tokens.push(currentToken);
		return tokens;
	}
}
