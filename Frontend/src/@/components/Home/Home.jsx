import React from "react";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import Card from "../Card/Card";
import Cardcode from "../Card/Card-code";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen w-full bg-black overflow-hidden"
    >
      {/* ✨ Floating Glowing Orb */}
      <motion.div
        className="absolute top-[20%] left-[10%] h-60 w-60 bg-sky-500/20 blur-3xl rounded-full z-0"
        animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌌 Radial Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,#0ea5e9_0%,transparent_40%)] opacity-20 pointer-events-none z-0" />

      {/* Background Grid */}
      <div className="bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:80px_80px] z-10 relative">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden z-10">
          <div className="h-150 flex flex-col-reverse lg:flex-row items-center justify-center px-6 pt-24 pb-10 gap-10">
            {/* Text */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="max-w-xl text-center lg:text-left z-10"
            >
              <h1 className="text-5xl font-bold text-white sm:text-6xl leading-tight">
                Code <span className="text-sky-500">smarter, faster,</span> and{" "}
                <span className="text-sky-500">better..</span>
              </h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-6 text-lg leading-8 text-gray-300"
              >
                Elevate your coding skills with hands-on challenges and
                visualization.
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 inline-block"
              >
                <Button
                  label="Get Start"
                  to="/problems"
                  className="text-white bg-sky-500 hover:bg-sky-600 transition"
                />
              </motion.div>
            </motion.div>

            {/* Floating Image */}
            <motion.img
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              whileHover={{ scale: 1.03, rotate: 2 }}
              className="w-[300px] sm:w-[400px] opacity-40 drop-shadow-2xl z-10"
              src="./img/tree.png"
              alt="Graphic"
            />
          </div>

          {/* Cards Section with Scroll Animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
            className="flex flex-col items-center px-6 py-16 gap-12 z-10"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Card />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full"
            >
              <Cardcode />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
