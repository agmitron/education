import Token from "../Token";
import ExpressionNode from './ExpressionNode';

class NumberNode extends ExpressionNode {
  constructor(public number: Token) {
    super()
  }
}

export default NumberNode;
