const ALL_EUR_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'EURO FX - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_EUR_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'EURO FX - CHICAGO MERCANTILE EXCHANGE' and 
"As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
from futures_data);`;

module.exports = { ALL_EUR_DATA, MOST_RECENT_EUR_DATA };
