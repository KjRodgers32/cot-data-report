// comment
const ALL_XAU_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'GOLD - COMMODITY EXCHANGE INC.';`;

const MOST_RECENT_XAU_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'GOLD - COMMODITY EXCHANGE INC.' and 
"As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD")
     from futures_data);`;

module.exports = { ALL_XAU_DATA, MOST_RECENT_XAU_DATA };
