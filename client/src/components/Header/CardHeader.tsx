import { useMedia } from 'react-use';
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

  const isMd = useMedia('(min-width: 768px)')
  const isLg = useMedia('(min-width: 1210px)')

  return (
    <>
      {!isMd && <MobileCardHeader rightClicked={rightClicked} setRightClicked={setRightClicked} setCardName={setCardName} data={data} loading={loading} />}
      {isMd && !isLg && <TabletCardHeader rightClicked={rightClicked} setRightClicked={setRightClicked} setCardName={setCardName} data={data} loading={loading} />}
      {isLg && <DesktopCardHeader rightClicked={rightClicked} setRightClicked={setRightClicked} setCardName={setCardName} data={data} loading={loading} />}
    </>
  );
};

export default CardHeader;
