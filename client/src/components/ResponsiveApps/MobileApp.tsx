import { AppDataProp } from "../../types";
import NavBar from "../NavBar/NavBar";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"
import MobileCardHeader from "../Header/MobileCardHeader";


const MobileApp = ({
  rightClicked,
  setRightClicked,
  setCardName,
  data,
  loading,
  pairData,
  pairLoading,
  pairTimeDataLoading,
  pairShortAndLongData,
  maxValue
}: AppDataProp) => {
  return (
    <div className="w-full flex overflow-hidden">
      <div className="mx-auto w-full">
        <NavBar />
        <div className="flex gap-5 items-center justify-center mt-3">
          <MobileCardHeader
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
}

export default MobileApp;
