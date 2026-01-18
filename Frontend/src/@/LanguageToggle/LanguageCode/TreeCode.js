const TreeCode = {
    Java: `class BinaryTree {
      static class Node {
          int data;
          Node left, right;
  
          public Node(int data) {
              this.data = data;
              left = right = null;
          }
      }
  
      Node root;
  
      // Insert a new node
      public void insert(int data) {
          root = insertRec(root, data);
      }
  
      // Recursive function to insert a new node
      private Node insertRec(Node root, int data) {
          if (root == null) {
              root = new Node(data);
              return root;
          }
  
          if (data < root.data) {
              root.left = insertRec(root.left, data);
          } else if (data > root.data) {
              root.right = insertRec(root.right, data);
          }
  
          return root;
      }
  
      // Inorder traversal of the tree
      public void inorder() {
          inorderRec(root);
      }
  
      private void inorderRec(Node root) {
          if (root != null) {
              inorderRec(root.left);
              System.out.print(root.data + " ");
              inorderRec(root.right);
          }
      }
  
      public static void main(String[] args) {
          BinaryTree tree = new BinaryTree();
          tree.insert(10);
          tree.insert(20);
          tree.insert(30);
          tree.insert(40);
          tree.insert(50);
          tree.insert(60);
  
          System.out.print("Inorder traversal of the tree: ");
          tree.inorder();
      }
  }
  `,
    JavaScript: `class Node {
      constructor(data) {
          this.data = data;
          this.left = null;
          this.right = null;
      }
  }
  
  class BinaryTree {
      constructor() {
          this.root = null;
      }
  
      insert(data) {
          this.root = this.insertRec(this.root, data);
      }
  
      insertRec(root, data) {
          if (root === null) {
              root = new Node(data);
              return root;
          }
  
          if (data < root.data) {
              root.left = this.insertRec(root.left, data);
          } else if (data > root.data) {
              root.right = this.insertRec(root.right, data);
          }
  
          return root;
      }
  
      inorder() {
          this.inorderRec(this.root);
      }
  
      inorderRec(root) {
          if (root !== null) {
              this.inorderRec(root.left);
              console.log(root.data + " ");
              this.inorderRec(root.right);
          }
      }
  }
  
  // Example usage
  const tree = new BinaryTree();
  tree.insert(10);
  tree.insert(20);
  tree.insert(30);
  tree.insert(40);
  tree.insert(50);
  tree.insert(60);
  
  console.log("Inorder traversal of the tree:");
  tree.inorder();
  `,
    Python: `class Node:
      def __init__(self, data):
          self.data = data
          self.left = None
          self.right = None
  
  class BinaryTree:
      def __init__(self):
          self.root = None
  
      def insert(self, data):
          self.root = self._insert(self.root, data)
  
      def _insert(self, root, data):
          if root is None:
              return Node(data)
  
          if data < root.data:
              root.left = self._insert(root.left, data)
          elif data > root.data:
              root.right = self._insert(root.right, data)
  
          return root
  
      def inorder(self):
          self._inorder(self.root)
  
      def _inorder(self, root):
          if root:
              self._inorder(root.left)
              print(root.data, end=" ")
              self._inorder(root.right)
  
  
  # Example usage
  tree = BinaryTree()
  tree.insert(10)
  tree.insert(20)
  tree.insert(30)
  tree.insert(40)
  tree.insert(50)
  tree.insert(60)
  
  print("Inorder traversal of the tree:")
  tree.inorder()
  `,
    "C++": `#include <iostream>
  using namespace std;
  
  class Node {
  public:
      int data;
      Node* left;
      Node* right;
  
      Node(int val) {
          data = val;
          left = right = nullptr;
      }
  };
  
  class BinaryTree {
  public:
      Node* root;
  
      BinaryTree() {
          root = nullptr;
      }
  
      void insert(int val) {
          root = insertRec(root, val);
      }
  
      Node* insertRec(Node* root, int val) {
          if (root == nullptr) {
              return new Node(val);
          }
  
          if (val < root->data) {
              root->left = insertRec(root->left, val);
          } else if (val > root->data) {
              root->right = insertRec(root->right, val);
          }
  
          return root;
      }
  
      void inorder() {
          inorderRec(root);
      }
  
      void inorderRec(Node* root) {
          if (root != nullptr) {
              inorderRec(root->left);
              cout << root->data << " ";
              inorderRec(root->right);
          }
      }
  };
  
  int main() {
      BinaryTree tree;
  
      tree.insert(10);
      tree.insert(20);
      tree.insert(30);
      tree.insert(40);
      tree.insert(50);
      tree.insert(60);
  
      cout << "Inorder traversal of the tree: ";
      tree.inorder();
      cout << endl;
  
      return 0;
  }
  `,
    output: `Inorder traversal of the tree:
  10 20 30 40 50 60`
  };
  
  export default TreeCode;
  