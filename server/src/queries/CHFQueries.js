const ALL_CHF_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'SWISS FRANC - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_CHF_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'SWISS FRANC - CHICAGO MERCANTILE EXCHANGE' and
 "As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
 from futures_data);`;

module.exports = { ALL_CHF_DATA, MOST_RECENT_CHF_DATA };
