import { Flex } from "@tremor/react";
import { SkeletonCardProp } from "../../types";

const LoadingSkeleton = ({ size }: SkeletonCardProp
) => {
  return (
    <>
      {size === "lg" &&
        <div className="w-[20rem] min-w-[10rem] h-[10rem] bg-white p-3 rounded-lg shadow-md animate-pulse">
          <Flex alignItems="start">
            <div className="truncate">
              <div className="w-[8rem] bg-slate-300 h-3 rounded-sm"></div>
              <div className="truncate w-[10rem] bg-slate-300 h-8 mt-5 rounded-sm"></div>
            </div>
            <div className="h-6 w-9 bg-slate-300 rounded-3xl"></div>
          </Flex>
          <Flex className="mt-4 space-x-2">
            <div className="truncate h-4 w-[10rem] bg-slate-300 rounded-sm"></div>
          </Flex>
          <div className="mt-4 w-full h-3 bg-slate-300 rounded-sm" />
        </div>
      }

      {size === "md" &&
        <div className="w-[20rem] min-w-[10rem] h-[10rem] bg-white p-3 rounded-lg shadow-md animate-pulse">
          <Flex alignItems="start">
            <div className="truncate">
              <div className="w-[8rem] bg-slate-300 h-3 rounded-sm"></div>
              <div className="truncate w-[10rem] bg-slate-300 h-8 mt-5 rounded-sm"></div>
            </div>
            <div className="h-6 w-9 bg-slate-300 rounded-3xl"></div>
          </Flex>
          <Flex className="mt-4 space-x-2">
            <div className="truncate h-4 w-[10rem] bg-slate-300 rounded-sm"></div>
          </Flex>
          <div className="mt-4 w-full h-3 bg-slate-300 rounded-sm" />
        </div>
      }

      {size === "sm" &&
        <div className="w-[20rem] min-w-[10rem] h-[10rem] bg-white p-3 rounded-lg shadow-md animate-pulse">
          <Flex alignItems="start">
            <div className="truncate">
              <div className="w-[8rem] bg-slate-300 h-3 rounded-sm"></div>
              <div className="truncate w-[10rem] bg-slate-300 h-8 mt-5 rounded-sm"></div>
            </div>
            <div className="h-6 w-9 bg-slate-300 rounded-3xl"></div>
          </Flex>
          <Flex className="mt-4 space-x-2">
            <div className="truncate h-4 w-[10rem] bg-slate-300 rounded-sm"></div>
          </Flex>
          <div className="mt-4 w-full h-3 bg-slate-300 rounded-sm" />
        </div>
      }
    </>
  );
};

export default LoadingSkeleton;
