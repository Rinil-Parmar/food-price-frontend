import { useState, useRef } from "react";
import axios from "axios";

interface Props {
  onSearch: (query: string) => void;
}

const AUTOCOMPLETE_API =
  "http://localhost:8081/api/products/search/autocomplete";

const SearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionBoxRef = useRef<HTMLUListElement>(null);
  const [frequency, setFrequency] = useState<number | null>(null);

  const fetchSuggestions = async (text: string) => {
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`${AUTOCOMPLETE_API}?prefix=${text}`);
      setSuggestions(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFrequency = async (keyword: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8081/api/products/search/frequency?keyword=${keyword}`
      );
      setFrequency(res.data.data);
    } catch (error) {
      console.error(error);
      setFrequency(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValue(text);
    setActiveIndex(-1);
    fetchSuggestions(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
    setSuggestions([]);
    fetchFrequency(value);
  };

  const handleSelect = (text: string) => {
    setValue(text);
    onSearch(text);
    setSuggestions([]);
    fetchFrequency(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex]);
      }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white shadow-lg rounded-full px-5 py-3 ring-1 ring-gray-200"
      >
        <input
          type="text"
          placeholder="Search products, stores..."
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 outline-none text-gray-700"
        />

        {/* Show frequency only when search text exists */}
        {value.trim().length > 0 && frequency !== null && (
          <span className="text-sm text-gray-600 mr-4">
            freq: <span className="font-semibold">{frequency + 1}</span>
          </span>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Suggestion Dropdown */}
      {suggestions.length > 0 && (
        <ul
          ref={suggestionBoxRef}
          className="absolute mt-2 w-full bg-white rounded-xl shadow-xl ring-1 ring-gray-200 z-50 divide-y divide-gray-100"
        >
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className={`px-4 py-3 cursor-pointer transition 
              ${
                activeIndex === index
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
