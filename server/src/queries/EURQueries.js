const ALL_EUR_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'EURO FX - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_EUR_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'EURO FX - CHICAGO MERCANTILE EXCHANGE' and 
"As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
from cot_table);`;

module.exports = { ALL_EUR_DATA, MOST_RECENT_EUR_DATA };
