const DoublyImpliment = {
    Java: `class Node {
      int data;
      Node prev;
      Node next;
  
      // Constructor to initialize the node with data
      public Node(int data) {
          this.data = data;
          this.prev = null;
          this.next = null;
      }
  }`,
  
    JavaScript: `class Node {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  }`,
  
    Python: `class Node:
      def __init__(self, data):
          self.data = data
          self.prev = None
          self.next = None` ,
  
    "C++": `class Node {
  public:
      int data;
      Node* prev;
      Node* next;
  
      // Constructor to initialize the node with data
      Node(int data) {
          this->data = data;
          this->prev = nullptr;
          this->next = nullptr;
      }
  };`
  };
  
  export default DoublyImpliment;
  