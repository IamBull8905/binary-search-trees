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
}

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(newTree.root);
