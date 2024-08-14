import { CardDataProp } from "../../types";
import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CardSkeleton from "../UI/CardSkeleton";
import PairCard from "../Dashboard/Cards/PairCard";

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
    <>
      <motion.button
        disabled={results <= 2}
        className="px-3 py-5 shadow-md rounded-md cursor-pointer"
        whileTap={{ scale: 0.97 }}
        onClick={slideLeftTablet}
      >
        <KeyboardDoubleArrowLeftIcon
          fontSize="large"
          htmlColor={`${results <= 2 ? "grey" : "black"}`}
        />
      </motion.button>
      <AnimatePresence>
        <div>
          {loading && (
            <div className="flex gap-5 bg-white p-2 rounded-md">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i}>
                  <CardSkeleton size="md" />
                </div>
              ))}
            </div>
          )}
          {data && (
            <div className="flex gap-5">
              {data?.slice(results - 2, results).map((item) => (
                <motion.div
                  key={
                    item["Market and Exchange Names"] +
                    item["As of Date in Form YYYY-MM-DD"]
                  }
                  initial={
                    rightClicked
                      ? { x: 300, opacity: 0.5 }
                      : { x: -300, opacity: 0 }
                  }
                  animate={{ x: 0, opacity: 1 }}
                  exit={
                    rightClicked
                      ? { x: -300, opacity: 0 }
                      : { x: 300, opacity: 0.5 }
                  }
                >
                  <PairCard size="md" item={item} cardName={setCardName} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </AnimatePresence>
      <motion.button
        disabled={results === 8}
        className="px-3 py-5 shadow-md rounded-md cursor-pointer"
        whileTap={{ scale: 0.97 }}
        onClick={slideRightTablet}
      >
        <KeyboardDoubleArrowRightIcon
          htmlColor={`${results === 8 ? "grey" : "black"}`}
          fontSize="large"
        />
      </motion.button>
    </>
  )
}

export default TabletCardHeader;
