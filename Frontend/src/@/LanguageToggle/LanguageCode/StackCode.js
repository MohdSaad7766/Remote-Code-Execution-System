const StackCode = {
    Java: `import java.util.Stack;
  
  public class StackExample {
      public static void main(String[] args) {
          Stack<Integer> stack = new Stack<>();
  
          // Push elements onto the stack
          stack.push(5);
          stack.push(10);
          stack.push(15);
          stack.push(20);
          stack.push(25);
  
          System.out.println("Stack after pushing elements: " + stack);
  
          // Pop one element
          stack.pop();
  
          System.out.println("Stack after popping one element: " + stack);
      }
  }
  `,
    JavaScript: `class Stack {
      constructor() {
          this.items = [];
      }
  
      push(element) {
          this.items.push(element);
      }
  
      pop() {
          if (this.isEmpty()) return "Stack is empty";
          return this.items.pop();
      }
  
      peek() {
          if (this.isEmpty()) return "Stack is empty";
          return this.items[this.items.length - 1];
      }
  
      isEmpty() {
          return this.items.length === 0;
      }
  
      printStack() {
          console.log(this.items.join(" "));
      }
  }
  
  // Example usage
  const stack = new Stack();
  stack.push(5);
  stack.push(10);
  stack.push(15);
  stack.push(20);
  stack.push(25);
  
  console.log("Stack after pushing elements:");
  stack.printStack();
  
  stack.pop();
  
  console.log("Stack after popping one element:");
  stack.printStack();
  `,
    Python: `class Stack:
      def __init__(self):
          self.stack = []
  
      def push(self, element):
          self.stack.append(element)
  
      def pop(self):
          if self.is_empty():
              return "Stack is empty"
          return self.stack.pop()
  
      def peek(self):
          if self.is_empty():
              return "Stack is empty"
          return self.stack[-1]
  
      def is_empty(self):
          return len(self.stack) == 0
  
      def print_stack(self):
          print(" ".join(map(str, self.stack)))
  
  
  # Example usage
  stack = Stack()
  stack.push(5)
  stack.push(10)
  stack.push(15)
  stack.push(20)
  stack.push(25)
  
  print("Stack after pushing elements:")
  stack.print_stack()
  
  stack.pop()
  
  print("Stack after popping one element:")
  stack.print_stack()
  `,
    "C++": `#include <iostream>
  #include <stack>
  using namespace std;
  
  int main() {
      stack<int> s;
  
      // Push elements onto the stack
      s.push(5);
      s.push(10);
      s.push(15);
      s.push(20);
      s.push(25);
  
      cout << "Stack after pushing elements: ";
      stack<int> temp = s;
      while (!temp.empty()) {
          cout << temp.top() << " ";
          temp.pop();
      }
      cout << endl;
  
      // Pop one element
      s.pop();
  
      cout << "Stack after popping one element: ";
      temp = s;
      while (!temp.empty()) {
          cout << temp.top() << " ";
          temp.pop();
      }
      cout << endl;
  
      return 0;
  }
  `,
    output: `Stack after pushing elements: 5 10 15 20 25
  Stack after popping one element: 5 10 15 20`
  };
  
  export default StackCode;
  