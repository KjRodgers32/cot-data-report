import {
  BadgeDelta,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";

import { PairData } from "../../../types";
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
  cardName: React.Dispatch<React.SetStateAction<string>>;
}

const PairCard = ({ item, cardName }: PairDataProp) => {
  return (
    <div
      className="w-[20rem] min-w-[10rem] hover:cursor-pointer bg-main-white p-5 rounded-lg"
      onClick={() =>
        cardName(
          item["Market and Exchange Names"].match(/^(.*?)\s*-/)![1].trim()
        )
      }
    >
      <Flex alignItems="start">
        <div className="truncate">
          <div className="text-black">
            {item["Market and Exchange Names"].match(/^(.*?)\s*-/)![1].trim()}
          </div>
          <Metric className="truncate">
            {numberWithCommas(
              determineSentiment(
                Number(item["Noncommercial Positions-Long (All)"]),
                Number(item["Noncommercial Positions-Short (All)"])
              )
            )}
          </Metric>
        </div>
        <BadgeDelta
          deltaType={`${netPositionChangePercentage(
            determineSentiment(
              Number(item["Noncommercial Positions-Long (All)"]),
              Number(item["Noncommercial Positions-Short (All)"])
            ),
            determineSentimentString(
              Number(item["Noncommercial Positions-Long (All)"]),
              Number(item["Noncommercial Positions-Short (All)"])
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
              Number(item["Noncommercial Positions-Long (All)"]),
              Number(item["Noncommercial Positions-Short (All)"])
            ),
            determineSentimentString(
              Number(item["Noncommercial Positions-Long (All)"]),
              Number(item["Noncommercial Positions-Short (All)"])
            ) == "long"
              ? item["Change in Noncommercial-Long (All)"]
              : item["Change in Noncommercial-Short (All)"]
          )}{" "}
          %
        </BadgeDelta>
      </Flex>
      <Flex className="mt-4 space-x-2">
        <Text className="truncate">{`${netPositionPercentage(
          Number(item["Noncommercial Positions-Long (All)"]),
          Number(item["Noncommercial Positions-Short (All)"]),
          determineSentiment(
            Number(item["Noncommercial Positions-Long (All)"]),
            Number(item["Noncommercial Positions-Short (All)"])
          )
        )}% (${determineSentimentString(
          Number(item["Noncommercial Positions-Long (All)"]),
          Number(item["Noncommercial Positions-Short (All)"])
        ) == "long"
          ? "Open Longs"
          : "Open Shorts"
          })`}</Text>
        <Text className="truncate">
          {numberWithCommas(
            totalPositionAmount(
              Number(item["Noncommercial Positions-Long (All)"]),
              Number(item["Noncommercial Positions-Short (All)"])
            )
          )}
        </Text>
      </Flex>
      <ProgressBar
        value={netPositionPercentage(
          Number(item["Noncommercial Positions-Long (All)"]),
          Number(item["Noncommercial Positions-Short (All)"]),
          determineSentiment(
            Number(item["Noncommercial Positions-Long (All)"]),
            Number(item["Noncommercial Positions-Short (All)"])
          )
        )}
        color={`${determineSentimentString(
          Number(item["Noncommercial Positions-Long (All)"]),
          Number(item["Noncommercial Positions-Short (All)"])
        ) == "long"
          ? "green"
          : "red"
          }`}
        className="mt-2"
      />
    </div>
  );
};

export default PairCard;
