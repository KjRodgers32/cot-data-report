const ALL_CAD_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'CANADIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_CAD_DATA = `select * from futures_data 
where "Market and Exchange Names" = 'CANADIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE' and 
"As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD")
     from futures_data);`;

module.exports = { ALL_CAD_DATA, MOST_RECENT_CAD_DATA };
