const { db } = require("../../db");
const { ALL_USD_DATA, MOST_RECENT_USD_DATA } = require("../queries/USDQueries");

exports.baseGet = async (req, res) => {
	try {
		const result = await db.query(ALL_USD_DATA);
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

exports.latestGet = async (req, res) => {
	try {
		const result = await db.query(MOST_RECENT_USD_DATA);
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
