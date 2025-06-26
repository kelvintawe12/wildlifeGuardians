import React, { useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search animals, quizzes...'
}) => {
  const [query, setQuery] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };
  return <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder={placeholder} />
        {query && <button type="button" onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <XIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
          </button>}
      </div>
    </form>;
};
export default SearchBar;