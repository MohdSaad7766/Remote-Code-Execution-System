const LinearSearchCode = {
    Java: `public class LinearSearchExample {
      // Linear Search implementation
      public static int linearSearch(int[] arr, int target) {
          for (int i = 0; i < arr.length; i++) {
              if (arr[i] == target) {
                  return i; // Target found
              }
          }
          return -1; // Target not found
      }
  
      public static void main(String[] args) {
          int[] arr = {5, 3, 8, 6, 7, 9};
          int target = 6;
  
          int result = linearSearch(arr, target);
          if (result != -1) {
              System.out.println("Element found at index: " + result);
          } else {
              System.out.println("Element not found");
          }
      }
  }
  `,
    JavaScript: `function linearSearch(arr, target) {
      for (let i = 0; i < arr.length; i++) {
          if (arr[i] === target) {
              return i; // Target found
          }
      }
      return -1; // Target not found
  }
  
  // Example usage
  const arr = [5, 3, 8, 6, 7, 9];
  const target = 6;
  const result = linearSearch(arr, target);
  if (result !== -1) {
      console.log("Element found at index:", result);
  } else {
      console.log("Element not found");
  }
  `,
    Python: `def linear_search(arr, target):
      for i in range(len(arr)):
          if arr[i] == target:
              return i  # Target found
      return -1  # Target not found
  
  # Example usage
  arr = [5, 3, 8, 6, 7, 9]
  target = 6
  result = linear_search(arr, target)
  if result != -1:
      print("Element found at index:", result)
  else:
      print("Element not found")
  `,
    "C++": `#include <iostream>
  using namespace std;
  
  // Linear Search implementation
  int linearSearch(int arr[], int n, int target) {
      for (int i = 0; i < n; i++) {
          if (arr[i] == target) {
              return i; // Target found
          }
      }
      return -1; // Target not found
  }
  
  int main() {
      int arr[] = {5, 3, 8, 6, 7, 9};
      int target = 6;
      int n = sizeof(arr) / sizeof(arr[0]);
  
      int result = linearSearch(arr, n, target);
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
  
  export default LinearSearchCode;
  