import Token from "../Token";
import ExpressionNode from "./ExpressionNode";

class UnaryOperatorNode extends ExpressionNode {
  constructor(
    public operator: Token,
    public operand: ExpressionNode,
  ) {
    super();
  }
}

export default UnaryOperatorNode;
