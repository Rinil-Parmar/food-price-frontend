export interface Product {
  id: string;
  productName: string;
  price: string;
  description: string;
  imageUrl: string;
  availability: string;
  category: string;
  storeName: string;
  productUrl: string;
  salePrice?: string;
  loyaltyPrice?: string;
  dealType?: string;
}
