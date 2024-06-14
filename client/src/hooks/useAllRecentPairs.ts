import { useState, useEffect } from "react";
import axios from "axios";
import PairData from "../types";

export const useAllRecentPairs = () => {
	const [data, setData] = useState<PairData[] | undefined>(undefined);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					"https://cot-data-report-api.vercel.app/api/v1/latest"
				);
				setData(response.data.data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				console.log(err);
				// TODO: add error message page
			}
		};
		fetchData();
	}, []);

	return { data, loading };
};
