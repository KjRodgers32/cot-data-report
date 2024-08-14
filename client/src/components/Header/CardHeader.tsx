import { CardDataProp } from "../../types";
import DesktopCardHeader from "./DesktopCardHeader";
import MobileCardHeader from "./MobileCardHeader";
import TabletCardHeader from "./TabletCardHeader";

const CardHeader = ({
  rightClicked,
  setRightClicked,
  setCardName,
  data,
  loading,
}: CardDataProp) => {

  return (
    <>
      <DesktopCardHeader rightClicked={rightClicked} setRightClicked={setRightClicked} setCardName={setCardName} data={data} loading={loading} />
      <TabletCardHeader rightClicked={rightClicked} setRightClicked={setRightClicked} setCardName={setCardName} data={data} loading={loading} />
      <MobileCardHeader rightClicked={rightClicked} setRightClicked={setRightClicked} setCardName={setCardName} data={data} loading={loading} />
    </>
  );
};

export default CardHeader;
