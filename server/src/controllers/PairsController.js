const { db } = require("../../db");
const {
	ALL_PAIRS_DATA,
	MOST_RECENT_PAIRS_DATA,
} = require("../queries/PairsQueries");

exports.baseGet = async (req, res) => {
	try {
		const result = await db.query(ALL_PAIRS_DATA);
		res.status(200).json({
			status: "success",
			requestedAt: req.requestTime,
			results: result.rows.length,
			data: result.rows,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "error",
			message: err,
		});
	}
};

exports.latestGet = async (req, res) => {
	try {
		const result = await db.query(MOST_RECENT_PAIRS_DATA);
		res.status(200).json({
			status: "success",
			requestedAt: req.requestTime,
			results: result.rows.length,
			data: result.rows,
		});
	} catch (err) {
		res.status(500).json({
			status: "error",
			message: err,
		});
	}
};
