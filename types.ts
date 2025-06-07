import type { ReactNode, FC } from 'react';

export enum ProductCategoryName {
  COURSE = "Course",
  SUBSCRIPTION = "Subscription",
  SOFTWARE = "Software",
  EBOOK = "E-book",
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategoryName;
  description: string;
  price: number;
  imageUrl: string;
  isBestseller?: boolean;
  isPopular?: boolean;
  details?: string; 
  stock?: number; // Optional: for inventory management
}

export interface ProductCategory {
  name: ProductCategoryName;
  icon: FC<{ className?: string }>;
  countLabel: string; 
}

export interface CartItem extends Product {
  quantity: number;
}

export enum OrderStatus {
  PENDING_PAYMENT = "Pending Payment",
  PAYMENT_VERIFICATION = "Payment Verification", // User has submitted payment proof
  PROCESSING = "Processing", // Payment confirmed, order being prepared
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: string; // ISO string
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: "Nagad" | "bKash" | "";
  transactionId?: string; // User-provided for manual verification
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: FC<{ className?: string }>;
}

export interface NavLinkItem {
  label: string;
  path: string;
  icon?: FC<{ className?: string }>;
}