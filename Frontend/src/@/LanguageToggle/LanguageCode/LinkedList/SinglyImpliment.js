const SinglyImpliment = {
    Java: `public class Node {
      int data;
      Node next;
  
      // Constructor to initialize the node with data
      public Node(int data) {
          this.data = data;
          this.next = null;
      }
  }`,
    JavaScript: `class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }`,
    Python: `class Node:
      def __init__(self, data):
          self.data = data
          self.next = None`,
    "C++": `class Node {
  public:
      int data;
      Node* next;
  
      // Constructor to initialize the node with data
      Node(int data) {
          this.data = data;
          this.next = nullptr;
      }
  };`
  };
  
  export default SinglyImpliment;
  