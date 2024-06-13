const ALL_JPY_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'JAPANESE YEN - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_JPY_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'JAPANESE YEN - CHICAGO MERCANTILE EXCHANGE' and
 "As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
 from futures_data);`;

module.exports = { ALL_JPY_DATA, MOST_RECENT_JPY_DATA };
