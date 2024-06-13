const ALL_JPY_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'JAPANESE YEN - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_JPY_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'JAPANESE YEN - CHICAGO MERCANTILE EXCHANGE' and
 "As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
 from cot_table);`;

module.exports = { ALL_JPY_DATA, MOST_RECENT_JPY_DATA };
