const DoublyLinkedListCode = {
    Java: `class DoublyLinkedList {
      Node head;
  
      static class Node {
          int data;
          Node prev;
          Node next;
  
          Node(int d) {
              data = d;
              prev = null;
              next = null;
          }
      }
  
      public void append(int new_data) {
          Node new_node = new Node(new_data);
  
          if (head == null) {
              head = new_node;
              return;
          }
  
          Node last = head;
          while (last.next != null) {
              last = last.next;
          }
  
          last.next = new_node;
          new_node.prev = last;
      }
  
      public void printList() {
          Node temp = head;
          while (temp != null) {
              System.out.print(temp.data + " ");
              temp = temp.next;
          }
          System.out.println();
      }
  
      public static void main(String[] args) {
          DoublyLinkedList list = new DoublyLinkedList();
  
          list.append(5);
          list.append(15);
          list.append(25);
          list.append(35);
          list.append(45);
  
          System.out.println("Doubly Linked List:");
          list.printList();
      }
  }
  `,
    JavaScript: `class Node {
      constructor(data) {
          this.data = data;
          this.prev = null;
          this.next = null;
      }
  }
  
  class DoublyLinkedList {
      constructor() {
          this.head = null;
      }
  
      append(data) {
          const newNode = new Node(data);
  
          if (!this.head) {
              this.head = newNode;
              return;
          }
  
          let current = this.head;
          while (current.next) {
              current = current.next;
          }
  
          current.next = newNode;
          newNode.prev = current;
      }
  
      printList() {
          let current = this.head;
          let result = "";
          while (current) {
              result += current.data + " ";
              current = current.next;
          }
          console.log(result.trim());
      }
  }
  
  // Example usage
  const list = new DoublyLinkedList();
  list.append(5);
  list.append(15);
  list.append(25);
  list.append(35);
  list.append(45);
  
  console.log("Doubly Linked List:");
  list.printList();
  `,
    Python: `class Node:
      def __init__(self, data):
          self.data = data
          self.prev = None
          self.next = None
  
  class DoublyLinkedList:
      def __init__(self):
          self.head = None
  
      def append(self, data):
          new_node = Node(data)
  
          if self.head is None:
              self.head = new_node
              return
  
          last = self.head
          while last.next:
              last = last.next
  
          last.next = new_node
          new_node.prev = last
  
      def print_list(self):
          temp = self.head
          while temp:
              print(temp.data, end=" ")
              temp = temp.next
          print()
  
  # Example usage
  list = DoublyLinkedList()
  list.append(5)
  list.append(15)
  list.append(25)
  list.append(35)
  list.append(45)
  
  print("Doubly Linked List:")
  list.print_list()
  `,
    "C++": `#include <iostream>
  using namespace std;
  
  class Node {
  public:
      int data;
      Node* prev;
      Node* next;
  
      Node(int val) {
          data = val;
          prev = NULL;
          next = NULL;
      }
  };
  
  class DoublyLinkedList {
  public:
      Node* head;
  
      DoublyLinkedList() {
          head = NULL;
      }
  
      void append(int val) {
          Node* newNode = new Node(val);
  
          if (head == NULL) {
              head = newNode;
              return;
          }
  
          Node* temp = head;
          while (temp->next != NULL) {
              temp = temp->next;
          }
  
          temp->next = newNode;
          newNode->prev = temp;
      }
  
      void printList() {
          Node* temp = head;
          while (temp != NULL) {
              cout << temp->data << " ";
              temp = temp->next;
          }
          cout << endl;
      }
  };
  
  int main() {
      DoublyLinkedList list;
  
      list.append(5);
      list.append(15);
      list.append(25);
      list.append(35);
      list.append(45);
  
      cout << "Doubly Linked List:" << endl;
      list.printList();
  
      return 0;
  }
  `,
    output: `Doubly Linked List:
  5 15 25 35 45`
  };
  
  export default DoublyLinkedListCode;
  