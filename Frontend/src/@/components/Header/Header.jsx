import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiTerminal } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"; // Added motion

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Explore", href: "/" },
  { name: "Learn DSA", href: "/dsa" },
  { name: "Problems", href: "/problems" },
  { name: "Contest", href: "/contestLanding" },
];

const secondaryNav = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("lastActiveTab");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            
            {/* LEFT SECTION */}
            <div className="flex items-center gap-8">
              <NavLink to="/" className="flex items-center">
                <span className="text-xl font-black tracking-tighter text-white uppercase ">
                  CODE<span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">LAB</span>
                </span>
              </NavLink>

              <div className="hidden md:flex items-center space-x-1 h-14">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        "relative px-4 text-sm font-medium transition-colors duration-300 h-full flex items-center",
                        isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{item.name}</span>
                        {/* THE SLIDING UNDERLINE ANIMATION */}
                        {isActive && (
                          <motion.div
                            layoutId="navbar-underline"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_-4px_8px_rgba(59,130,246,0.4)]"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center space-x-4 border-r border-white/10 pr-4 mr-2">
                {secondaryNav.map((item) => (
                  <NavLink 
                    key={item.name} 
                    to={item.href} 
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-red-500 hover:text-red-400 transition-colors px-3 py-2 bg-red-500/10 rounded-lg border border-red-500/20 active:scale-95"
                >
                  Logout
                </button>
              ) : (
                <div className="flex items-center gap-3 relative z-20">
                  <NavLink 
                    to="/login" 
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Sign in
                  </NavLink>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <NavLink 
                      to="/sign-up" 
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2 rounded-full transition-all shadow-lg shadow-blue-500/20 block"
                    >
                      Register
                    </NavLink>
                  </motion.div>
                </div>
              )}

              <div className="md:hidden flex items-center">
                <DisclosureButton className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-white/5 transition-colors">
                  <Bars3Icon className="block size-6 group-data-open:hidden" />
                  <XMarkIcon className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU ANIMATION */}
        <AnimatePresence>
          <DisclosurePanel as={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
          >
            <div className="space-y-1 px-4 pt-2 pb-6">
              {navigation.concat(secondaryNav).map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      "block py-3 text-base font-medium border-b border-white/5 transition-colors",
                      isActive ? "text-blue-500" : "text-gray-400"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-3 text-base font-medium text-red-500"
                >
                  Logout
                </button>
              )}
            </div>
          </DisclosurePanel>
        </AnimatePresence>
      </Disclosure>

      {/* MODAL ANIMATION */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex justify-center items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#111111] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                 <FiTerminal className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-white">Login Required</h2>
              <p className="text-gray-400 mb-8 text-sm">You must be logged in to participate in contests and track your progress.</p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { setShowModal(false); navigate("/login"); }} 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                >
                  Login Now
                </button>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="w-full text-gray-500 hover:text-gray-300 text-sm py-2 font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}