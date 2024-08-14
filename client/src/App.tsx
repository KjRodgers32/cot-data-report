import { useState } from "react";
import { sidebarItems } from "./components/Dashboard/Constants";
import { useAllRecentPairs } from "./hooks/useAllRecentPairs";
import { useRecentDataOfPair } from "./hooks/useRecentDataOfPair";
import CardHeader from "./components/Header/CardHeader";
import { usePairHistoricalData } from "./hooks/usesPairHistoricalData";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"
const App = () => {
  const [rightClicked, setRightClicked] = useState(true);
  const [cardName, setCardName] = useState("");
  const { data, loading } = useAllRecentPairs();
  const { pairData, pairLoading } = useRecentDataOfPair(cardName);
  const { pairShortAndLongData, pairTimeDataLoading } =
    usePairHistoricalData(cardName);

  const maxValues = pairShortAndLongData?.map((item) => {
    return Math.max(item.short, item.long)
  })

  const maxValue = Math.max(...maxValues);

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
      <div className="mx-auto mt-9 w-full">
        <div className="flex gap-5 items-center justify-center">
          <CardHeader
            rightClicked={rightClicked}
            setRightClicked={setRightClicked}
            setCardName={setCardName}
            data={data}
            loading={loading}
          />
        </div>
        <div className="mt-[100px] items-center text-center h-[600px] w-full align-center">
          {pairLoading && ""}
          {pairData?.map((item) => (
            <div
              key={Math.random()}
              className="p-5 mb-5 shadow-lg rounded-lg w-fit flex-1 mx-auto"
            >
              <p>{item["Market and Exchange Names"]}</p>
            </div>
          ))}
          {pairTimeDataLoading ||
            !pairShortAndLongData.length ? (
            <p>Select Pair To View Chart</p>
          ) : (
            <LineChart width={1400} height={600} data={pairShortAndLongData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }} className='mx-auto'>
              <Line type="monotone" dataKey="long" stroke="green" strokeWidth={2} />
              <Line type="monotone" dataKey="short" stroke='red' strokeWidth={2} />
              <XAxis dataKey="x" />
              <YAxis dataKey='long' domain={[0, maxValue]} />
              <Tooltip />
            </LineChart>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
