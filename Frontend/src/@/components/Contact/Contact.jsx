import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("myzjdbkb");

  if (state.succeeded) {
    return (
      <div className="h-screen flex items-center justify-center bg-black bg-opacity-60 text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold"
        >
          Thanks for reaching out! We'll get back to you soon.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="h-auto p-10 inset-0 bg-black flex items-center justify-center bg-opacity-60 backdrop-blur-sm px-4 overflow-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full sm:max-w-4xl py-6 flex flex-col justify-center min-h-screen"
      >
        <div className="relative py-3 w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-5 sm:rounded-3xl"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-white shadow-lg sm:rounded-3xl sm:p-8 text-center flex flex-col gap-6 p-6"
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold">Contact Us</h1>
              <p className="text-gray-600 mt-2">
                Reach out to us for any inquiries or support. We'd love to hear from you!
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full md:w-1/2 p-6 flex flex-col gap-6 bg-gray-100 rounded-lg"
              >
                <h1 className="text-2xl font-bold text-gray-800 text-left">Contact Info</h1>
                <div className="flex items-center gap-4 m-2.5">
                  <FaEnvelope className="text-sky-500 text-2xl" />
                  <p className="text-gray-700">code.lab.learn.dsa@gmail.com</p>
                </div>
                <div className="flex items-center gap-4 m-2.5">
                  <FaPhone className="text-sky-500 text-2xl" />
                  <p className="text-gray-700">+91 9175715785</p>
                </div>
                <div className="flex items-center gap-4 m-2.5">
                  <FaMapMarkerAlt className="text-sky-500 text-2xl" />
                  <p className="text-gray-700">Shahada, Nandurbar, Maharashtra</p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-full md:w-1/2 p-6 bg-black rounded-lg flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <motion.input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="p-2 bg-transparent border-b-2 border-sky-500 text-white focus:outline-none focus:ring-0"
                    whileFocus={{ scale: 1.02 }}
                  />

                  <motion.input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="p-2 bg-transparent border-b-2 border-sky-500 text-white focus:outline-none focus:ring-0"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />

                  <motion.textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    required
                    className="p-2 bg-transparent border-b-2 border-sky-500 text-white focus:outline-none focus:ring-0"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />

                  <motion.button
                    type="submit"
                    disabled={state.submitting}
                    className="p-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {state.submitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
