import React from "react";

const StringApplications = () => {
  const applications = [
    {
      title: "Text Processing",
      description:
        "Used in word processors, search engines, and text editors for tasks like searching, replacing, and formatting text.",
    },
    {
      title: "Pattern Matching",
      description:
        "Algorithms like KMP, Rabin-Karp, and Z-algorithm are used in plagiarism checkers, spam filters, and DNA sequence analysis.",
    },
    {
      title: "Data Compression",
      description:
        "Used in tools like ZIP, JPEG, and video compression formats. Algorithms like Huffman and LZW rely on string patterns.",
    },
    {
      title: "Cryptography",
      description:
        "Strings are used in encryption and decryption processes (e.g., Caesar Cipher, RSA, AES).",
    },
    {
      title: "Compilers and Interpreters",
      description:
        "Strings are used to parse and analyze source code, handle tokens, and generate syntax trees.",
    },
    {
      title: "Networking and Protocols",
      description:
        "Protocols often use strings for commands and data exchange (e.g., HTTP requests, headers, URLs).",
    },
    {
      title: "Bioinformatics",
      description:
        "DNA and protein sequences are strings. Algorithms are used to search, match, and analyze genetic data.",
    },
    {
      title: "Chat Applications",
      description:
        "All communication in messengers or chat apps like WhatsApp and Slack is based on string manipulation.",
    },
  ];

  return (
    <div className="leading-relaxed">
      <h1 className="text-2xl  mt-8 font-bold mb-4">Applications of String Data Structure</h1>
      <ul className="space-y-2 ml-4 list-disc">
        {applications.map((app, index) => (
          <li key={index} className="">
            
            <p className=""><strong>{app.title}: </strong>{app.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StringApplications;
