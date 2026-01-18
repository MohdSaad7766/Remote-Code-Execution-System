// ArraySyntax.js
import React from 'react';

function ArraySyntax() {
  const arrayExamples = {
    cpp: `// Declaration\nint numbers[5];\n\n// Initialization\nnumbers[0] = 1;\nnumbers[1] = 2;\nnumbers[2] = 3;\nnumbers[3] = 4;\nnumbers[4] = 5;`,
    java: `// Declaration\nint[] numbers = new int[5];\n\n// Initialization\nnumbers[0] = 1;\nnumbers[1] = 2;\nnumbers[2] = 3;\nnumbers[3] = 4;\nnumbers[4] = 5;`,
    python: `# Declaration and Initialization\nnumbers = [1, 2, 3, 4, 5]`,
    javascript: `// Declaration\nconst numbers = [];\n\n// Initialization\nnumbers.push(1);\nnumbers.push(2);\nnumbers.push(3);\nnumbers.push(4);\nnumbers.push(5);`
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Array Declarations and Initializations</h2>
      <div className="grid gap-4">
        {Object.entries(arrayExamples).map(([lang, code]) => (
          <pre key={lang} className="bg-gray-100 p-4 rounded shadow">
            <strong>{lang.toUpperCase()}:</strong>\n{code}
          </pre>
        ))}
      </div>
    </div>
  );
}

export default ArraySyntax;
