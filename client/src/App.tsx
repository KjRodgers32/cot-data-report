import { useState } from "react";
import { useAllRecentPairs } from "./hooks/useAllRecentPairs";
import { useRecentDataOfPair } from "./hooks/useRecentDataOfPair";
import { usePairHistoricalData } from "./hooks/usesPairHistoricalData";
import { useMedia } from 'react-use';
import MobileApp from "./components/ResponsiveApps/MobileApp";
import TabletApp from "./components/ResponsiveApps/TabletApp";
import DesktopApp from "./components/ResponsiveApps/DesktopApp";

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

  const isMd = useMedia('(min-width: 768px)')
  const isLg = useMedia('(min-width: 1210px)')

  return (
    <>
      {!isMd && <MobileApp rightClicked={rightClicked} setRightClicked={setRightClicked} setCardName={setCardName} data={data} loading={loading} pairData={pairData} pairLoading={pairLoading} pairTimeDataLoading={pairTimeDataLoading} pairShortAndLongData={pairShortAndLongData} maxValue={maxValue} />}
      {isMd && !isLg && <TabletApp rightClicked={rightClicked} setRightClicked={setRightClicked} setCardName={setCardName} data={data} loading={loading} pairData={pairData} pairLoading={pairLoading} pairTimeDataLoading={pairTimeDataLoading} pairShortAndLongData={pairShortAndLongData} maxValue={maxValue} />}
      {isLg && <DesktopApp rightClicked={rightClicked} setRightClicked={setRightClicked} setCardName={setCardName} data={data} loading={loading} pairData={pairData} pairLoading={pairLoading} pairTimeDataLoading={pairTimeDataLoading} pairShortAndLongData={pairShortAndLongData} maxValue={maxValue} />}
    </>
  );
};

export default App;
