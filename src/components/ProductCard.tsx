import type { Product } from "../types/Product";

interface Props {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      {/* Product Image */}
      <div className="relative w-full h-56 sm:h-64">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-full object-cover"
        />

        {/* Badge based on dealType */}
        {product.dealType && product.dealType !== "NONE" && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full shadow ${
              product.dealType === "SALE"
                ? "bg-red-600 text-white"
                : product.dealType === "LOYALTY"
                ? "bg-green-600 text-white"
                : product.dealType === "CLEARANCE"
                ? "bg-yellow-500 text-white"
                : "bg-gray-600 text-white"
            }`}
          >
            {product.dealType}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
          {product.productName}
        </h3>
        <p className="text-gray-500 text-sm mb-3">{product.category}</p>

        {/* Price Section */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-gray-900 font-bold text-lg">
              {product.price}
            </span>
            {product.salePrice && product.salePrice !== product.price && (
              <span className="text-red-600 font-semibold line-through text-sm">
                {product.salePrice}
              </span>
            )}
          </div>
        </div>

        {/* Loyalty Price */}
        {product.loyaltyPrice && product.loyaltyPrice !== product.price && (
          <p className="text-green-600 text-sm mt-1 font-bold">
            Loyalty: ${product.loyaltyPrice}
          </p>
        )}
      </div>
    </div>
  );
}
