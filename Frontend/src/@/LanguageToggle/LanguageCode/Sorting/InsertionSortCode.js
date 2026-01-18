const InsertionSortCode = {
    Java: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
      for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
  
        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = key;
      }
    }
  
    public static void main(String[] args) {
      int[] arr = {40, 20, 50, 10};
      insertionSort(arr);
      for (int num : arr) {
        System.out.print(num + " ");
      }
    }
  }`,
  
    Python: `def insertion_sort(arr):
      for i in range(1, len(arr)):
          key = arr[i]
          j = i - 1
  
          while j >= 0 and arr[j] > key:
              arr[j + 1] = arr[j]
              j -= 1
  
          arr[j + 1] = key
  
  arr = [40, 20, 50, 10]
  insertion_sort(arr)
  print(arr)`,
  
    JavaScript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
  
      arr[j + 1] = key;
    }
    return arr;
  }
  
  const arr = [40, 20, 50, 10];
  console.log(insertionSort(arr));`,
  
    "C++": `#include <iostream>
  using namespace std;
  
  void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
      int key = arr[i];
      int j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
  
      arr[j + 1] = key;
    }
  }
  
  int main() {
    int arr[] = {40, 20, 50, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
  
    insertionSort(arr, n);
  
    for (int i = 0; i < n; i++) {
      cout << arr[i] << " ";
    }
    return 0;
  }`
  };
  
  export default InsertionSortCode;
  