const determineSentiment = (long: number, short: number) => {
	if (short > long) {
		return short;
	} else {
		return long;
	}
};

const determineSentimentString = (long: number, short: number): string => {
	if (short > long) {
		return "short";
	} else {
		return "long";
	}
};

const netPositionPercentage = (
	long: number,
	short: number,
	largestNet: number
) => {
	const total_positions = long + short;
	const result = largestNet / total_positions;
	return Math.round(result * 100);
};

const netPositionChangePercentage = (
	largestNet: number,
	difference: number
) => {
	const result =
		(largestNet - (largestNet - difference)) / (largestNet - difference);
	return Math.round(result * 100);
};

const totalPositionAmount = (long: number, short: number) => {
	return long + short;
};

const numberWithCommas = (x: number) => {
	return x?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export {
	determineSentiment,
	determineSentimentString,
	netPositionPercentage,
	netPositionChangePercentage,
	totalPositionAmount,
	numberWithCommas,
};
