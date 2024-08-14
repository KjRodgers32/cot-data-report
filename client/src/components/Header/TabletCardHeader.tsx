import { CardDataProp } from "../../types";
import { useState } from 'react'

const TabletCardHeader = ({
  rightClicked,
  setRightClicked,
  setCardName,
  data,
  loading,
}: CardDataProp) => {
  const [results, setResults] = useState(2);

  const slideLeftTablet = () => {
    if (results! < 2) {
      return;
    } else {
      setRightClicked(false);
      setResults((prevResults) => prevResults - 2);
    }
  };

  const slideRightTablet = () => {
    if (results! > 9) {
      return;
    } else {
      setRightClicked(true);
      setResults((prevResults) => prevResults + 2);
    }
  };

  return (
    <div>TabletCardHeader</div>
  )
}

export default TabletCardHeader;
