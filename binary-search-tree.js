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
    if (root === null) {
      root = new Node(key);
      return root;
    }

    /* Otherwise, recur down the tree */
    if (key < root.data) root.left = this.insertRec(root.left, key);
    else if (key > root.data) root.right = this.insertRec(root.right, key);

    /* return the (unchanged) node pointer */
    return root;
  }

  delete(data) {
    this.root = this.deleteRec(this.root, data);
  }

  deleteRec(root, key) {
    function findSmallest(subTree) {
      if (subTree === null) {
        return subTree;
      }

      if (subTree.left === null) {
        return subTree.data;
      }
      return findSmallest(subTree.left);
    }

    if (root === null) {
      return root;
    }

    if (key < root.data) {
      root.left = this.deleteRec(root.left, key);
    } else if (key > root.data) {
      root.right = this.deleteRec(root.right, key);
    } else {
      if (root.left === null && root.right === null) {
        return null;
      } else if (root.left === null && root.right) {
        return root.right;
      } else if (root.right == null && root.left) {
        return root.left;
      } else {
        root.data = findSmallest(root.right);
        root.right = this.deleteRec(root.right, root.data);
        return root;
      }
    }
    return root;
  }

  find(key, root = this.root) {
    if (root === null) {
      return null;
    }

    if (root.data === key) {
      return root;
    }

    if (key < root.data) return this.find(key, root.left);
    else if (key > root.data) return this.find(key, root.right);
  }

  levelOrder(func = (n) => n, root = this.root) {
    if (root === null) {
      return null;
    }
    let queue = [];
    let arr = [];

    if (root.left) queue.push(root.left);
    if (root.right) queue.push(root.right);
    arr.push(func(root.data));

    while (queue.length > 0) {
      root = queue.shift();
      if (root.left) queue.push(root.left);
      if (root.right) queue.push(root.right);
      arr.push(func(root.data));
    }

    return arr;
  }

  inOrder(func = (n) => n, root = this.root) {
    if (root === null) {
      return [];
    }

    let arr = [];

    arr.push(...this.inOrder(func, root.left));
    arr.push(func(root.data));
    arr.push(...this.inOrder(func, root.right));

    return arr;
  }

  preOrder(func = (n) => n, root = this.root) {
    if (root === null) {
      return [];
    }

    let arr = [];
    arr.push(func(root.data));
    arr.push(...this.preOrder(func, root.left));
    arr.push(...this.preOrder(func, root.right));

    return arr;
  }

  postOrder(func = (n) => n, root = this.root) {
    if (root === null) {
      return [];
    }

    let arr = [];

    arr.push(...this.postOrder(func, root.left));
    arr.push(...this.postOrder(func, root.right));
    arr.push(func(root.data));

    return arr;
  }

  depth(node, root = this.root, steps = 0) {
    if (root === null) {
      return null;
    }

    if (node < root.data) {
      return this.depth(node, root.left, steps + 1);
    } else if (node > root.data) {
      return this.depth(node, root.right, steps + 1);
    } else {
      return steps;
    }
  }

  height(node, root = this.find(node)) {
    if (root === null) {
      return -1;
    }

    let leftHeight = this.height(node, root.left);
    let rightHeight = this.height(node, root.right);
    let ans = Math.max(leftHeight, rightHeight) + 1;

    return ans;
  }

  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }
    let leftHeight;
    let rightHeight;
    if (root.left) {
      leftHeight = this.height(root.left.data);
    } else {
      leftHeight = 0;
    }

    if (root.right) {
      rightHeight = this.height(root.right.data);
    } else {
      rightHeight = 0;
    }

    if (![-1, 0, 1].includes(leftHeight - rightHeight)) {
      return false;
    } else {
      let balanced = this.isBalanced(root.left) && this.isBalanced(root.right);
      return balanced;
    }
  }

  reBalance() {
    let arr = this.inOrder();
    this.root = buildTree(arr, 0, arr.length - 1);
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

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "???   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "????????? " : "????????? "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "???   "}`, true);
  }
};

randomArray = (length = 100, max = 1000) =>
  [...new Array(length)].map(() => Math.round(Math.random() * max));

let random = randomArray();

let tree = new Tree(random);

prettyPrint(tree.root);

console.log("Balanced: " + tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

for (let i = 0; i < 101; i++) {
  tree.insert(Math.round(Math.random() * 1000));
}

console.log("Balanced: " + tree.isBalanced());

tree.reBalance();

console.log("Balanced: " + tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

prettyPrint(tree.root);
