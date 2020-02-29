export const enum TokenType {
	EOF,
	NUMBER,
	PLUS,
	MINUS,
	DIV,
	MULT,
	OPEN_PAR,
	CLOSE_PAR,
	POWER
}

export interface TokenConfig {
	matcher: RegExp,
	typeConverter: (input: string) => any
}

export const tokenConfiguration: Map<TokenType, TokenConfig> = new Map<TokenType, TokenConfig>([
	[
		TokenType.NUMBER,
		{
			matcher: /^[0-9]+\.?[0-9]*/i,
			typeConverter: input => Number(input)
		}
	],
	[
		TokenType.PLUS,
		{
			matcher: /^\+/i,
			typeConverter: input => input
		}
	],
	[
		TokenType.MINUS,
		{
			matcher: /^-/i,
			typeConverter: input => input
		}
	],
	[
		TokenType.DIV,
		{
			matcher: /^\//i,
			typeConverter: input => input
		}
	],
	[
		TokenType.MULT,
		{
			matcher: /^\*/i,
			typeConverter: input => input
		}
	],
	[
		TokenType.OPEN_PAR,
		{
			matcher: /^\(/i,
			typeConverter: input => input
		}
	],
	[
		TokenType.CLOSE_PAR,
		{
			matcher: /^\)/i,
			typeConverter: input => input
		}
	],
	[
		TokenType.POWER,
		{
			matcher: /^\^/i,
			typeConverter: input => input
		}
	]
]);
