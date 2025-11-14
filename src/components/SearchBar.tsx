import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto flex items-center bg-white shadow-lg rounded-full px-5 py-3"
    >
      <input
        type="text"
        placeholder="Search products, stores..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 outline-none text-gray-700"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
