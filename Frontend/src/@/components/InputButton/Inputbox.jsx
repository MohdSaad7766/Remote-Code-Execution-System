import React from 'react';
export default function Inputbox({type,label})
{
    return(
        <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type={type}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    placeholder="Password"
                  />
                  <label
                    htmlFor={label}
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm"
                  >
                    {label}
                  </label>
                </div>
    );
}