import { useState } from "react";
import PairCard from "./components/Dashboard/Cards/PairCard";
import { sidebarItems } from "./components/Dashboard/Constants";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { motion, AnimatePresence } from "framer-motion";
import { useAllRecentPairs } from "./hooks/useAllRecentPairs";
import { useRecentDataOfPair } from "./hooks/useRecentDataOfPair";
import CardSkeleton from "./components/UI/CardSkeleton";

const App = () => {
	const [results, setResults] = useState(3);
	const [rightClicked, setrightClicked] = useState(true);
	const [cardName, setCardName] = useState("");
	const { data, loading } = useAllRecentPairs();
	const { pairData, pairLoading } = useRecentDataOfPair(cardName);

	const slideLeft = () => {
		if (results! < 3) {
			return;
		} else {
			setrightClicked(false);
			setResults((prevResults) => prevResults - 3);
		}
	};

	const slideRight = () => {
		if (results! > 9) {
			return;
		} else {
			setrightClicked(true);
			setResults((prevResults) => prevResults + 3);
		}
	};

	return (
		<div className="w-full flex overflow-hidden">
			<div className="w-[20em] bg-[#111827] h-[100vh]">
				<div className="pt-6">
					{sidebarItems.map((item, index) => (
						<div
							key={index}
							className="flex text-[#ccc] items-center gap-3 text-[1.25em] pl-5 py-4 hover:bg-[#171f2e] cursor-pointer"
						>
							<span>{item.icon}</span>
							<p>{item.name}</p>
						</div>
					))}
				</div>
			</div>
			<div className="mx-auto mt-9">
				<div className="flex gap-5 items-center">
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
				</div>
				<div className="mt-10 items-center text-center">
					{pairLoading && ""}
					{pairData?.map((item) => (
						<p>{item["Market and Exchange Names"]}</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default App;
