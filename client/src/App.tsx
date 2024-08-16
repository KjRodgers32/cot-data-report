import { useState } from "react";
import { useAllRecentPairs } from "./hooks/useAllRecentPairs";
import { useRecentDataOfPair } from "./hooks/useRecentDataOfPair";
import CardHeader from "./components/Header/CardHeader";
import { usePairHistoricalData } from "./hooks/usesPairHistoricalData";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"
import NavBar from "./components/NavBar/NavBar";
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
      <div className="mx-auto w-full">
        <NavBar />
        <div className="flex gap-5 items-center justify-center mt-3">
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
