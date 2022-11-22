class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    array = [...new Set(array)];
    array.sort(function (a, b) {
      return a - b;
    });
    this.root = buildTree(array, 0, array.length - 1);
  }

  insert(data) {
    this.root = this.insertRec(this.root, data);
  }

  insertRec(root, key) {
    /*
     * If the tree is empty, return a new node
     */
    if (root == null) {
      root = new Node(key);
      return root;
    }

    /* Otherwise, recur down the tree */
    if (key < root.data) root.left = this.insertRec(root.left, key);
    else if (key > root.data) root.right = this.insertRec(root.right, key);

    /* return the (unchanged) node pointer */
    return root;
  }
  delete(data) {}
  deleteRec(data) {
    if (root == null) {
      return root;
    }

    if (key < root.data) root.left = this.deleteRec(root.left, key);
    else if (key > root.data) root.right = this.deleteRec(root.right, key);
  }
}

function buildTree(array, start, end) {
  if (start > end) return null;
  let mid = Math.round((start + end) / 2);

  let node = new Node(array[mid]);
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  return node;
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.root);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);

tree.insert(10);

prettyPrint(tree.root);