import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const pathMap = {
    'merge-sort': 'sorting/merge-sort',
    'bubble-sort': 'sorting/bubble-sort',
    'quick-sort': 'sorting/quick-sort',
    'insertion-sort': 'sorting/insertion-sort',
    'selection-sort': 'sorting/selection-sort',
    'linear-search': 'searching/linear-search',
    'binary-search': 'searching/binary-search',
    'singly-linked-list': 'linked-lists/singly-linked-list',
    'doubly-linked-list': 'linked-lists/doubly-linked-list',
    'linked-lists': 'linked-lists',
    'array': 'array',
    'string': 'string',
    'graph': 'graph',
    'stack': 'stack',
    'queue': 'queue',
    'recursion': 'recursion',
    'backtracking': 'backtracking',
    'tree': 'tree',
    'prims': 'algorithm/prims',
    'kruskal': 'algorithm/kruskal',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = query.trim().toLowerCase().replace(/\s+/g, '-');
    if (pathMap[key]) {
      navigate(`/dsa/${pathMap[key]}`);
      setQuery('');
    } else {
      alert("Topic not found.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md border border-gray-800 bg-black my-1 rounded-lg shadow-sm"
    >
      <input
        type="text"
        value={query}
        placeholder="Search problems..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-sm bg-black text-white placeholder-gray-500 my-2 focus:outline-none focus:ring-0 focus:border-0 px-3"
      />
    </form>
  );
}

export default SearchBar;
