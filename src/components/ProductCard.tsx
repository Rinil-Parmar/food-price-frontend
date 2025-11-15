import type { Product } from "../types/Product";

interface Props {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: Props) {
  const showSale =
    (product.dealType === "SALE" || product.dealType === "CLEARANCE") &&
    product.salePrice &&
    product.salePrice !== product.price;

  const showLoyalty =
    product.dealType === "LOYALTY" &&
    product.loyaltyPrice &&
    product.loyaltyPrice !== product.price;

  const finalSalePrice = showSale ? `$${product.salePrice}` : null;
  const finalLoyaltyPrice = showLoyalty ? `$${product.loyaltyPrice}` : null;

  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer bg-white border border-gray-200 rounded-xl
        shadow-sm hover:shadow-lg 
        transition-all duration-300 transform hover:-translate-y-1
        overflow-hidden flex flex-col p-3
      "
    >
      {/* Image */}
      <div className="relative w-full h-40 bg-gray-50 flex items-center justify-center rounded-md">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-full object-contain"
        />

        {/* Deal Badge */}
        {product.dealType && product.dealType !== "NONE" && (
          <span
            className={`
              absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold shadow
              ${
                product.dealType === "SALE"
                  ? "bg-red-600 text-white"
                  : product.dealType === "LOYALTY"
                  ? "bg-green-600 text-white"
                  : "bg-yellow-600 text-white"
              }
            `}
          >
            {product.dealType}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-col flex-1">
        {/* Store Badge */}
        <span
          className={`
            px-3 py-1 text-xs font-semibold rounded-md shadow-sm w-fit
            ${
              product.storeName === "Walmart"
                ? "bg-blue-600 text-white"
                : product.storeName === "FreshCo"
                ? "bg-lime-600 text-white"
                : product.storeName === "Metro"
                ? "bg-red-600 text-white"
                : product.storeName === "Sobeys"
                ? "bg-green-600 text-white"
                : product.storeName === "No Frills"
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 text-white"
            }
          `}
        >
          {product.storeName}
        </span>

        {/* Name */}
        <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-1 mt-2">
          {product.productName}
        </h3>

        {/* Category */}
        <p className="text-gray-500 text-xs font-medium mt-1 mb-2">
          {product.category}
        </p>

        {/* Price Section */}
        <div className="mt-auto">
          {/* SALE + CLEARANCE */}
          {showSale && (
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-bold text-lg">
                {finalSalePrice}
              </span>
              <span className="text-gray-500 line-through text-xs">
                {product.price}
              </span>
            </div>
          )}

          {/* LOYALTY */}
          {showLoyalty && (
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold text-lg">
                {finalLoyaltyPrice}
              </span>
              <span className="text-gray-500 line-through text-xs">
                {product.price}
              </span>
            </div>
          )}

          {/* No Deal */}
          {!showSale && !showLoyalty && (
            <span className="text-gray-900 font-bold text-lg">
              {product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// import type { Product } from "../types/Product";

// interface Props {
//   product: Product;
//   onClick?: () => void;
// }

// export default function ProductCard({ product, onClick }: Props) {
//   // SALE or CLEARANCE → show salePrice
//   const showSale =
//     (product.dealType === "SALE" || product.dealType === "CLEARANCE") &&
//     product.salePrice &&
//     product.salePrice !== product.price;

//   // LOYALTY → show loyaltyPrice
//   const showLoyalty =
//     product.dealType === "LOYALTY" &&
//     product.loyaltyPrice &&
//     product.loyaltyPrice !== product.price;

//   // Derived price values
//   const finalSalePrice = showSale ? `$${product.salePrice}` : null;
//   const finalLoyaltyPrice = showLoyalty ? `$${product.loyaltyPrice}` : null;

//   return (
//     <div
//       onClick={onClick}
//       className="
//         cursor-pointer bg-white border border-gray-200 rounded-2xl
//         shadow-sm hover:shadow-xl
//         transition-all duration-300 transform hover:-translate-y-1
//         overflow-hidden flex flex-col
//       "
//     >
//       {/* Image */}
//       <div className="relative w-full h-56 sm:h-64 bg-gray-50 flex items-center justify-center">
//         <img
//           src={product.imageUrl}
//           alt={product.productName}
//           className="w-full h-full object-cover"
//         />

//         {/* Deal Badge */}
//         {product.dealType && product.dealType !== "NONE" && (
//           <span
//             className={`
//               absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow
//               ${
//                 product.dealType === "SALE"
//                   ? "bg-red-600 text-white"
//                   : product.dealType === "LOYALTY"
//                   ? "bg-green-600 text-white"
//                   : "bg-yellow-600 text-white"
//               }
//             `}
//           >
//             {product.dealType}
//           </span>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4 flex flex-col flex-1">
//         {/* Store Badge */}
//         <div className="mb-2">
//           <span
//             className={`px-4 py-2 text-xs font-semibold rounded-md shadow-sm
//               ${
//                 product.storeName === "Walmart"
//                   ? "bg-blue-600 text-white"
//                   : product.storeName === "FreshCo"
//                   ? "bg-lime-600 text-white"
//                   : product.storeName === "Metro"
//                   ? "bg-red-600 text-white"
//                   : product.storeName === "Sobeys"
//                   ? "bg-green-600 text-white"
//                   : product.storeName === "No Frills"
//                   ? "bg-yellow-400 text-black"
//                   : "bg-gray-700 text-white"
//               }
//             `}
//           >
//             {product.storeName}
//           </span>
//         </div>

//         {/* Product Name */}
//         <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">
//           {product.productName}
//         </h3>

//         {/* Category */}
//         <p className="text-gray-500 text-sm mt-1 mb-3">{product.category}</p>

//         {/* Price Section */}
//         <div className="mt-auto">
//           <div className="flex items-center gap-2">

//             {/* FINAL PRICE DISPLAY */}
//             {showSale && (
//               <>
//                 <span className="text-red-600 font-bold text-xl">
//                   {finalSalePrice}
//                 </span>

//                 <span className="text-gray-500 line-through text-sm">
//                   {product.price}
//                 </span>
//               </>
//             )}

//             {showLoyalty && (
//               <>
//                 <span className="text-green-600 font-bold text-xl">
//                   {finalLoyaltyPrice}
//                 </span>

//                 <span className="text-gray-500 line-through text-sm">
//                   {product.price}
//                 </span>
//               </>
//             )}

//             {/* No deal → normal price */}
//             {!showSale && !showLoyalty && (
//               <span className="text-gray-900 font-bold text-xl">
//                 {product.price}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
