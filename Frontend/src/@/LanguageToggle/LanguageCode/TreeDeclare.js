const TreeDeclareCode = {
    Java: `class TreeNode {
      int value;
      TreeNode left, right;
      TreeNode(int value) {
          this.value = value;
          this.left = this.right = null;
      }
  }`,
    JavaScript: `class TreeNode {
      constructor(value) {
          this.value = value;
          this.left = null;
          this.right = null;
      }
  }`,
    Python: `class TreeNode:
      def __init__(self, value):
          self.value = value
          self.left = None
          self.right = None`,
    "C++": `class TreeNode {
  public:
      int value;
      TreeNode* left;
      TreeNode* right;
      TreeNode(int value) {
          this->value = value;
          this->left = this->right = nullptr;
      }
  };`,
  };
export default TreeDeclareCode;