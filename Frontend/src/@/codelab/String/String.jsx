import React, { useState } from 'react';
import DSAImg from '../../components/DsaImg/DSAImg';
import LanguageToggle from '../../LanguageToggle/LanguageToggle';
import StringCode from '../../LanguageToggle/LanguageCode/StringCode';
import StringApplications from './StringApplication';

export default function String() {
    const [selectString,setSelectString] = useState("Java")
  return (
    <div className="h-auto p-8 leading-relaxed">
      <header>
        <h1 className="text-4xl font-bold">Strings in Data Structures</h1>
        
      </header>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold">Introduction to Strings</h2>
        <p className="mt-2 leading-relaxed">
          Strings are sequences of characters. The differences between a character array and a string are, a string is
          terminated with a special character ‘\0’ and strings are typically immutable in most of the programming languages
          like Java, Python, and JavaScript.
        </p>
        <p className="mt-2 bg-gray-900 pt-4 pb-4 pl-2.5">
          Examples of strings: “teams”, “for”, “codelab”, “this is project”, “123codelab”, “@123 hello”
        </p>
        {/* <DSAImg src="../img/String/string.png" alt="String" /> */}

        <h2 className="text-2xl font-semibold mt-6">How Strings are represented in Memory?</h2>
        <p className="mt-2">
          In C, a string can be referred to either using a character pointer or as a character array. When strings are declared
          as character arrays, they are stored like other types of arrays in C. String literals (assigned to pointers) are
          immutable in C and C++.
        </p>
        <p className="mt-2">
          In C++, strings created using string class are mutable and internally represented as arrays. In Python, Java and
          JavaScript, strings characters are stored at contiguous locations (like arrays).
        </p>

        <h2 className="text-2xl font-semibold mt-6">How to Declare Strings in various languages?</h2>
        <ul className="list-disc ml-6 mt-2">
          <li><strong>C:</strong> Declared as character arrays or pointers, must end with a null character (\0).</li>
          <li><strong>C++:</strong> Supports both C-style character arrays and the std::string class.</li>
          <li><strong>Java:</strong> Strings are immutable objects of the String class.</li>
          <li><strong>Python:</strong> Declared using single, double, or triple quotes. No separate character type.</li>
          <li><strong>JavaScript:</strong> Strings are primitive types, defined using single, double, or template literals.</li>
          <li><strong>C#:</strong> Uses the string keyword, representing an immutable sequence of characters.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">General Operations performed on String</h2>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li><strong>Length of String:</strong> Refers to the total number of characters in the string including special characters.</li>
          <li><strong>Search a Character:</strong> Finding the position of a specific character in a string.</li>
          <li><strong>Check for Substring:</strong> Determine whether a smaller sequence of characters exists within the string.</li>
          <li><strong>Insert a Character:</strong> Add a character at a specific position (immutable strings need a new string).</li>
          <li><strong>Delete a Character:</strong> Remove a character while maintaining the rest of the sequence.</li>
          <li><strong>Check for Same Strings:</strong> Compare two strings character-by-character to check equality.</li>
          <li><strong>String Concatenation:</strong> Join two or more strings into one.</li>
          <li><strong>Reverse a String:</strong> Reverse the order of characters in the string.</li>
          <li><strong>Rotate a String:</strong> Shift characters to left or right by certain positions with wrapping.</li>
          <li><strong>Check for Palindrome:</strong> Check whether a string reads the same forwards and backwards.</li>
        </ul>

        <h3 className='text-2xl text-black font-semibold mt-8 mb-4'>Below is the representation of strings in various languages:</h3>
        <LanguageToggle selectedLanguage={selectString} setSelectedLanguage={setSelectString} codeSnippets={StringCode} />
        <StringApplications />
      </section>
    </div>
  );
}
