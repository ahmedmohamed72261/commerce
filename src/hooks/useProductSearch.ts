import { useState, useEffect, useCallback } from "react";
import { http } from "@/services/http";
import { useLocale } from "next-intl";

export interface SuggestedProduct {
  _id: string;
  name: string | { en: string; ar: string };
  image?: string;
  description?: string;
  slug?: string;
}

export function useProductSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestedProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const locale = useLocale() as "en" | "ar";

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 1) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await http.get(`/products/suggest?q=${encodeURIComponent(searchQuery)}`, {
        headers: {
          "Accept-Language": locale,
        },
      });
      
      const data = response.data?.data || response.data;
      if (Array.isArray(data)) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, fetchSuggestions]);

  return {
    query,
    setQuery,
    suggestions,
    loading,
    locale
  };
}
