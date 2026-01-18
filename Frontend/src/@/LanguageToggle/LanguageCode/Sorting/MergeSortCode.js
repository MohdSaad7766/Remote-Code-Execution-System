const MergeSortCode = {
    Java: `public class MergeSort {
      void merge(int arr[], int left, int mid, int right) {
          int n1 = mid - left + 1;
          int n2 = right - mid;
  
          int L[] = new int[n1];
          int R[] = new int[n2];
  
          for (int i = 0; i < n1; ++i)
              L[i] = arr[left + i];
          for (int j = 0; j < n2; ++j)
              R[j] = arr[mid + 1 + j];
  
          int i = 0, j = 0;
          int k = left;
          while (i < n1 && j < n2) {
              if (L[i] <= R[j]) {
                  arr[k] = L[i];
                  i++;
              } else {
                  arr[k] = R[j];
                  j++;
              }
              k++;
          }
  
          while (i < n1) {
              arr[k] = L[i];
              i++;
              k++;
          }
  
          while (j < n2) {
              arr[k] = R[j];
              j++;
              k++;
          }
      }
  
      void mergeSort(int arr[], int left, int right) {
          if (left < right) {
              int mid = (left + right) / 2;
  
              mergeSort(arr, left, mid);
              mergeSort(arr, mid + 1, right);
  
              merge(arr, left, mid, right);
          }
      }
  
      void printArray(int arr[]) {
          for (int i = 0; i < arr.length; ++i)
              System.out.print(arr[i] + " ");
          System.out.println();
      }
  
      public static void main(String args[]) {
          int arr[] = {38, 27, 43, 3, 9, 82, 10};
  
          System.out.print("Unsorted array: ");
          MergeSort sorter = new MergeSort();
          sorter.printArray(arr);
  
          sorter.mergeSort(arr, 0, arr.length - 1);
  
          System.out.print("Sorted array: ");
          sorter.printArray(arr);
      }
  }
  `,
    JavaScript: `function merge(arr, left, mid, right) {
      let n1 = mid - left + 1;
      let n2 = right - mid;
  
      let L = arr.slice(left, mid + 1);
      let R = arr.slice(mid + 1, right + 1);
  
      let i = 0, j = 0, k = left;
  
      while (i < n1 && j < n2) {
          if (L[i] <= R[j]) {
              arr[k] = L[i];
              i++;
          } else {
              arr[k] = R[j];
              j++;
          }
          k++;
      }
  
      while (i < n1) {
          arr[k] = L[i];
          i++;
          k++;
      }
  
      while (j < n2) {
          arr[k] = R[j];
          j++;
          k++;
      }
  }
  
  function mergeSort(arr, left, right) {
      if (left >= right) {
          return;
      }
      let mid = Math.floor((left + right) / 2);
      mergeSort(arr, left, mid);
      mergeSort(arr, mid + 1, right);
      merge(arr, left, mid, right);
  }
  
  function printArray(arr) {
      console.log(arr.join(" "));
  }
  
  // Example usage
  let arr = [38, 27, 43, 3, 9, 82, 10];
  console.log("Unsorted array:");
  printArray(arr);
  
  mergeSort(arr, 0, arr.length - 1);
  
  console.log("Sorted array:");
  printArray(arr);
  `,
    Python: `def merge(arr, left, mid, right):
      n1 = mid - left + 1
      n2 = right - mid
  
      L = arr[left:mid+1]
      R = arr[mid+1:right+1]
  
      i = j = 0
      k = left
  
      while i < n1 and j < n2:
          if L[i] <= R[j]:
              arr[k] = L[i]
              i += 1
          else:
              arr[k] = R[j]
              j += 1
          k += 1
  
      while i < n1:
          arr[k] = L[i]
          i += 1
          k += 1
  
      while j < n2:
          arr[k] = R[j]
          j += 1
          k += 1
  
  def merge_sort(arr, left, right):
      if left < right:
          mid = (left + right) // 2
          merge_sort(arr, left, mid)
          merge_sort(arr, mid + 1, right)
          merge(arr, left, mid, right)
  
  def print_array(arr):
      print(" ".join(map(str, arr)))
  
  # Example usage
  arr = [38, 27, 43, 3, 9, 82, 10]
  print("Unsorted array:")
  print_array(arr)
  
  merge_sort(arr, 0, len(arr) - 1)
  
  print("Sorted array:")
  print_array(arr)
  `,
    "C++": `#include <iostream>
  using namespace std;
  
  void merge(int arr[], int left, int mid, int right) {
      int n1 = mid - left + 1;
      int n2 = right - mid;
  
      int* L = new int[n1];
      int* R = new int[n2];
  
      for (int i = 0; i < n1; i++)
          L[i] = arr[left + i];
      for (int j = 0; j < n2; j++)
          R[j] = arr[mid + 1 + j];
  
      int i = 0, j = 0, k = left;
  
      while (i < n1 && j < n2) {
          if (L[i] <= R[j]) {
              arr[k] = L[i];
              i++;
          } else {
              arr[k] = R[j];
              j++;
          }
          k++;
      }
  
      while (i < n1) {
          arr[k] = L[i];
          i++;
          k++;
      }
  
      while (j < n2) {
          arr[k] = R[j];
          j++;
          k++;
      }
  
      delete[] L;
      delete[] R;
  }
  
  void mergeSort(int arr[], int left, int right) {
      if (left >= right)
          return;
  
      int mid = left + (right - left) / 2;
      mergeSort(arr, left, mid);
      mergeSort(arr, mid + 1, right);
      merge(arr, left, mid, right);
  }
  
  void printArray(int arr[], int size) {
      for (int i = 0; i < size; i++)
          cout << arr[i] << " ";
      cout << endl;
  }
  
  int main() {
      int arr[] = {38, 27, 43, 3, 9, 82, 10};
      int arr_size = sizeof(arr) / sizeof(arr[0]);
  
      cout << "Unsorted array: ";
      printArray(arr, arr_size);
  
      mergeSort(arr, 0, arr_size - 1);
  
      cout << "Sorted array: ";
      printArray(arr, arr_size);
      return 0;
  }
  `,
    output: `Unsorted array: 38 27 43 3 9 82 10
  Sorted array: 3 9 10 27 38 43 82`
  };
  
  export default MergeSortCode;
  