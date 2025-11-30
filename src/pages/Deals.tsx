import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";

const PAGE_SIZE = 15;

export default function Deals() {
  const [allDeals, setAllDeals] = useState<Product[]>([]);
  const [visibleDeals, setVisibleDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8081/api/deals/top?limit=50"
      );

      const data = response.data?.data || [];

      setAllDeals(data);

      // initial slice
      const initialSlice = data.slice(0, PAGE_SIZE);
      setVisibleDeals(initialSlice);

      // if < PAGE_SIZE, disable next btn
      setHasNextPage(data.length > PAGE_SIZE);
    } catch (error) {
      console.error(error);
      setAllDeals([]);
      setVisibleDeals([]);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // Runs whenever page changes
  useEffect(() => {
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const sliced = allDeals.slice(start, end);
    setVisibleDeals(sliced);

    setHasNextPage(end < allDeals.length);
  }, [currentPage, allDeals]);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (hasNextPage) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      {/* Header */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
          Top Deals & Discounts
        </h2>
        <p className="text-gray-600 max-w-xl">
          Explore the best discounts, loyalty deals, and price drops across all
          stores.
        </p>
      </section>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : visibleDeals.length === 0 ? (
        <p className="text-gray-500">No deals available right now.</p>
      ) : (
        <>
          {/* Deals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {visibleDeals.map((product) => (
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
    </div>
  );
}
