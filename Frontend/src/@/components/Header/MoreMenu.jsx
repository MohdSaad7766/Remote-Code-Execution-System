import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; // Import the ChevronDownIcon
import { NavLink } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MoreMenu() {
  return (
    <Menu as="div" className="relative font-normal">
      {({ open }) => (
        <>
          <MenuButton className="flex items-center align-center place-items-center gap-1 text-gray-400 hover:text-gray-200 rounded-md px-3 py-2  text-sm font-medium">
            More
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
            />
          </MenuButton>

          <MenuItems className="absolute items-center border border-gray-800 right-0 mt-2 w-35 rounded-md shadow-lg bg-black text-white ring-2 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <NavLink
                  key={1}
                    to="/about"
                    className={classNames(
                      active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200',
                      'block px-4 py-2 '
                    )}
                  >
                    About
                  </NavLink>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <NavLink
                  key={2}
                    to="/contact-us"
                    className={classNames(
                      active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-200',
                      'block px-4 py-2 '
                    )}
                  >
                    Contact
                  </NavLink>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  );
}
