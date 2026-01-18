const InsertionSortCode = {
    Java: `public class InsertionSort {
      void insertionSort(int[] arr) {
          int n = arr.length;
          for (int i = 1; i < n; ++i) {
              int key = arr[i];
              int j = i - 1;
    
              // Move elements of arr[0..i-1], that are greater than key,
              // to one position ahead of their current position
              while (j >= 0 && arr[j] > key) {
                  arr[j + 1] = arr[j];
                  j = j - 1;
              }
              arr[j + 1] = key;
          }
      }
    
      void printArray(int[] arr) {
          for (int i = 0; i < arr.length; i++) {
              System.out.print(arr[i] + " ");
          }
          System.out.println();
      }
    
      public static void main(String[] args) {
          InsertionSort sorter = new InsertionSort();
          int[] arr = {29, 10, 14, 37, 13};
          System.out.print("Unsorted array: ");
          sorter.printArray(arr);
    
          sorter.insertionSort(arr);
          System.out.print("Sorted array: ");
          sorter.printArray(arr);
      }
  }
  `,
    JavaScript: `function insertionSort(arr) {
      let n = arr.length;
      for (let i = 1; i < n; i++) {
          let key = arr[i];
          let j = i - 1;
          
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j = j - 1;
          }
          arr[j + 1] = key;
      }
  }
    
  function printArray(arr) {
      console.log(arr.join(" "));
  }
    
  // Example usage
  let arr = [29, 10, 14, 37, 13];
  console.log("Unsorted array:");
  printArray(arr);
    
  insertionSort(arr);
    
  console.log("Sorted array:");
  printArray(arr);
  `,
    Python: `def insertion_sort(arr):
      n = len(arr)
      for i in range(1, n):
          key = arr[i]
          j = i - 1
          while j >= 0 and arr[j] > key:
              arr[j + 1] = arr[j]
              j -= 1
          arr[j + 1] = key
  
  def print_array(arr):
      print(" ".join(map(str, arr)))
  
  # Example usage
  arr = [29, 10, 14, 37, 13]
  print("Unsorted array:")
  print_array(arr)
  
  insertion_sort(arr)
  
  print("Sorted array:")
  print_array(arr)
  `,
    "C++": `#include <iostream>
  using namespace std;
  
  void insertionSort(int arr[], int n) {
      for (int i = 1; i < n; i++) {
          int key = arr[i];
          int j = i - 1;
          
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j = j - 1;
          }
          arr[j + 1] = key;
      }
  }
  
  void printArray(int arr[], int n) {
      for (int i = 0; i < n; i++) {
          cout << arr[i] << " ";
      }
      cout << endl;
  }
  
  int main() {
      int arr[] = {29, 10, 14, 37, 13};
      int n = sizeof(arr) / sizeof(arr[0]);
      
      cout << "Unsorted array: ";
      printArray(arr, n);
  
      insertionSort(arr, n);
  
      cout << "Sorted array: ";
      printArray(arr, n);
  
      return 0;
  }
  `,
    output: `Unsorted array: 29 10 14 37 13
  Sorted array: 10 13 14 29 37`
  };
  
  export default InsertionSortCode;
  