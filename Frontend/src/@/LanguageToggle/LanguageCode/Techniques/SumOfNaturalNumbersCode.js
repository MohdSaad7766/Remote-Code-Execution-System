const SumOfNaturalNumbersCode = {
  Java: `public class SumOfNaturalNumbers {
    // Recursive approach
    public static int sumRecursive(int N) {
        if (N == 0) {
            return 0;
        }
        return N + sumRecursive(N - 1);
    }

    public static void main(String[] args) {
        int N = 5;
        System.out.println("Sum of first " + N + " natural numbers (Recursive): " + sumRecursive(N));
    }
}
`,
  JavaScript: `// Recursive approach
function sumRecursive(N) {
    if (N === 0) {
        return 0;
    }
    return N + sumRecursive(N - 1);
}

// Example usage
let N = 5;
console.log("Sum of first " + N + " natural numbers (Recursive): " + sumRecursive(N));
`,
  Python: `# Recursive approach
def sum_recursive(N):
    if N == 0:
        return 0
    return N + sum_recursive(N - 1)

# Example usage
N = 5
print("Sum of first", N, "natural numbers (Recursive):", sum_recursive(N))
`,
  "C++": `#include <iostream>
using namespace std;

// Recursive approach
int sumRecursive(int N) {
    if (N == 0) {
        return 0;
    }
    return N + sumRecursive(N - 1);
}

int main() {
    int N = 5;
    cout << "Sum of first " << N << " natural numbers (Recursive): " << sumRecursive(N) << endl;
    return 0;
}
`,
  output: `Sum of first 5 natural numbers (Recursive): 15`

};
  
  export default SumOfNaturalNumbersCode;
  