import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import axios from "axios";

interface CompareRequest {
  category?: string;
  priceRange?: [number, number];
  stores?: string[];
  availability?: boolean;
  saleOnly?: boolean;
}

const SEARCH_API = "http://localhost:8081/api/products/search";
const COMPARE_API = "http://localhost:8081/api/compare";

const PAGE_SIZE = 20;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allFilteredProducts, setAllFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [clientPage, setClientPage] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<CompareRequest>({});

  const fetchProducts = async (availability: boolean = true) => {
    setLoading(true);
    // setMode("client");
    try {
      const res = await axios.post(COMPARE_API, { availability });
      const data = res.data.data || [];
      setAllFilteredProducts(data);
      setClientPage(0);
      paginateClientSide(data, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${SEARCH_API}?query=${query}`);
      const data = res.data.data || [];
      setAllFilteredProducts(data);
      setClientPage(0);
      paginateClientSide(data, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async (filter: CompareRequest) => {
    setLoading(true);
    try {
      const res = await axios.post(COMPARE_API, filter);
      const data = res.data.data || [];
      setAllFilteredProducts(data);
      setClientPage(0);
      paginateClientSide(data, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const paginateClientSide = (data: Product[], page: number) => {
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    setProducts(data.slice(start, end));
  };

  // Initial load on component mount
  useEffect(() => {
    fetchProducts(true);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setClientPage(0);
    if (query.trim() === "") {
      setFilters({});
      fetchProducts(true);
    } else {
      searchProducts(query);
    }
  };

  const handleFilter = (newFilters: CompareRequest) => {
    const cleanedFilters: CompareRequest = {};

    if (newFilters.category) cleanedFilters.category = newFilters.category;
    if (
      newFilters.priceRange &&
      (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] > 0)
    ) {
      cleanedFilters.priceRange = newFilters.priceRange;
    }
    if (newFilters.stores && newFilters.stores.length > 0) {
      cleanedFilters.stores = newFilters.stores;
    }
    if (newFilters.availability !== undefined)
      cleanedFilters.availability = newFilters.availability;
    if (newFilters.saleOnly !== undefined)
      cleanedFilters.saleOnly = newFilters.saleOnly;

    setFilters(cleanedFilters);
    setClientPage(0);

    if (Object.keys(cleanedFilters).length === 0 && searchQuery.trim() === "") {
      fetchProducts(true);
    } else {
      applyFilters(cleanedFilters);
    }
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
    setClientPage(0);
    fetchProducts(true);
  };

  const handlePrev = () => {
    if (clientPage > 0) {
      const newPage = clientPage - 1;
      setClientPage(newPage);
      paginateClientSide(allFilteredProducts, newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    const totalClientPages = Math.ceil(allFilteredProducts.length / PAGE_SIZE);
    if (clientPage < totalClientPages - 1) {
      const newPage = clientPage + 1;
      setClientPage(newPage);
      paginateClientSide(allFilteredProducts, newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const hasNextPage =
    clientPage < Math.ceil(allFilteredProducts.length / PAGE_SIZE) - 1;
  const hasPrevPage = clientPage > 0;
  const displayPage = clientPage + 1;
  const displayTotalPages = Math.ceil(allFilteredProducts.length / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50">
         {/* Background blobs */}
        <div
          className="absolute -top-32 left-1/2 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(37,99,235,0.15), transparent 70%)",
          }}
        />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Products
          </h1>
          <p className="text-gray-600">
            Browse and filter through our product catalog
          </p>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">
              Filters
            </h3>
            {(Object.keys(filters).length > 0 || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.category || ""}
                onChange={(e) =>
                  handleFilter({
                    ...filters,
                    category: e.target.value || undefined,
                  })
                }
              >
                <option value="">All Categories</option>
                <option value="Drinks">Drinks</option>
                <option value="Snacks">Snacks</option>
                <option value="Bakery">Bakery</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Min Price
              </label>
              <input
                type="number"
                placeholder="0"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.priceRange?.[0] || ""}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : 0;
                  handleFilter({
                    ...filters,
                    priceRange: [value, filters.priceRange?.[1] || 0],
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Max Price
              </label>
              <input
                type="number"
                placeholder="0"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.priceRange?.[1] || ""}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : 0;
                  handleFilter({
                    ...filters,
                    priceRange: [filters.priceRange?.[0] || 0, value],
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stores
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.stores?.[0] || ""}
                onChange={(e) =>
                  handleFilter({
                    ...filters,
                    stores: e.target.value ? [e.target.value] : undefined,
                  })
                }
              >
                <option value="">All Stores</option>
                <option value="Walmart">Walmart</option>
                <option value="FreshCo">FreshCo</option>
                <option value="Metro">Metro</option>
                <option value="Sobeys">Sobeys</option>
                <option value="No Frills">No Frills</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <label className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={filters.availability || false}
                  onChange={(e) =>
                    handleFilter({
                      ...filters,
                      availability: e.target.checked || undefined,
                    })
                  }
                />
                <span className="text-sm text-gray-700">In Stock Only</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Promotions
              </label>
              <label className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={filters.saleOnly || false}
                  onChange={(e) =>
                    handleFilter({
                      ...filters,
                      saleOnly: e.target.checked || undefined,
                    })
                  }
                />
                <span className="text-sm text-gray-700">On Sale Only</span>
              </label>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(PAGE_SIZE)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {products.length} products ({allFilteredProducts.length}{" "}
              total results)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {!loading && products.length > 0 && displayTotalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={!hasPrevPage}
              className={`px-4 py-2 rounded-lg border transition ${
                !hasPrevPage
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700 font-medium">
              Page {displayPage} of {displayTotalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={!hasNextPage}
              className={`px-4 py-2 rounded-lg border transition ${
                !hasNextPage
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
