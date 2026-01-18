const StringCode = {
  Java: `public class StringExample {
    // Method to reverse a string
    public static String reverseString(String str) {
        StringBuilder reversed = new StringBuilder(str);
        return reversed.reverse().toString();
    }

    // Method to check if a string is a palindrome
    public static boolean isPalindrome(String str) {
        String reversed = reverseString(str);
        return str.equals(reversed);
    }

    // Method to count occurrences of a character in a string
    public static int countOccurrences(String str, char c) {
        int count = 0;
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == c) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        String str = "madam";
        System.out.println("Original string: " + str);
        System.out.println("Reversed string: " + reverseString(str));
        System.out.println("Is palindrome: " + isPalindrome(str));
        System.out.println("Occurrences of 'a': " + countOccurrences(str, 'a'));
    }
}
`,
  JavaScript: `class StringOperations {
    // Method to reverse a string
    reverseString(str) {
        return str.split('').reverse().join('');
    }

    // Method to check if a string is a palindrome
    isPalindrome(str) {
        const reversed = this.reverseString(str);
        return str === reversed;
    }

    // Method to count occurrences of a character in a string
    countOccurrences(str, char) {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === char) {
                count++;
            }
        }
        return count;
    }
}

// Example usage
const strOps = new StringOperations();
const str = "madam";

console.log("Original string:", str);
console.log("Reversed string:", strOps.reverseString(str));
console.log("Is palindrome:", strOps.isPalindrome(str));
console.log("Occurrences of 'a':", strOps.countOccurrences(str, 'a'));
`,
  Python: `class StringOperations:
    # Method to reverse a string
    def reverse_string(self, s):
        return s[::-1]

    # Method to check if a string is a palindrome
    def is_palindrome(self, s):
        return s == self.reverse_string(s)

    # Method to count occurrences of a character in a string
    def count_occurrences(self, s, c):
        return s.count(c)


# Example usage
str_ops = StringOperations()
s = "madam"

print("Original string:", s)
print("Reversed string:", str_ops.reverse_string(s))
print("Is palindrome:", str_ops.is_palindrome(s))
print("Occurrences of 'a':", str_ops.count_occurrences(s, 'a'))
`,
  "C++": `#include <iostream>
#include <string>
using namespace std;

class StringOperations {
public:
    // Method to reverse a string
    string reverseString(string str) {
        string reversed = str;
        int n = reversed.length();
        for (int i = 0; i < n / 2; i++) {
            swap(reversed[i], reversed[n - i - 1]);
        }
        return reversed;
    }

    // Method to check if a string is a palindrome
    bool isPalindrome(string str) {
        string reversed = reverseString(str);
        return str == reversed;
    }

    // Method to count occurrences of a character in a string
    int countOccurrences(string str, char c) {
        int count = 0;
        for (char ch : str) {
            if (ch == c) {
                count++;
            }
        }
        return count;
    }
};

int main() {
    StringOperations strOps;
    string str = "madam";

    cout << "Original string: " << str << endl;
    cout << "Reversed string: " << strOps.reverseString(str) << endl;
    cout << "Is palindrome: " << (strOps.isPalindrome(str) ? "Yes" : "No") << endl;
    cout << "Occurrences of 'a': " << strOps.countOccurrences(str, 'a') << endl;

    return 0;
}
`,
  output: `Original string: madam
Reversed string: madam
Is palindrome: Yes
Occurrences of 'a': 2`
};

export default StringCode;
