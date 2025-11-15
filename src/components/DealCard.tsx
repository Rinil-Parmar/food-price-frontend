import type { Product } from "../types/Product";

interface Props {
  item: Product;
}

const DealCard = ({ item }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <img
        src={item.imageUrl}
        alt={item.productName}
        className="w-full h-40 object-contain rounded"
      />

      {/* Product Name */}
      <h3 className="mt-3 font-semibold text-gray-900 line-clamp-1">
        {item.productName}
      </h3>

      {/* Store */}
      <p className="text-sm text-gray-500">{item.storeName}</p>

      {/* Price Section */}
      <div className="mt-2">
        {/* Original Price */}
        {item.price && (
          <p className="text-sm text-gray-500 line-through">
            {item.price}
          </p>
        )}

        {/* Sale Price */}
        <p className="text-xl font-bold text-green-600">
          {item.salePrice}
        </p>

        {/* Deal Badge */}
        {item.dealType && item.dealType !== "NONE" && (
          <span className="inline-block mt-2 bg-yellow-400 text-gray-900 px-2 py-1 text-xs rounded">
            {item.dealType}
          </span>
        )}
      </div>
    </div>
  );
};

export default DealCard;
