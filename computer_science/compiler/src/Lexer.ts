import Token from "./Token";
import { typesMapping } from './TokenType';

class Lexer {
  constructor(
    public readonly code: string,
    public tokens: Token[] = [],
    public pos: number = 0
  ) {}

  public analyze(): Token[] {
    while (this.nextToken()) { }

    this.tokens = this.tokens.filter((token) => token.type.name !== typesMapping.SPACE.name)

    return this.tokens
  }

  public nextToken(): boolean {
    if (this.pos >= this.code.length) {
      return false;
    }

    const typesList = Object.values(typesMapping)

    for (const type of typesList) {
      const regex = new RegExp(`^${type.regex}`)
      const result = this.code.substring(this.pos).match(regex)?.[0]
      
      if (result) {
        const token = new Token(type, result, this.pos)
        this.pos += result.length
        this.tokens.push(token)
        return true
      }
    }

    throw new Error(`На позиции ${this.pos} допущена синтаксическая ошибка`)
  }
}

export default Lexer;
