const ALL_USD_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'USD INDEX - ICE FUTURES U.S.';`;

const MOST_RECENT_USD_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'USD INDEX - ICE FUTURES U.S.' and 
"As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
from cot_table);`;

module.exports = { ALL_USD_DATA, MOST_RECENT_USD_DATA };
