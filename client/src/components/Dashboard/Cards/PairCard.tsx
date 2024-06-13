import {
	BadgeDelta,
	Card,
	Flex,
	Metric,
	ProgressBar,
	Text,
} from "@tremor/react";

import PairData from "../../../types";
import {
	determineSentiment,
	determineSentimentString,
	netPositionPercentage,
	netPositionChangePercentage,
	totalPositionAmount,
	numberWithCommas,
} from "./CardFunctions";

interface PairDataProp {
	item: PairData;
}

const PairCard = ({ item }: PairDataProp) => {
	return (
		<Card className="w-[20rem] min-w-[10rem]">
			<Flex alignItems="start">
				<div className="truncate">
					<Text>
						{item["Market and Exchange Names"].match(/^(.*?)\s*-/)![1].trim()}
					</Text>
					<Metric className="truncate">
						{numberWithCommas(
							determineSentiment(
								item["Noncommercial Positions-Long (All)"],
								item["Noncommercial Positions-Short (All)"]
							)
						)}
					</Metric>
				</div>
				<BadgeDelta
					deltaType={`${
						netPositionChangePercentage(
							determineSentiment(
								item["Noncommercial Positions-Long (All)"],
								item["Noncommercial Positions-Short (All)"]
							),
							determineSentimentString(
								item["Noncommercial Positions-Long (All)"],
								item["Noncommercial Positions-Short (All)"]
							) == "long"
								? item["Change in Noncommercial-Long (All)"]
								: item["Change in Noncommercial-Short (All)"]
						) > 0
							? "moderateIncrease"
							: "moderateDecrease"
					}`}
				>
					{netPositionChangePercentage(
						determineSentiment(
							item["Noncommercial Positions-Long (All)"],
							item["Noncommercial Positions-Short (All)"]
						),
						determineSentimentString(
							item["Noncommercial Positions-Long (All)"],
							item["Noncommercial Positions-Short (All)"]
						) == "long"
							? item["Change in Noncommercial-Long (All)"]
							: item["Change in Noncommercial-Short (All)"]
					)}{" "}
					%
				</BadgeDelta>
			</Flex>
			<Flex className="mt-4 space-x-2">
				<Text className="truncate">{`${netPositionPercentage(
					item["Noncommercial Positions-Long (All)"],
					item["Noncommercial Positions-Short (All)"],
					determineSentiment(
						item["Noncommercial Positions-Long (All)"],
						item["Noncommercial Positions-Short (All)"]
					)
				)}% (${
					determineSentimentString(
						item["Noncommercial Positions-Long (All)"],
						item["Noncommercial Positions-Short (All)"]
					) == "long"
						? "Open Longs"
						: "Open Shorts"
				})`}</Text>
				<Text className="truncate">
					{numberWithCommas(
						totalPositionAmount(
							item["Noncommercial Positions-Long (All)"],
							item["Noncommercial Positions-Short (All)"]
						)
					)}
				</Text>
			</Flex>
			<ProgressBar
				value={netPositionPercentage(
					item["Noncommercial Positions-Long (All)"],
					item["Noncommercial Positions-Short (All)"],
					determineSentiment(
						item["Noncommercial Positions-Long (All)"],
						item["Noncommercial Positions-Short (All)"]
					)
				)}
				color={`${
					determineSentimentString(
						item["Noncommercial Positions-Long (All)"],
						item["Noncommercial Positions-Short (All)"]
					) == "long"
						? "green"
						: "red"
				}`}
				className="mt-2"
			/>
		</Card>
	);
};

export default PairCard;
