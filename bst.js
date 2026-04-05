class Node {
  constructor() {
    this.data = null;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }
}
