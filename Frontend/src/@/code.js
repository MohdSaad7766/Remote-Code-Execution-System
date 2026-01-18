const stack = {
    'javascript': `class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        return this.items.length ? this.items.pop() : 'Stack is empty';
    }
    peek() {
        return this.items.length ? this.items[this.items.length - 1] : 'Stack is empty';
    }
    isEmpty() {
        return this.items.length === 0;
    }
}

// Example usage
const stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.pop()); // 20
console.log(stack.peek()); // 10
console.log(stack.isEmpty()); // false`,

    'python': `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop() if self.items else 'Stack is empty'

    def peek(self):
        return self.items[-1] if self.items else 'Stack is empty'

    def is_empty(self):
        return len(self.items) == 0

# Example usage
stack = Stack()
stack.push(10)
stack.push(20)
print(stack.pop())  # 20
print(stack.peek())  # 10
print(stack.is_empty())  # False`,

    'java': `import java.util.*;

class StackExample {
    Stack<Integer> stack = new Stack<>();

    void push(int item) {
        stack.push(item);
    }

    int pop() {
        return stack.isEmpty() ? -1 : stack.pop();
    }

    int peek() {
        return stack.isEmpty() ? -1 : stack.peek();
    }

    boolean isEmpty() {
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        StackExample stack = new StackExample();
        stack.push(10);
        stack.push(20);
        System.out.println(stack.pop()); // 20
        System.out.println(stack.peek()); // 10
        System.out.println(stack.isEmpty()); // false
    }
}`,

    'c++': `#include <iostream>
#include <stack>

class Stack {
private:
    std::stack<int> stack;
public:
    void push(int item) {
        stack.push(item);
    }

    int pop() {
        if (stack.empty()) return -1;
        int top = stack.top();
        stack.pop();
        return top;
    }

    int peek() {
        return stack.empty() ? -1 : stack.top();
    }

    bool isEmpty() {
        return stack.empty();
    }
};

int main() {
    Stack stack;
    stack.push(10);
    stack.push(20);
    std::cout << stack.pop() << std::endl; // 20
    std::cout << stack.peek() << std::endl; // 10
    std::cout << stack.isEmpty() << std::endl; // 0 (false)
    return 0;
}`
};
const linkedList = {
    'javascript': `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let temp = this.head;
        while (temp.next) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    display() {
        let temp = this.head;
        let result = "";
        while (temp) {
            result += temp.data + " -> ";
            temp = temp.next;
        }
        console.log(result + "null");
    }
}

// Example usage
const list = new LinkedList();
list.insert(10);
list.insert(20);
list.insert(30);
list.display(); // Output: 10 -> 20 -> 30 -> null`,

    'python': `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        temp = self.head
        while temp.next:
            temp = temp.next
        temp.next = new_node

    def display(self):
        temp = self.head
        while temp:
            print(temp.data, end=" -> ")
            temp = temp.next
        print("null")

# Example usage
ll = LinkedList()
ll.insert(10)
ll.insert(20)
ll.insert(30)
ll.display()  # Output: 10 -> 20 -> 30 -> null`,

    'java': `class Node {
    int data;
    Node next;

    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    private Node head;

    public void insert(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    public void display() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("null");
    }

    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.insert(10);
        list.insert(20);
        list.insert(30);
        list.display(); // Output: 10 -> 20 -> 30 -> null
    }
}`,

    'c++': `#include <iostream>

class Node {
public:
    int data;
    Node* next;
    
    Node(int data) {
        this->data = data;
        this->next = nullptr;
    }
};

class LinkedList {
private:
    Node* head;
public:
    LinkedList() {
        head = nullptr;
    }

    void insert(int data) {
        Node* newNode = new Node(data);
        if (!head) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next) {
            temp = temp->next;
        }
        temp->next = newNode;
    }

    void display() {
        Node* temp = head;
        while (temp) {
            std::cout << temp->data << " -> ";
            temp = temp->next;
        }
        std::cout << "null" << std::endl;
    }
};

int main() {
    LinkedList list;
    list.insert(10);
    list.insert(20);
    list.insert(30);
    list.display(); // Output: 10 -> 20 -> 30 -> null
    return 0;
}`
};



// sorting
const bubbleSort = {
    'javascript': `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
            }
        }
    }
    return arr;
}

// Example usage
console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));`,

    'python': `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j] # Swap
    return arr

# Example usage
print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))`,

    'java': `import java.util.Arrays;

class BubbleSort {
    static void bubbleSort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String args[]) {
        int arr[] = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}`,

    'c++': `#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]); // Swap
            }
        }
    }
}

int main() {
    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(arr);
    for (int num : arr) {
        std::cout << num << " ";
    }
    return 0;
}`
};
const quickSort = {
    'javascript': `function quickSort(arr) {
    if (arr.length <= 1) return arr;

    let pivot = arr[arr.length - 1];
    let left = arr.filter((el) => el < pivot);
    let right = arr.filter((el) => el > pivot);
    let middle = arr.filter((el) => el === pivot);

    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Example usage
console.log(quickSort([64, 34, 25, 12, 22, 11, 90]));`,

    'python': `def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[-1]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

# Example usage
print(quick_sort([64, 34, 25, 12, 22, 11, 90]))`,

    'java': `import java.util.Arrays;

class QuickSort {
    static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}`,

    'c++': `#include <iostream>
#include <vector>

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                std::swap(arr[i], arr[j]);
            }
        }
        std::swap(arr[i + 1], arr[high]);
        int pi = i + 1;

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    quickSort(arr, 0, arr.size() - 1);
    for (int num : arr) {
        std::cout << num << " ";
    }
    return 0;
}`
};

const mergeSort = {
    'javascript': `function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let sortedArray = [];
    while (left.length && right.length) {
        sortedArray.push(left[0] < right[0] ? left.shift() : right.shift());
    }
    return [...sortedArray, ...left, ...right];
}

// Example usage
console.log(mergeSort([64, 34, 25, 12, 22, 11, 90]));`,

    'python': `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    sorted_list = []
    while left and right:
        sorted_list.append(left.pop(0) if left[0] < right[0] else right.pop(0))
    return sorted_list + left + right

# Example usage
print(merge_sort([64, 34, 25, 12, 22, 11, 90]))`,

    'java': `import java.util.Arrays;

class MergeSort {
    static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1, n2 = right - mid;
        int[] L = new int[n1], R = new int[n2];

        for (int i = 0; i < n1; i++) L[i] = arr[left + i];
        for (int i = 0; i < n2; i++) R[i] = arr[mid + 1 + i];

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) arr[k++] = (L[i] < R[j]) ? L[i++] : R[j++];
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        mergeSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}`,

    'c++': `#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    std::vector<int> L(n1), R(n2);

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int i = 0; i < n2; i++) R[i] = arr[mid + 1 + i];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) arr[k++] = (L[i] < R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    mergeSort(arr, 0, arr.size() - 1);
    for (int num : arr) {
        std::cout << num << " ";
    }
    return 0;
}`
};





function showProgram(language, dataStructure, btn) {

    document.getElementById("code-display").textContent = dataStructure[language] || "Code not available.";
    document.getElementById("code-box").style.display = "block";

    document.querySelectorAll(".tab-button").forEach(button =>

        button.classList.remove("active"));
    btn.classList.add("active");

}