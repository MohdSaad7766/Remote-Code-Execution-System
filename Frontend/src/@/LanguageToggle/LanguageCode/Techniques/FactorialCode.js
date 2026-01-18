const FactorialCode = {
  Java: `public class FactorialExample {
    // Iterative approach
    public static int factorialIterative(int n) {
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Recursive approach
    public static int factorialRecursive(int n) {
        if (n == 0) {
            return 1;
        }
        return n * factorialRecursive(n - 1);
    }

    public static void main(String[] args) {
        int num = 5;
        
        System.out.println("Factorial (Iterative) of " + num + ": " + factorialIterative(num));
        System.out.println("Factorial (Recursive) of " + num + ": " + factorialRecursive(num));
    }
}
`,
  JavaScript: `// Iterative approach
function factorialIterative(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Recursive approach
function factorialRecursive(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

// Example usage
const num = 5;
console.log("Factorial (Iterative) of " + num + ": " + factorialIterative(num));
console.log("Factorial (Recursive) of " + num + ": " + factorialRecursive(num));
`,
  Python: `# Iterative approach
def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

# Recursive approach
def factorial_recursive(n):
    if n == 0:
        return 1
    return n * factorial_recursive(n - 1)

# Example usage
num = 5
print("Factorial (Iterative) of", num, ":", factorial_iterative(num))
print("Factorial (Recursive) of", num, ":", factorial_recursive(num))
`,
  "C++": `#include <iostream>
using namespace std;

// Iterative approach
int factorialIterative(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Recursive approach
int factorialRecursive(int n) {
    if (n == 0) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

int main() {
    int num = 5;
    cout << "Factorial (Iterative) of " << num << ": " << factorialIterative(num) << endl;
    cout << "Factorial (Recursive) of " << num << ": " << factorialRecursive(num) << endl;
    return 0;
}
`,
  output: `Factorial (Iterative) of 5: 120
Factorial (Recursive) of 5: 120`
};

export default FactorialCode;
