
export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: Category;
  imageUrls: string[];
  stock: number;
}

export enum Category {
  Electronics = 'Electronics',
  Apparel = 'Apparel',
  Books = 'Books',
  Home = 'Home',
  All = 'All',
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  rating: number; // 1-5 stars
  comment: string;
  timestamp: number; // Unix timestamp
}
