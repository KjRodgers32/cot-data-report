// comment
const ALL_XAU_DATA = `select * from futures_data
where "Market and Exchange Names" = 'GOLD - COMMODITY EXCHANGE INC.' and
"As of Date in Form YYYY-MM-DD"::date between (select max("As of Date in Form YYYY-MM-DD")
from futures_data)::date - 360 and (select max("As of Date in Form YYYY-MM-DD") from futures_data)::date order by "As of Date in Form YYYY-MM-DD"::date ;`;

const MOST_RECENT_XAU_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'GOLD - COMMODITY EXCHANGE INC.' and 
"As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD")
     from futures_data) order by "As of Date in Form YYYY-MM-DD"::date ;`;

module.exports = { ALL_XAU_DATA, MOST_RECENT_XAU_DATA };
