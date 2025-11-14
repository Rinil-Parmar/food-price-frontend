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

      <h3 className="mt-3 font-semibold text-gray-800 line-clamp-1">
        {item.productName}
      </h3>

      <p className="text-sm text-gray-500">{item.storeName}</p>

      <div className="mt-2">
        <p className="text-gray-500 text-sm line-through">
          {item.price}
        </p>
        <p className="text-xl font-bold text-green-600">
          ${item.salePrice}
        </p>

        {item.dealType && (
          <span className="inline-block mt-1 bg-yellow-400 text-gray-800 px-2 py-1 text-xs rounded">
            {item.dealType}
          </span>
        )}
      </div>
    </div>
  );
};

export default DealCard;
