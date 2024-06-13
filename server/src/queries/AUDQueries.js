const ALL_AUD_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'AUSTRALIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_AUD_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'AUSTRALIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE' and 
"As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD") 	
from futures_data);`;

module.exports = { ALL_AUD_DATA, MOST_RECENT_AUD_DATA };
