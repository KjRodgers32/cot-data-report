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

	const abbreviateDate = (date: string) => {
		return date.substring(5, 7) + "/" + date.substring(2, 4);
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

	const pairShortAndLongData = pairData?.map((item) => {
		return {
			x: abbreviateDate(item["As of Date in Form YYYY-MM-DD"]),
			long: Number(item["Noncommercial Positions-Long (All)"]),
			short: Number(item["Noncommercial Positions-Short (All)"]),
		};
	});

	return { pairShortAndLongData, pairTimeDataLoading };
};
