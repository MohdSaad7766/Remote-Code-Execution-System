const ArrayCode = {
  Java: `import java.util.Arrays;

public class ArrayExample {
    public static void main(String[] args) {
        // Declare and initialize an array
        int[] arr = {10, 20, 30, 40, 50};

        // Access elements
        System.out.println("Element at index 2: " + arr[2]);

        // Update element
        arr[2] = 35;
        System.out.println("Updated array: " + Arrays.toString(arr));

        // Insert new element at the end (arrays are fixed-size, so create a new one)
        int[] newArr = Arrays.copyOf(arr, arr.length + 1);
        newArr[newArr.length - 1] = 60;
        System.out.println("Array after insertion: " + Arrays.toString(newArr));

        // Delete element (e.g., delete element at index 1)
        for (int i = 1; i < newArr.length - 1; i++) {
            newArr[i] = newArr[i + 1];
        }
        newArr = Arrays.copyOf(newArr, newArr.length - 1);
        System.out.println("Array after deletion: " + Arrays.toString(newArr));
    }
}
`,
  JavaScript: `// Declare and initialize an array
let arr = [10, 20, 30, 40, 50];

// Access elements
console.log("Element at index 2:", arr[2]);

// Update element
arr[2] = 35;
console.log("Updated array:", arr);

// Insert new element
arr.push(60);
console.log("Array after insertion:", arr);

// Delete element (delete at index 1)
arr.splice(1, 1);
console.log("Array after deletion:", arr);
`,
  Python: `# Declare and initialize an array (list in Python)
arr = [10, 20, 30, 40, 50]

# Access elements
print("Element at index 2:", arr[2])

# Update element
arr[2] = 35
print("Updated array:", arr)

# Insert new element
arr.append(60)
print("Array after insertion:", arr)

# Delete element (delete at index 1)
del arr[1]
print("Array after deletion:", arr)
`,
  "C++": `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Declare and initialize a vector
    vector<int> arr = {10, 20, 30, 40, 50};

    // Access elements
    cout << "Element at index 2: " << arr[2] << endl;

    // Update element
    arr[2] = 35;
    cout << "Updated array: ";
    for (int val : arr) cout << val << " ";
    cout << endl;

    // Insert new element
    arr.push_back(60);
    cout << "Array after insertion: ";
    for (int val : arr) cout << val << " ";
    cout << endl;

    // Delete element (delete at index 1)
    arr.erase(arr.begin() + 1);
    cout << "Array after deletion: ";
    for (int val : arr) cout << val << " ";
    cout << endl;

    return 0;
}
`,
  output: `Element at index 2: 30
Updated array: [10, 20, 35, 40, 50]
Array after insertion: [10, 20, 35, 40, 50, 60]
Array after deletion: [10, 35, 40, 50, 60]`
};

export default ArrayCode;
