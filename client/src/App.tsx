import { useState } from "react";
import { sidebarItems } from "./components/Dashboard/Constants";
import { useAllRecentPairs } from "./hooks/useAllRecentPairs";
import { useRecentDataOfPair } from "./hooks/useRecentDataOfPair";
import CardHeader from "./components/Header/CardHeader";
import { usePairHistoricalData } from "./hooks/usesPairHistoricalData";
import { ResponsiveLine } from "@nivo/line";
import { ColorMap } from "./types";

const App = () => {
  const [results, setResults] = useState(3);
  const [rightClicked, setRightClicked] = useState(true);
  const [cardName, setCardName] = useState("");
  const { data, loading } = useAllRecentPairs();
  const { pairData, pairLoading } = useRecentDataOfPair(cardName);
  const { netLongData, netShortData, pairTimeDataLoading } =
    usePairHistoricalData(cardName);

  // Function to sort data by date
  const sortDataByDate = (
    data: {
      x: string;
      y: number;
    }[]
  ) => {
    return data.sort(
      (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
    );
  };

  // Sort netLongData and netShortData
  const sortedNetLongData = sortDataByDate([...netLongData]);
  const sortedNetShortData = sortDataByDate([...netShortData]);

  const chartData = [
    {
      id: `Net Long`,
      color: "#00c20a",
      data: [netLongData],
    },

    {
      id: `Net Short`,
      color: "#d71d1d",
      data: [netShortData],
    },
  ];

  const colorMap = chartData.reduce<ColorMap>((acc, item) => {
    acc[item.id] = item.color;
    return acc;
  }, {});

  // Determine the least, middle, and max dates
  const allDates = [...sortedNetLongData, ...sortedNetShortData].map((d) =>
    new Date(d.x).getTime()
  );
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));
  const middleDate = new Date((minDate.getTime() + maxDate.getTime()) / 2);

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
            results={results}
            setResults={setResults}
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
            !sortedNetLongData.length ||
            !sortedNetShortData.length ? (
            <p>Select Pair To View Chart</p>
          ) : (
            <ResponsiveLine
              data={chartData}
              margin={{ top: 50, right: 110, bottom: 50, left: 100 }}
              xScale={{
                type: "time",
                format: "%Y-%m-%d",
                precision: "day",
              }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              theme={{
                background: "#ffffff",
                grid: {
                  line: {
                    stroke: "#ffffff",
                  },
                },
              }}
              colors={({ id }) => colorMap[id]}
              yFormat=">-.2f"
              xFormat="time:%Y-%m-%d"
              curve="linear"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "COT Release Dates",
                legendOffset: 36,
                legendPosition: "middle",
                truncateTickAt: 0,
                format: "%b %d %Y", // format for the x-axis ticks
                tickValues: [minDate, middleDate, maxDate], // only show min, middle, and max dates
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 30,
                legend: "Open Interset (All)",
                legendOffset: -60,
                legendPosition: "middle",
                truncateTickAt: 0,
              }}
              lineWidth={4}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabel="yFormatted"
              pointLabelYOffset={-12}
              enableArea={true}
              areaOpacity={0.05}
              enableTouchCrosshair={true}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
