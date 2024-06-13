const ALL_CHF_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'SWISS FRANC - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_CHF_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'SWISS FRANC - CHICAGO MERCANTILE EXCHANGE' and
 "As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
 from cot_table);`;

module.exports = { ALL_CHF_DATA, MOST_RECENT_CHF_DATA };
