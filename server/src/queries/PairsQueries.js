const ALL_PAIRS_DATA = `select * from cot_table`;

const MOST_RECENT_PAIRS_DATA = `select * from cot_table 
where "As of Date in Form YYYY-MM-DD" = (
	select max("As of Date in Form YYYY-MM-DD") 
	from cot_table
);`;

module.exports = { ALL_PAIRS_DATA, MOST_RECENT_PAIRS_DATA };
