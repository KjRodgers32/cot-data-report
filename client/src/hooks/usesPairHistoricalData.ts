import { useState, useEffect } from "react";
import axios from "axios";
import { PairData } from "../types";

export const usePairHistoricalData = (pair: string) => {
  const [pairData, setPairData] = useState<PairData[] | []>([]);
  const [pairTimeDataLoading, setPairTimeDataLoading] = useState(false);

  const choosePairAbbreviation = (pair: string) => {
    const pairMap: { [key: string]: string } = {
      "CANADIAN DOLLAR": "cad",
      "SWISS FRANC": "chf",
      "BRITISH POUND": "gbp",
      "JAPANESE YEN": "jpy",
      "USD INDEX": "usd",
      "EURO FX": "eur",
      "NZ DOLLAR": "nz",
      "AUSTRALIAN DOLLAR": "aud",
    };
    const fixedPair = pair.trim().toUpperCase();

    return pairMap[fixedPair];
  };

  useEffect(() => {
    if (pair === "") return;
    const fetchData = async () => {
      try {
        setPairTimeDataLoading(true);
        const pairAbbreviation = choosePairAbbreviation(pair);
        const response = await axios.get(
          `https://cot-data-report-api.vercel.app/api/v1/${pairAbbreviation}`
        );
        setPairData(response.data.data);
        setPairTimeDataLoading(false);
      } catch (err) {
        setPairTimeDataLoading(false);
        console.log(err);
        // TODO: add error message page
      }
    };
    fetchData();
  }, [pair]);

  const netLongData = pairData?.map((item) => {
    return {
      x: item["As of Date in Form YYYY-MM-DD"],
      y: item["Noncommercial Positions-Long (All)"],
    };
  });

  const netShortData = pairData?.map((item) => {
    return {
      x: item["As of Date in Form YYYY-MM-DD"],
      y: item["Noncommercial Positions-Short (All)"],
    };
  });

  return { netLongData, netShortData, pairTimeDataLoading };
};
