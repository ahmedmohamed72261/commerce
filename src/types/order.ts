export interface OrderItem {
  productId: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
}

export interface OrderCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderShipping {
  city: string;
  street: string;
}

export interface Order {
  _id: string;
  orderId: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  paymentMethod: string;
  customer: OrderCustomer;
  shipping: OrderShipping;
  items: OrderItem[];
}
