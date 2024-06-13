const ALL_CAD_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'CANADIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE';`;

const MOST_RECENT_CAD_DATA = `select * from cot_table 
where "Market and Exchange Names" = 'CANADIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE' and 
"As of Date in Form YYYY-MM-DD" = (select max("As of Date in Form YYYY-MM-DD")
     from cot_table);`;

module.exports = { ALL_CAD_DATA, MOST_RECENT_CAD_DATA };
