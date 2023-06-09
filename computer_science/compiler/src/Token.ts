import TokenType from './TokenType';

class Token {
  constructor(public type: TokenType, public text: string, public pos: number) {}
}

export default Token;
