import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import React from 'react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import "./ComboBox.css"

const getOptionCategory = (option) => option?.category ?? '';

export default function ComboBox({
  options = [],
  value,
  onChange,
  getOptionLabel = (option) => option?.name ?? option,
  placeholder = 'Choose one...',
  className = '',
}) {
  const [query, setQuery] = React.useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          getOptionLabel(option).toLowerCase().includes(query.toLowerCase())
        )

  return (
    <div  className={`m-1.5 combo text-white rounded-xs ${className}`}>
      <Combobox disabled value={value} onChange={(val) => onChange(val)} onClose={() => setQuery('')}>
        <div className="relative">
          <ComboboxInput 
            className={clsx(
              'w-full rounded-lg border-2 border-gray-800  py-2 pr-10 pl-3 text-sm text-white',
              'placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gray-600'
            )}
            displayValue={(selectedOption) => {
              return selectedOption ? `${getOptionCategory(selectedOption)} - ${getOptionLabel(selectedOption)}` : '';
            }}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronDownIcon className="h-5 w-5 text-white/60 hover:text-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'mt-2 relative rounded-lg border border-amber-100/10 bg-black/90 shadow-lg p-1 max-h-60 overflow-auto',
            'focus:outline-none'
          )}
        >
          
          {filteredOptions.map((option, i) => (
            <ComboboxOption
              key={i}
              value={option}
              className={({ active, selected }) =>
                clsx(
                  'group flex items-center gap-2 px-3 py-2 cursor-default select-none rounded-md',
                  active ? 'bg-gray-600 text-white' : 'text-white',
                  selected && 'bg-gray-600'
                )
              }
            >
              {({ selected }) => (
                <>
                  <CheckIcon
                    className={clsx(
                      'h-4 w-4',
                      selected ? 'text-white' : 'invisible'
                    )}
                  />
                  <span className="text-sm w-full truncate">
                    {getOptionCategory(option)} - {getOptionLabel(option)}
                  </span>
                </>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}
