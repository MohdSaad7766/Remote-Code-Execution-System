const SelectionSortCode = {
  Java: `public class SelectionSort {
    void selectionSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n-1; i++) {
            int min_idx = i;
            for (int j = i+1; j < n; j++) {
                if (arr[j] < arr[min_idx]) {
                    min_idx = j;
                }
            }
            // Swap the found minimum element with the first element
            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
    }

    void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        SelectionSort sorter = new SelectionSort();
        int[] arr = {64, 25, 12, 22, 11};
        System.out.print("Unsorted array: ");
        sorter.printArray(arr);

        sorter.selectionSort(arr);
        System.out.print("Sorted array: ");
        sorter.printArray(arr);
    }
}
`,
  JavaScript: `function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        // Swap the found minimum element with the first element
        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    }
}

function printArray(arr) {
    console.log(arr.join(" "));
}

// Example usage
let arr = [64, 25, 12, 22, 11];
console.log("Unsorted array:");
printArray(arr);

selectionSort(arr);

console.log("Sorted array:");
printArray(arr);
`,
  Python: `def selection_sort(arr):
    n = len(arr)

    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

def print_array(arr):
    print(" ".join(map(str, arr)))

# Example usage
arr = [64, 25, 12, 22, 11]
print("Unsorted array:")
print_array(arr)

selection_sort(arr)

print("Sorted array:")
print_array(arr)
`,
  "C++": `#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        // Swap the found minimum element with the first element
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        cout << arr[i] << " ";
    cout << endl;
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);

    cout << "Unsorted array: ";
    printArray(arr, n);

    selectionSort(arr, n);

    cout << "Sorted array: ";
    printArray(arr, n);

    return 0;
}
`,
  output: `Unsorted array: 64 25 12 22 11
Sorted array: 11 12 22 25 64`
};

export default SelectionSortCode;
