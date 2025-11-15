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

export default function Stores() {
  const [activeStore, setActiveStore] = useState<string>("Walmart");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const fetchProducts = async (storeName: string, page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8081/api/products/store/${storeName}?page=${page}&size=${PAGE_SIZE}`
      );

      const data = response.data?.data || [];

      setProducts(data);

      // Determine if next page exists
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
