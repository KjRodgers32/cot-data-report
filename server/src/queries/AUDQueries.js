const ALL_AUD_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'AUSTRALIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_AUD_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'AUSTRALIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE' and 
"As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
from cot_table);`;

module.exports = { ALL_AUD_DATA, MOST_RECENT_AUD_DATA };
