const ALL_NZ_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'NZ DOLLAR - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_NZ_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'NZ DOLLAR - CHICAGO MERCANTILE EXCHANGE' and 
"As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
from cot_table);`;

module.exports = { ALL_NZ_DATA, MOST_RECENT_NZ_DATA };
