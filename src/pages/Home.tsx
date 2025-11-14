import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import DealCard from "../components/DealCard";
import StoreCard from "../components/StoreCard";
import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import { getTopDeals } from "../services/dealService";
import walmartLogo from "../assets/Wallmart.jpg";
import metroLogo from "../assets/Metro.jpg";
import freshcoLogo from "../assets/FreshCo.png";
import sobeysLogo from "../assets/Sobeys.png";
import nofrillsLogo from "../assets/NoFrills.jfif";

const Home = () => {
  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTopDeals(10)
      .then((data) => setDeals(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query: string) => {
    window.location.href = `/search?query=${query}`;
  };

  return (
    <>
      {/* Updated container with professional background and spacing */}
      <div className="relative isolate overflow-hidden bg-gray-50 py-12 sm:py-12">
        {/* Background blobs */}
        <div
          className="absolute -top-32 left-1/2 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(37,99,235,0.15), transparent 70%)",
          }}
        />

        {/* Content Wrapper */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Compare Grocery Prices Across Stores
            </h1>
            <p className="text-gray-600 mb-8 text-lg sm:text-xl">
              Search products, explore deals, and find the cheapest supermarket
              effortlessly.
            </p>

            <div className="max-w-xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </section>

          {/* Top Stores */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
              Top Stores
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link to="/stores">
                <StoreCard name="Walmart" image={walmartLogo} />
              </Link>
              <Link to="/stores">
                <StoreCard name="Metro" image={metroLogo} />
              </Link>
              <Link to="/stores">
                <StoreCard name="FreshCo" image={freshcoLogo} />
              </Link>
              <Link to="/stores">
                <StoreCard name="Sobeys" image={sobeysLogo} />
              </Link>
              <Link to="/stores">
                <StoreCard name="No Frills" image={nofrillsLogo} />
              </Link>
            </div>
          </section>

          {/* Trending Deals */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
              Trending Deals
            </h2>

            {loading ? (
              <p className="text-gray-600">Loading deals...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {deals.map((deal) => (
                  <DealCard key={deal.id} item={deal} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
