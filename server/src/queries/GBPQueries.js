const ALL_GBP_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'BRITISH POUND - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_GBP_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'BRITISH POUND - CHICAGO MERCANTILE EXCHANGE' and
 "As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
 from cot_table);`;

module.exports = { ALL_GBP_DATA, MOST_RECENT_GBP_DATA };
