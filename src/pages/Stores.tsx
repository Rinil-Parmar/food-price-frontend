import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import StoreCard from "../components/StoreCard";

import walmartLogo from "../assets/Wallmart.jpg";
import metroLogo from "../assets/Metro.jpg";
import freshcoLogo from "../assets/FreshCo.png";
import sobeysLogo from "../assets/Sobeys.png";
import nofrillsLogo from "../assets/NoFrills.jfif";

const stores = [
  { name: "Walmart", logo: walmartLogo },
  { name: "Metro", logo: metroLogo },
  { name: "FreshCo", logo: freshcoLogo },
  { name: "Sobeys", logo: sobeysLogo },
  { name: "No Frills", logo: nofrillsLogo },
];

const PAGE_SIZE = 20;

interface StoreRanking {
  rank: number;
  storeName: string;
  occurrences: number;
}

export default function Stores() {
  const [activeStore, setActiveStore] = useState<string>("Walmart");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  
  // PageRank states
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [storeRankings, setStoreRankings] = useState<StoreRanking[]>([]);
  const [showRankings, setShowRankings] = useState<boolean>(false);
  const [rankingLoading, setRankingLoading] = useState<boolean>(false);

  const fetchProducts = async (storeName: string, page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8081/api/products/store/${storeName}?page=${page}&size=${PAGE_SIZE}`
      );

      const data = response.data?.data || [];
      setProducts(data);

      if (data.length < PAGE_SIZE) {
        setHasNextPage(false);
      } else {
        setHasNextPage(true);
      }
    } catch (error) {
      console.error(error);
      setProducts([]);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchStoreRankings = async (keyword: string) => {
    if (!keyword.trim()) return;
    
    try {
      setRankingLoading(true);
      const response = await axios.get(
        `http://localhost:8081/api/products/rank/stores?keyword=${encodeURIComponent(keyword)}`
      );

      if (response.data?.status === "success") {
        setStoreRankings(response.data.data || []);
        setShowRankings(true);
      }
    } catch (error) {
      console.error("Error fetching store rankings:", error);
      setStoreRankings([]);
    } finally {
      setRankingLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchKeyword.trim().length >= 2) {
      fetchStoreRankings(searchKeyword);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    fetchProducts(activeStore, 0);
  }, [activeStore]);

  useEffect(() => {
    fetchProducts(activeStore, currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (hasNextPage) setCurrentPage(currentPage + 1);
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 text-white";
    if (rank === 2) return "bg-gray-400 text-white";
    if (rank === 3) return "bg-orange-600 text-white";
    return "bg-blue-500 text-white";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      {/* Background blobs */}
      <div
        className="absolute -top-32 left-1/2 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.15), transparent 70%)",
        }}
      />

      {/* PageRank Search Section */}
      <section className="mb-10 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl sm:text-3xl mb-4 text-gray-900 font-bold">
          Find Best Store by Keyword
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          Search for a keyword (e.g., "organic", "milk", "gluten-free") to see which stores have the most matching products
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter keyword (e.g., orange, organic, milk)..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={searchKeyword.trim().length < 2 || rankingLoading}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              searchKeyword.trim().length < 2 || rankingLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {rankingLoading ? "Searching..." : "Rank Stores"}
          </button>
        </div>

        {/* Store Rankings Results */}
        {showRankings && storeRankings.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
               Results for "{searchKeyword}"
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {storeRankings.map((ranking) => (
                <div
                  key={ranking.storeName}
                  className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-800">
                      #{ranking.rank}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getRankBadgeColor(
                        ranking.rank
                      )}`}
                    >
                      {ranking.rank === 1 ? "🥇 Best" : ranking.rank === 2 ? "🥈 2nd" : ranking.rank === 3 ? "🥉 3rd" : `#${ranking.rank}`}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {ranking.storeName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">
                      {ranking.occurrences}
                    </span>{" "}
                    products found
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showRankings && storeRankings.length === 0 && !rankingLoading && (
          <div className="mt-6 text-center text-gray-500">
            No stores found with keyword "{searchKeyword}"
          </div>
        )}
      </section>

      {/* Store Selection */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl mb-6 text-gray-900 font-bold">
          Select Store
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {stores.map((store) => (
            <div
              key={store.name}
              onClick={() => setActiveStore(store.name)}
              className={`
                cursor-pointer transition-transform transform hover:-translate-y-1 rounded-2xl
                ${
                  activeStore === store.name
                    ? "scale-105 ring-2 ring-blue-600 shadow-lg"
                    : "hover:shadow-md"
                }
              `}
            >
              <StoreCard name={store.name} image={store.logo} />
            </div>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
          Products in {activeStore}
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found for {activeStore}.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => window.open(product.productUrl, "_blank")}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded-lg border transition ${
                  currentPage === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-700 font-medium">
                Page {currentPage + 1}
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
          </>
        )}
      </section>
    </div>
  );
}