const BinarySearchCode = {
    Java: `public class BinarySearchExample {
      // Binary Search implementation
      public static int binarySearch(int[] arr, int target) {
          int left = 0;
          int right = arr.length - 1;
  
          while (left <= right) {
              int mid = left + (right - left) / 2;
  
              if (arr[mid] == target) {
                  return mid; // Target found
              }
  
              if (arr[mid] < target) {
                  left = mid + 1; // Search in the right half
              } else {
                  right = mid - 1; // Search in the left half
              }
          }
  
          return -1; // Target not found
      }
  
      public static void main(String[] args) {
          int[] arr = {1, 3, 5, 7, 9, 11, 13};
          int target = 7;
  
          int result = binarySearch(arr, target);
          if (result != -1) {
              System.out.println("Element found at index: " + result);
          } else {
              System.out.println("Element not found");
          }
      }
  }
  `,
    JavaScript: `function binarySearch(arr, target) {
      let left = 0;
      let right = arr.length - 1;
  
      while (left <= right) {
          let mid = Math.floor((left + right) / 2);
  
          if (arr[mid] === target) {
              return mid; // Target found
          }
  
          if (arr[mid] < target) {
              left = mid + 1; // Search in the right half
          } else {
              right = mid - 1; // Search in the left half
          }
      }
  
      return -1; // Target not found
  }
  
  // Example usage
  const arr = [1, 3, 5, 7, 9, 11, 13];
  const target = 7;
  const result = binarySearch(arr, target);
  if (result !== -1) {
      console.log("Element found at index:", result);
  } else {
      console.log("Element not found");
  }
  `,
    Python: `def binary_search(arr, target):
      left = 0
      right = len(arr) - 1
  
      while left <= right:
          mid = (left + right) // 2
  
          if arr[mid] == target:
              return mid  # Target found
  
          if arr[mid] < target:
              left = mid + 1  # Search in the right half
          else:
              right = mid - 1  # Search in the left half
  
      return -1  # Target not found
  
  # Example usage
  arr = [1, 3, 5, 7, 9, 11, 13]
  target = 7
  result = binary_search(arr, target)
  if result != -1:
      print("Element found at index:", result)
  else:
      print("Element not found")
  `,
    "C++": `#include <iostream>
  using namespace std;
  
  // Binary Search implementation
  int binarySearch(int arr[], int n, int target) {
      int left = 0;
      int right = n - 1;
  
      while (left <= right) {
          int mid = left + (right - left) / 2;
  
          if (arr[mid] == target) {
              return mid; // Target found
          }
  
          if (arr[mid] < target) {
              left = mid + 1; // Search in the right half
          } else {
              right = mid - 1; // Search in the left half
          }
      }
  
      return -1; // Target not found
  }
  
  int main() {
      int arr[] = {1, 3, 5, 7, 9, 11, 13};
      int target = 7;
      int n = sizeof(arr) / sizeof(arr[0]);
  
      int result = binarySearch(arr, n, target);
      if (result != -1) {
          cout << "Element found at index: " << result << endl;
      } else {
          cout << "Element not found" << endl;
      }
  
      return 0;
  }
  `,
    output: `Element found at index: 3`
  };
  
  export default BinarySearchCode;
  