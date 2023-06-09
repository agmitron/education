import Token from "../Token";
import ExpressionNode from "./ExpressionNode";

class VariableNode extends ExpressionNode {
  constructor(public readonly variable: Token) {
    super();
  }
}

export default VariableNode;
