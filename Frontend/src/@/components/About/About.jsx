import { motion } from "framer-motion";
import TeamSection from "./TeamSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function About() {
  return (
    <>
      <section className="overflow-hidden px-8 bg-black py-2 sm:py-16">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex justify-center md:w-auto md:mx-auto px-6 lg:px-8 text-center flex-col items-center"
        >
          <motion.h2 className="text-5xl font-bold leading-tight text-white mb-6">
            About Us
          </motion.h2>
          <motion.p className="m-10 text-lg text-gray-200 max-w-3xl">
            DSA Codelab is an innovative platform built for aspiring programmers and computer science students to enhance their Data Structures and Algorithms (DSA) skills...
          </motion.p>
        </motion.div>

        {/* Features + Image */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-7xl px-12 lg:px-15 grid grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-20"
        >
          {/* Features */}
          <motion.div variants={fadeInUp} className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Features</p>
              <p className="mt-6 text-lg leading-8 text-white">
                Our mission is simple — make learning DSA engaging, visual, and practical.
              </p>
              <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                {[
                  {
                    title: "Code Editor with Test Cases",
                    desc: "Practice problems with real-time code execution and test case validation.",
                  },
                  {
                    title: "Interactive DSA Animations",
                    desc: "Learn how algorithms work under the hood with visual demonstrations.",
                  },
                  {
                    title: "Structured Problem Sets",
                    desc: "Tackle challenges sorted by difficulty, topics, and patterns.",
                  },
                  {
                    title: "Beginner-Friendly Interface",
                    desc: "Designed to help students transition smoothly from learning to problem-solving.",
                  },
                ].map(({ title, desc }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative pl-9 hover:scale-[1.02] transition-transform duration-300"
                  >
                    <dt className="inline font-semibold text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20">
                        <path d="M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z" />
                        <path d="M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z" />
                        <path d="M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z" />
                      </svg>
                      {title}
                    </dt>
                    <dd className="inline text-gray-400"> {desc}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative w-[48rem] sm:w-[57rem]">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                // className="absolute inset-0 z-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-20"
              />
              <img
                src="../img/aboutpage.jpg"
                alt="Product screenshot"
                className="w-full max-w-none rounded-xl shadow-xl  relative z-20"
                width="2432"
                height="1442"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Section */}
      <TeamSection />
    </>
  );
}
