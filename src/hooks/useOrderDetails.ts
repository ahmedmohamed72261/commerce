import { useState, useEffect } from "react";
import { getOrderDetails } from "@/services/orders.service";
import { Order } from "@/types/order";

// Extended interface based on what the API likely returns for details
export interface OrderDetailsType extends Order {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  items: any[]; // Using any[] to be safe with populate, but we know it has product info
  shippingAddress: {
    city: string;
    street: string;
    building: string;
    floor: string;
    apartment: string;
    additionalInfo: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export function useOrderDetails(orderId: string) {
  const [order, setOrder] = useState<OrderDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await getOrderDetails(orderId);
        const data = response.data || response;
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order details", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { order, loading, error };
}
