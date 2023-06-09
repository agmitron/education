import ExpressionNode from './ExpressionNode';

class StatementsNode extends ExpressionNode {
  public codeStrings: ExpressionNode[] = [];

  public addNode(node: ExpressionNode) {
    this.codeStrings.push(node)
  }
}

export default StatementsNode;
