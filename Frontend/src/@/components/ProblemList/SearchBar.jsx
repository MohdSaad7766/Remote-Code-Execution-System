// SearchBar.jsx
import React from 'react';

function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md border border-gray-800 bg-black my-1 rounded-lg shadow-sm"
    >
      <input
        type="text"
        value={searchQuery}
        placeholder="Search problems..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full text-sm bg-black text-white placeholder-gray-500 my-2 focus:outline-none focus:ring-0 focus:border-0 px-3"
      />
    </form>
  );
}

export default SearchBar;
