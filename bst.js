class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

class Tree {
  constructor(arr) {
    this.root = this.#buildTree(
      this.#checkForDuplicates(arr.sort((a, b) => a - b)),
    );
  }

  #checkForDuplicates(arr) {
    let newArr = [];
    for (const element of arr) {
      if (newArr.includes(element)) {
        continue;
      } else {
        newArr.push(element);
      }
    }
    return newArr;
  }

  #buildTree(arr) {
    let start = 0;
    let end = arr.length - 1;
    if (start > end) {
      return null;
    }
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    root.leftChild = this.#buildTree(arr.slice(start, mid));
    root.rightChild = this.#buildTree(arr.slice(mid + 1, end + 1));
    return root;
  }

  includes(value) {
    const rootNode = this.root;
    let currentNode = rootNode;
    while (currentNode !== null && currentNode.data !== value) {
      if (value > currentNode.data) {
        currentNode = currentNode.rightChild;
      } else if (value < currentNode.data) {
        currentNode = currentNode.leftChild;
      } else {
        console.error("A duplicate was found!");
        return;
      }
    }
    if (currentNode === null) {
      return false;
    } else {
      return true;
    }
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.includes(value)) {
      return;
    }
    const rootNode = this.root;
    let currentNode = rootNode;
    while (currentNode !== null) {
      if (value > currentNode.data && currentNode.rightChild !== null) {
        currentNode = currentNode.rightChild;
      } else if (value < currentNode.data && currentNode.leftChild !== null) {
        currentNode = currentNode.leftChild;
      } else {
        break;
      }
    }

    if (value < currentNode.data) {
      currentNode.leftChild = newNode;
    } else {
      currentNode.rightChild = newNode;
    }

    return rootNode;
  }

  #getSuccessor(currentNode) {
    let parent = currentNode;
    currentNode = currentNode.rightChild;
    while (currentNode !== null && currentNode.leftChild !== null) {
      currentNode = currentNode.leftChild;
      parent = currentNode;
    }
    return { successor: currentNode, parent };
  }

  deleteItem(value) {
    if (!this.includes(value)) {
      return null;
    }
    const rootNode = this.root;
    let currentNode = rootNode;
    let parent = null;

    while (currentNode.data !== value) {
      parent = currentNode;
      if (value > currentNode.data) {
        currentNode = currentNode.rightChild;
      } else if (value < currentNode.data) {
        currentNode = currentNode.leftChild;
      } else {
        console.error("A duplicate was found!");
        return;
      }
    }

    if (currentNode.leftChild === null && currentNode.rightChild === null) {
      if (parent.leftChild === currentNode) {
        parent.leftChild = null;
      } else {
        parent.rightChild = null;
      }
    } else if (
      (currentNode.leftChild === null && currentNode.rightChild !== null) ||
      (currentNode.leftChild !== null && currentNode.rightChild === null)
    ) {
      const child = currentNode.leftChild
        ? currentNode.leftChild
        : currentNode.rightChild;
      if (currentNode.data > parent.data) {
        parent.rightChild = child;
      } else {
        parent.leftChild = child;
      }
    } else {
      const { successor, parent: successorParent } =
        this.#getSuccessor(currentNode);
      currentNode.data = successor.data;
      const successorChild = successor.rightChild;
      if (successorParent.leftChild === successor) {
        successorParent.leftChild = successorChild;
      } else {
        successorParent.rightChild = successorChild;
      }
    }
    return rootNode;
  }

  levelOrderForEach(callback) {
    if (!callback || typeof callback !== "function") {
      throw new Error("A callback is required");
    }
    const queue = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      let firstNode = queue.shift();
      if (firstNode.leftChild !== null) {
        queue.push(firstNode.leftChild);
      }
      if (firstNode.rightChild !== null) {
        queue.push(firstNode.rightChild);
      }
      callback(firstNode.value);
    }
  }

  inOrderForEach(callback) {
    if (!callback || typeof callback !== "function") {
      throw new Error("A callback is required");
    }
    function recursiveNesting(node) {
      if (node === null) {
        return;
      }
      if(node.leftChild) {
        recursiveNesting(node.leftChild);
      }
      callback(node);
      if (node.rightChild) {
        recursiveNesting(node.rightChild);
      }
    }
    recursiveNesting(this.root);
  }

  preOrderForEach(callback) {
    if (!callback || typeof callback !== "function") {
      throw new Error("A callback is required");
    }
    function recursiveNesting(node) {
      if (node === null) {
        return;
      }
      callback(node);
      if (node.leftChild) {
        recursiveNesting(node.leftChild);
      }
      if (node.rightChild) {
        recursiveNesting(node.rightChild);
      }
    }
    recursiveNesting(this.root);
  }

  postOrderForEach(callback) {
    if (!callback || typeof callback !== "function") {
      throw new Error("A callback is required");
    }
    function recursiveNesting(node) {
      if (node === null) {
        return;
      }
      if (node.leftChild) {
        recursiveNesting(node.leftChild);
      }
      if (node.rightChild) {
        recursiveNesting(node.rightChild);
      }
      callback(node);
    }
    recursiveNesting(this.root);
  }
}

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(newTree.root);
