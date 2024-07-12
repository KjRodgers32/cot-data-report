import { useState, useEffect } from "react";
import axios from "axios";
import { PairData } from "../types";

export const useRecentDataOfPair = (pair: string) => {
	const [pairData, setPairData] = useState<PairData[] | undefined>(undefined);
	const [pairLoading, pairSetLoading] = useState(false);

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
		const fetchData = async () => {
			if (pair === "") return;
			try {
				pairSetLoading(true);
				const pairAbbreviation = choosePairAbbreviation(pair);
				const response = await axios.get(
					`https://cot-data-report-api.vercel.app/api/v1/${pairAbbreviation}/latest`
				);
				setPairData(response.data.data);
				pairSetLoading(false);
			} catch (err) {
				pairSetLoading(false);
				console.log(err);
				// TODO: add error message page
			}
		};
		fetchData();
	}, [pair]);

	return { pairData, pairLoading };
};
