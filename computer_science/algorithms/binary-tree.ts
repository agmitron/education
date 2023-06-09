class TNode {
  value: number;
  left: TNode | null = null;
  right: TNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

class BinaryTree {
  root: TNode | null = null;

  public insert(value: number) {
    const newNode = new TNode(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  public print() {
    // this.printNode(this.root);
    console.log(JSON.stringify(this.root, null, 2));
  }

  private insertNode(node: TNode, newNode: TNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
}

// Create an instance of the binary tree
const tree = new BinaryTree();

// Insert nodes into the tree
tree.insert(8);
tree.insert(4);
tree.insert(12);
tree.insert(2);
tree.insert(6);
tree.insert(10);
tree.insert(14);

console.log("Tree:");
tree.print()
