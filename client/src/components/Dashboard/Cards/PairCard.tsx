import {
  BadgeDelta,
  Flex,
  ProgressBar,
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
      className="w-[20rem] min-w-[10rem] hover:cursor-pointer bg-main-white p-5 rounded-lg shadow-xl"
      onClick={() =>
        cardName(
          item["Market and Exchange Names"].match(/^(.*?)\s*-/)![1].trim()
        )
      }
    >
      <Flex alignItems="start">
        <div className="truncate">
          <div className="text-black text-sm">
            {item["Market and Exchange Names"].match(/^(.*?)\s*-/)![1].trim()}
          </div>
          <div className="truncate mt-1 text-2xl text-main-purple font-bold">
            {numberWithCommas(
              determineSentiment(
                Number(item["Noncommercial Positions-Long (All)"]),
                Number(item["Noncommercial Positions-Short (All)"])
              )
            )}
          </div>
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
      <Flex className="mt-3 space-x-2">
        <div className="truncate text-black text-sm">{`${netPositionPercentage(
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
          })`}</div>
        <div className="truncate text-black text-sm">
          {numberWithCommas(
            totalPositionAmount(
              Number(item["Noncommercial Positions-Long (All)"]),
              Number(item["Noncommercial Positions-Short (All)"])
            )
          )}
        </div>
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
