import BinaryOperatorNode from "./AST/BinaryOperatorNode";
import ExpressionNode from "./AST/ExpressionNode";
import NumberNode from "./AST/NumberNode";
import StatementNode from "./AST/StatementsNode";
import UnaryOperatorNode from "./AST/UnaryOperatorNode";
import VariableNode from "./AST/Variable";
import Token from "./Token";
import TokenType, { typesMapping } from "./TokenType";

class Parser {
  public pos: number = 0;
  public scope: Record<string, string> = {};

  constructor(public tokens: Token[]) {}

  public match(...expected: TokenType[]): Token | null {
    if (this.pos < this.tokens.length) {
      const currentToken = this.tokens[this.pos];

      if (expected.find((n) => n.name === currentToken.type.name)) {
        this.pos += 1;
        return currentToken;
      }
    }

    return null;
  }

  public require(...expected: TokenType[]): Token {
    const token = this.match(...expected);

    if (!token) {
      throw new Error(`На позиции ${this.pos} ожидается ${expected.join("|")}`);
    }

    return token;
  }

  public parseCode(): ExpressionNode {
    const root = new StatementNode();

    while (this.pos < this.tokens.length) {
      const codeStringNode = this.parseExpression();
      this.require(typesMapping.SEMICOLON);
      root.addNode(codeStringNode);
    }

    return root;
  }

  public parseParentheses(): ExpressionNode {
    if (this.match(typesMapping.LPAR) !== null) {
      const node = this.parseFormula();
      this.require(typesMapping.RPAR);
      return node;
    } else {
      return this.parseVariableOrNumber();
    }
  }

  public parseFormula(): ExpressionNode {
    let left = this.parseParentheses();
    let operator = this.match(typesMapping.MINUS, typesMapping.PLUS);

    while (operator !== null) {
      const right = this.parseParentheses();
      left = new BinaryOperatorNode(operator, left, right);
      operator = this.match(typesMapping.MINUS, typesMapping.PLUS);
    }

    return left;
  }

  public parseExpression(): ExpressionNode {
    if (this.match(typesMapping.VARIABLE) === null) {
      const printNode = this.parsePrint();
      return printNode;
    }

    this.pos -= 1;
    let variableNode = this.parseVariableOrNumber();
    const assignOperator = this.match(typesMapping.ASSIGN);

    if (assignOperator !== null) {
      const rightFormulaNode = this.parseFormula();
      const binaryOperatorNode = new BinaryOperatorNode(
        assignOperator,
        variableNode,
        rightFormulaNode
      );
      return binaryOperatorNode;
    }

    throw new Error(
      `После переменной ожидается оператор присвоения на позиции ${this.pos}`
    );
  }

  public parsePrint(): ExpressionNode {
    const print = this.match(typesMapping.LOG);

    if (print !== null) {
      return new UnaryOperatorNode(print, this.parseFormula());
    }

    throw new Error(
      `После вывода в консоль ожидалось выражение на позиции ${this.pos}`
    );
  }

  public parseVariableOrNumber(): ExpressionNode {
    const number = this.match(typesMapping.NUMBER);

    if (number !== null) {
      return new NumberNode(number);
    }

    const variable = this.match(typesMapping.VARIABLE);

    if (variable !== null) {
      return new VariableNode(variable);
    }

    throw new Error(`Ожидается переменная или число на позиции ${this.pos}`);
  }

  run(node: ExpressionNode): any {
    if (node instanceof NumberNode) {
      return parseInt(node.number.text);
    }

    if (node instanceof UnaryOperatorNode) {
      switch (node.operator.type.name) {
        case typesMapping.LOG.name: {
          console.log(this.run(node.operand));
          return;
        }
      }
    }

    if (node instanceof BinaryOperatorNode) {
      switch (node.operator.type.name) {
        case typesMapping.PLUS.name: {
          return this.run(node.left) + this.run(node.right);
        }

        case typesMapping.MINUS.name: {
          return this.run(node.left) - this.run(node.right);
        }

        case typesMapping.ASSIGN.name: {
          const result: any = this.run(node.right);
          const variable = <VariableNode>node.left;
          this.scope[variable.variable.text] = result;
          return result;
        }
      }
    }

    if (node instanceof VariableNode) {
      const variable = this.scope[node.variable.text];

      if (variable) {
        return variable;
      } else {
        throw new Error(`Переменная ${variable} не объявлена`);
      }
    }

    if (node instanceof StatementNode) {
      node.codeStrings.forEach((string) => {
        this.run(string);
      });

      return;
    }

    throw new Error(`Неизвестная ошибка`);
  }
}

export default Parser;
