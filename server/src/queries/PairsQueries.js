const ALL_PAIRS_DATA = `select * from futures_data`;

const MOST_RECENT_PAIRS_DATA = `select * from futures_data 
where "As of Date in Form YYYY-MM-DD" = (
	select max("As of Date in Form YYYY-MM-DD") 
	from futures_data
);`;

module.exports = { ALL_PAIRS_DATA, MOST_RECENT_PAIRS_DATA };
