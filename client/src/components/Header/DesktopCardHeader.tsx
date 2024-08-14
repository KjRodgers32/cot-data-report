import { CardDataProp } from "../../types";
import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CardSkeleton from "../UI/CardSkeleton";
import PairCard from "../Dashboard/Cards/PairCard";

const DesktopCardHeader = ({
  rightClicked,
  setRightClicked,
  setCardName,
  data,
  loading,
}: CardDataProp) => {

  const [results, setResults] = useState(3);

  const slideLeftDesktop = () => {
    if (results! < 3) {
      return;
    } else {
      setRightClicked(false);
      setResults((prevResults) => prevResults - 3);
    }
  };

  const slideRightDesktop = () => {
    if (results! > 9) {
      return;
    } else {
      setRightClicked(true);
      setResults((prevResults) => prevResults + 3);
    }
  };

  return (
    <>
      <motion.button
        disabled={results <= 3}
        className="px-3 py-5 shadow-md rounded-md cursor-pointer"
        whileTap={{ scale: 0.97 }}
        onClick={slideLeftDesktop}
      >
        <KeyboardDoubleArrowLeftIcon
          fontSize="large"
          htmlColor={`${results <= 3 ? "grey" : "black"}`}
        />
      </motion.button>
      <AnimatePresence>
        <div>
          {loading && (
            <div className="flex gap-5 bg-white p-2 rounded-md">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <CardSkeleton size="lg" />
                </div>
              ))}
            </div>
          )}
          {data && (
            <div className="flex gap-5">
              {data?.slice(results - 3, results).map((item) => (
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
                  <PairCard size="lg" item={item} cardName={setCardName} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </AnimatePresence>
      <motion.button
        disabled={results === 9}
        className="px-3 py-5 shadow-md rounded-md cursor-pointer"
        whileTap={{ scale: 0.97 }}
        onClick={slideRightDesktop}
      >
        <KeyboardDoubleArrowRightIcon
          htmlColor={`${results === 9 ? "grey" : "black"}`}
          fontSize="large"
        />
      </motion.button>
    </>
  )
}

export default DesktopCardHeader;
