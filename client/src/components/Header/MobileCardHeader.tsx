import { CardDataProp } from "../../types";
import { useState } from 'react'

const MobileCardHeader = ({
  rightClicked,
  setRightClicked,
  setCardName,
  data,
  loading,
}: CardDataProp) => {
  const [results, setResults] = useState(1);

  const slideLeftMobile = () => {
    if (results! < 1) {
      return;
    } else {
      setRightClicked(false);
      setResults((prevResults) => prevResults - 1);
    }
  };

  const slideRightMobile = () => {
    if (results! > 9) {
      return;
    } else {
      setRightClicked(true);
      setResults((prevResults) => prevResults + 1);
    }
  };

  return (
    <div>MobileCardHeader</div>
  )
}

export default MobileCardHeader;
