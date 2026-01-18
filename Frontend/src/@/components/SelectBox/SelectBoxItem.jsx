import { Listbox } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export default function SelectBoxItem({ selected, setSelected, category, defaultName }) {
  const [isSortingOpen, setIsSortingOpen] = useState(false);

  return (
    <div className="w-52 m-1 text-sm">
      <Listbox
        value={selected}
        onChange={(val) => {
          setSelected(val);
          setIsSortingOpen(false);
        }}
      >
        <div className="relative">
          {/* Trigger Button */}
          <Listbox.Button
            onClick={() => setIsSortingOpen(!isSortingOpen)}
            className={clsx(
              'w-full flex justify-between items-center px-3 py-2 rounded-md',
              'bg-zinc-900 text-white border border-zinc-700',
              'hover:border-zinc-500 transition-all'
            )}
          >
            <span>{selected || defaultName}</span>
            <ChevronDownIcon
              className={clsx(
                'w-4 h-4 text-zinc-400 transition-transform duration-300',
                isSortingOpen ? 'rotate-180' : 'rotate-0'
              )}
            />
          </Listbox.Button>

          {/* Dropdown Options */}
          <Listbox.Options className="absolute mt-2 w-full rounded-md bg-zinc-900 border border-zinc-700 shadow-lg z-50">
            {category.map((cat, index) => (
              <Listbox.Option key={index} value={cat.name} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={clsx(
                      'flex items-center justify-between px-3 py-2 cursor-pointer rounded-md',
                      active && 'bg-zinc-700',
                      selected && 'text-green-400 font-semibold'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {selected && <CheckIcon className="h-4 w-4 text-green-400" />}
                      {cat.label || cat.name}
                    </span>
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
