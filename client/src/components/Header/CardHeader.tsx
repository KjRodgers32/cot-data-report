import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CardSkeleton from "../UI/CardSkeleton";
import PairCard from "../Dashboard/Cards/PairCard";
import { PairData } from "../../types";

interface CardDataProp {
	results: number;
	setResults: React.Dispatch<React.SetStateAction<number>>;
	rightClicked: boolean;
	setRightClicked: React.Dispatch<React.SetStateAction<boolean>>;
	setCardName: React.Dispatch<React.SetStateAction<string>>;
	data: PairData[] | undefined;
	loading: boolean;
}

const CardHeader = ({
	results,
	setResults,
	rightClicked,
	setRightClicked,
	setCardName,
	data,
	loading,
}: CardDataProp) => {
	const slideLeft = () => {
		if (results! < 3) {
			return;
		} else {
			setRightClicked(false);
			setResults((prevResults) => prevResults - 3);
		}
	};

	const slideRight = () => {
		if (results! > 9) {
			return;
		} else {
			setRightClicked(true);
			setResults((prevResults) => prevResults + 3);
		}
	};
	return (
		<>
			<motion.button
				disabled={results <= 3}
				className="px-3 py-5 shadow-md rounded-md cursor-pointer"
				whileTap={{ scale: 0.97 }}
				onClick={slideLeft}
			>
				<KeyboardDoubleArrowLeftIcon
					fontSize="large"
					htmlColor={`${results <= 3 ? "grey" : "black"}`}
				/>
			</motion.button>
			<AnimatePresence>
				<div>
					{loading && (
						<div className="flex gap-5 bg-white p-2 rounded-md">
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i}>
									<CardSkeleton />
								</div>
							))}
						</div>
					)}
					{data && (
						<div className="flex gap-5">
							{data?.slice(results - 3, results).map((item) => (
								<motion.div
									key={
										item["Market and Exchange Names"] +
										item["As of Date in Form YYYY-MM-DD"]
									}
									initial={
										rightClicked
											? { x: 300, opacity: 0.5 }
											: { x: -300, opacity: 0 }
									}
									animate={{ x: 0, opacity: 1 }}
									exit={
										rightClicked
											? { x: -300, opacity: 0 }
											: { x: 300, opacity: 0.5 }
									}
								>
									<PairCard item={item} cardName={setCardName} />
								</motion.div>
							))}
						</div>
					)}
				</div>
			</AnimatePresence>
			<motion.button
				disabled={results === 9}
				className="px-3 py-5 shadow-md rounded-md cursor-pointer"
				whileTap={{ scale: 0.97 }}
				onClick={slideRight}
			>
				<KeyboardDoubleArrowRightIcon
					htmlColor={`${results === 9 ? "grey" : "black"}`}
					fontSize="large"
				/>
			</motion.button>
		</>
	);
};

export default CardHeader;
