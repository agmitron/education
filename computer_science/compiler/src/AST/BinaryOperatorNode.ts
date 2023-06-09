import Token from "../Token";
import ExpressionNode from "./ExpressionNode";

class BinaryOperatorNode extends ExpressionNode {
  constructor(
    public operator: Token,
    public left: ExpressionNode,
    public right: ExpressionNode
  ) {
    super();
  }
}

export default BinaryOperatorNode;
