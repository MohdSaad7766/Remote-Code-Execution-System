import React from "react";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiCode
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-10 pb-8 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Brand Section */}
        <Link to="/" className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-black tracking-tighter text-white">
            CODE<span className="text-blue-500">LAB</span>
          </span>
        </Link>

        {/* Essential Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 text-sm font-medium text-gray-500">
          <Link className="hover:text-blue-500 transition-colors" to="/problems">Problems</Link>
          <Link className="hover:text-blue-500 transition-colors" to="/contestLanding">Contests</Link>
          <Link className="hover:text-blue-500 transition-colors" to="/about">About Us</Link>
          <Link className="hover:text-blue-500 transition-colors" to="/contact-us">Contact</Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-6 text-gray-500 mb-8">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FiGithub size={20} />
          </a>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaXTwitter size={20} />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FiLinkedin size={20} />
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
          >
            <FiYoutube size={20} />
          </a>
        </div>



        {/* Bottom Bar */}
        <div className="w-full pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-600 uppercase tracking-widest">
          <p className="font-medium">
            &copy; {currentYear} CodeLab Inc.
          </p>

          <div className="flex items-center gap-6">
            {/* <Link to="/terms" className="hover:text-gray-400">Terms</Link> */}
            {/* <Link to="/cookies" className="hover:text-gray-400">Cookies</Link> */}
            <span className="flex items-center gap-1 normal-case tracking-normal">
              <FiCode className="text-blue-500" /> Crafted for Engineers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;