const QueueCode = {
  Java: `import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();

        // Enqueue elements
        queue.add(5);
        queue.add(10);
        queue.add(15);
        queue.add(20);
        queue.add(25);

        System.out.println("Queue after enqueuing elements: " + queue);

        // Dequeue one element
        queue.poll();

        System.out.println("Queue after dequeuing one element: " + queue);
    }
}
`,
  JavaScript: `class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return "Queue is empty";
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    printQueue() {
        console.log(this.items.join(" "));
    }
}

// Example usage
const queue = new Queue();
queue.enqueue(5);
queue.enqueue(10);
queue.enqueue(15);
queue.enqueue(20);
queue.enqueue(25);

console.log("Queue after enqueuing elements:");
queue.printQueue();

queue.dequeue();

console.log("Queue after dequeuing one element:");
queue.printQueue();
`,
  Python: `from collections import deque

# Initialize a queue
queue = deque()

# Enqueue elements
queue.append(5)
queue.append(10)
queue.append(15)
queue.append(20)
queue.append(25)

print("Queue after enqueuing elements:")
print(list(queue))

# Dequeue one element
queue.popleft()

print("Queue after dequeuing one element:")
print(list(queue))
`,
  "C++": `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;

    // Enqueue elements
    q.push(5);
    q.push(10);
    q.push(15);
    q.push(20);
    q.push(25);

    cout << "Queue after enqueuing elements: ";
    queue<int> temp = q;
    while (!temp.empty()) {
        cout << temp.front() << " ";
        temp.pop();
    }
    cout << endl;

    // Dequeue one element
    q.pop();

    cout << "Queue after dequeuing one element: ";
    temp = q;
    while (!temp.empty()) {
        cout << temp.front() << " ";
        temp.pop();
    }
    cout << endl;

    return 0;
}
`,
  output: `Queue after enqueuing elements: 5 10 15 20 25
Queue after dequeuing one element: 10 15 20 25`
};

export default QueueCode;
