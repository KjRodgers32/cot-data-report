export interface PairData {
  "Market and Exchange Names": string;
  "As of Date in Form YYYY-MM-DD": string;
  "Open Interest (All)": number;
  "Noncommercial Positions-Long (All)": number;
  "Noncommercial Positions-Short (All)": number;
  "Noncommercial Positions-Spreading (All)": number;
  "Noncommercial Positions-Long (Old)": number;
  "Noncommercial Positions-Short (Old)": number;
  "Noncommercial Positions-Spreading (Old)": number;
  "Change in Noncommercial-Long (All)": number;
  "Change in Noncommercial-Short (All)": number;
  "Change in Noncommercial-Spreading (All)": number;
  "% of OI-Noncommercial-Long (All)": number;
  "% of OI-Noncommercial-Short (All)": number;
  "% of OI-Noncommercial-Spreading (All)": number;
  "% of OI-Noncommercial-Long (Old)": number;
  "% of OI-Noncommercial-Short (Old)": number;
  "% of OI-Noncommercial-Spreading (Old)": number;
}

export interface ColorMap {
  [key: string]: string;
}

export interface CardDataProp {
  rightClicked: boolean;
  setRightClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setCardName: React.Dispatch<React.SetStateAction<string>>;
  data: PairData[] | undefined;
  loading: boolean;
}

export interface PairDataProp {
  item: PairData;
  size: string;
  cardName: React.Dispatch<React.SetStateAction<string>>;
}

export interface SkeletonCardProp {
  size: string;
}

export interface PairShortAndLongDataProp {
  x: string;
  long: number;
  short: number;
}

export interface AppDataProp {
  rightClicked: boolean;
  setRightClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setCardName: React.Dispatch<React.SetStateAction<string>>;
  data: PairData[] | undefined;
  loading: boolean;
  pairData: PairData[] | undefined;
  pairLoading: boolean;
  pairTimeDataLoading: boolean;
  pairShortAndLongData: PairShortAndLongDataProp[] | [];
  maxValue: number;
}


