
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

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  orderHistory?: string[];
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
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
