export const enum TokenType {
	EOF,
	NUMBER,
	CONSTANT,
	PLUS,
	MINUS,
	DIV,
	MULT,
	MOD,
	OPEN_PAR,
	CLOSE_PAR,
	POWER,
	FUNCTION
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
		TokenType.CONSTANT,
		{
			matcher: /^(e|PI)/i,
			typeConverter: input => input
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
		TokenType.MOD,
		{
			matcher: /^(mod|%)/i,
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
	],
	[
		TokenType.FUNCTION,
		{
			matcher: /^(cos|sin|tan|log10|ln|sqrt)/i,
			typeConverter: input => input
		}
	]
]);
