const LinkedListCode = {
    Java: `class LinkedList {
      Node head;
  
      static class Node {
          int data;
          Node next;
  
          Node(int d) {
              data = d;
              next = null;
          }
      }
  
      void printList() {
          Node current = head;
          while (current != null) {
              System.out.print(current.data + " ");
              current = current.next;
          }
      }
  
      public static void main(String[] args) {
          LinkedList list = new LinkedList();
          list.head = new Node(1);
          Node second = new Node(2);
          Node third = new Node(3);
  
          list.head.next = second;
          second.next = third;
  
          System.out.print("Linked List elements: ");
          list.printList();
      }
  }
  
  /*
  Output:
  Linked List elements: 1 2 3
  */`,
    JavaScript: `class LinkedList {
      constructor() {
          this.head = null;
      }
  
      printList() {
          let current = this.head;
          while (current) {
              process.stdout.write(current.data + " ");
              current = current.next;
          }
      }
  }
  
  class Node {
      constructor(data) {
          this.data = data;
          this.next = null;
      }
  }
  
  // Example usage
  const list = new LinkedList();
  list.head = new Node(1);
  const second = new Node(2);
  const third = new Node(3);
  
  list.head.next = second;
  second.next = third;
  
  process.stdout.write("Linked List elements: ");
  list.printList();
  
  /*
  Output:
  Linked List elements: 1 2 3
  */`,
    Python: `class Node:
      def __init__(self, data):
          self.data = data
          self.next = None
  
  class LinkedList:
      def __init__(self):
          self.head = None
  
      def print_list(self):
          current = self.head
          while current:
              print(current.data, end=" ")
              current = current.next
  
  # Example usage
  list = LinkedList()
  list.head = Node(1)
  second = Node(2)
  third = Node(3)
  
  list.head.next = second
  second.next = third
  
  print("Linked List elements:", end=" ")
  list.print_list()
  
  """
  Output:
  Linked List elements: 1 2 3
  """`,
    "C++": `#include <iostream>
  using namespace std;
  
  class Node {
  public:
      int data;
      Node* next;
  
      Node(int d) {
          data = d;
          next = nullptr;
      }
  };
  
  class LinkedList {
  public:
      Node* head;
  
      LinkedList() {
          head = nullptr;
      }
  
      void printList() {
          Node* current = head;
          while (current) {
              cout << current->data << " ";
              current = current->next;
          }
      }
  };
  
  int main() {
      LinkedList list;
      list.head = new Node(1);
      Node* second = new Node(2);
      Node* third = new Node(3);
  
      list.head->next = second;
      second->next = third;
  
      cout << "Linked List elements: ";
      list.printList();
  
      return 0;
  }
  
  /*
  Output:
  Linked List elements: 1 2 3
  */`,
  };
  
  export default LinkedListCode;
  