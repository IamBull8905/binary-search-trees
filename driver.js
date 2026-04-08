import { Tree } from "./bst.js";
let arr = [5,9,11,14,16,24,29,30,35];
const newTree = new Tree(arr);
console.log(newTree.isBalanced());

const logElement = (element) => {
    console.log(element.data);
};
newTree.levelOrderForEach(logElement);
newTree.preOrderForEach(logElement);
newTree.inOrderForEach(logElement);
newTree.postOrderForEach(logElement);
[120,240,550,930,500,340,780,980].forEach(num => newTree.insert(num));
console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.isBalanced());
newTree.levelOrderForEach(logElement);
newTree.preOrderForEach(logElement);
newTree.inOrderForEach(logElement);
newTree.postOrderForEach(logElement);