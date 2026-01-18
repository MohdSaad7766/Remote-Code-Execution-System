import React from "react";
import DSARoadmap from "./DsaRoadmap";
import { motion } from "framer-motion";

// Animation Variants
const zoomIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const flipIn = {
  hidden: { rotateX: 90, opacity: 0 },
  visible: {
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (i = 1) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
};

const DSALanding = () => {
  return (
    <section className="md:p-8 p-8 max-w-5xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-6"
        variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Learn DSA (Data Structures and Algorithms)
      </motion.h1>

      <motion.p
        className="mb-6"
        variants={slideInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        DSA is the study of organizing data efficiently using data structures
        like <strong>arrays</strong>, <strong>stacks</strong>, and{" "}
        <strong>trees</strong>, paired with step-by-step procedures (or
        algorithms) to solve problems effectively. Data structures manage how
        data is stored and accessed, while algorithms focus on processing this
        data.
      </motion.p>

      {/* Why Learn DSA */}
      <motion.div
        className="p-3"
        variants={flipIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-4">Why to Learn DSA?</h2>
        <ul className="list-disc ml-3 space-y-2">
          {[
            "Learning DSA boosts your problem-solving abilities and makes you a stronger programmer.",
            "DSA is foundation for almost every software like GPS, Search Engines, AI ChatBots, Gaming Apps, Databases, Web Applications, etc.",
            "Top Companies like Google, Microsoft, Amazon, Apple, Meta and many other heavily focus on DSA in interviews.",
          ].map((point, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {point}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* How to Learn DSA */}
      <motion.div
        className="p-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          How to Learn DSA?
        </h2>
        <ul className="list-decimal list-inside space-y-2 text-gray-200">
          {[
            "Learn at least one programming language (C++, Java, Python, or JavaScript).",
            "Build your basic logic and understand Time and Space complexities.",
            "Study core Data Structures and Algorithms.",
            "Practice coding problems using predefined test cases.",
            "Solve problems daily on CodeLab, weekly using Codelab Weekly Contest.",
          ].map((point, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {point}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <DSARoadmap />
    </section>
  );
};

export default DSALanding;
