import useSWR from "swr";
import axios from "axios";
import type { Coin } from "@/types/coin";

const fetcher = (url: string) =>
  axios
    .get<Coin[]>(url, {
      params: {
        vs_currency: "idr",
        order: "market_cap_desc",
        per_page: 50,
        page: 1,
        sparkline: false,
      },
    })
    .then((res) => res.data);

export const useCoinMarkets = () => {
  const { data, error, isLoading } = useSWR<Coin[]>(
    "https://api.coingecko.com/api/v3/coins/markets",
    fetcher,
    {
      refreshInterval: 60000,
    }
  );

  return {
    data: data ?? [], // ✅ default selalu Coin[]
    error,
    isLoading,
  };
};
