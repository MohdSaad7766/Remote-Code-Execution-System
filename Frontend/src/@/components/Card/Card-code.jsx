import React, { useRef } from "react";
import Button from "../Button/Button";
import { motion, useInView } from "framer-motion";
import useTypingEffect from "./useTypingEffect"; // adjust path if needed

const code = `<!DOCTYPE html>
<html>
<head><title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1><a href="/">Header</a></h1>
  <nav>
    <a href="one/">One</a>
    <a href="two/">Two</a>
    <a href="three/">Three</a>
  </nav>
</body>
</html>`;

export default function Cardcode() {
  const codeRef = useRef(null);
  const isInView = useInView(codeRef, { once: true, margin: "-100px" }); // triggers when near viewport
  const typedText = useTypingEffect(code, isInView, 15);

  return (
    <div className="p-2">
      <div className="relative m-6 lg:m-20 h-fit overflow-hidden rounded-xl border border-gray-800 p-[1px] backdrop-blur-3xl">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="inline-flex h-full flex-col sm:flex-row flex-wrap lg:flex-nowrap w-full items-center justify-center rounded-xl bg-black px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl">
          
          {/* Text Section */}
          <div className="m-5 p-5 w-full md:w-1/2 text-center md:text-left text-white">
            <p className="text-red-400 m-2">Quick Compiler</p>
            <h3 className="text-xl md:text-5xl font-bold m-2">
              Code On-the-Go with Quick Compiler
            </h3>
            <p className="text-gray-300 m-2 pb-4">
              Whether you're fine-tuning your code or exploring new languages,
              Quick Compiler simplifies the coding process, making it faster and
              more accessible for every developer.
            </p>
            <Button label="Get Start" to="/problems" className="mt-8 relative" />
          </div>

          {/* Code Section */}
          <motion.div
            ref={codeRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="m-5 relative flex left-11 top-11 p-4 w-full md:w-1/2 border items-center border-gray-800 rounded-md text-white overflow-hidden md:flex md:items-center bg-black/40"
          >
            <pre className="relative text-sm p-4 text-amber-500 leading-relaxed w-full whitespace-pre-wrap">
              {typedText}
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
