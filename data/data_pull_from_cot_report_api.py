import logging
import psycopg2

import cot_reports as cot
import pandas as pd

from sqlalchemy import create_engine

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

list_of_pairs = [
    r'GOLD - COMMODITY EXCHANGE INC.',
    r'CANADIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE',
    r'SWISS FRANC - CHICAGO MERCANTILE EXCHANGE',
    r'BRITISH POUND - CHICAGO MERCANTILE EXCHANGE',
    r'JAPANESE YEN - CHICAGO MERCANTILE EXCHANGE',
    r'USD INDEX - ICE FUTURES U.S.',
    r'EURO FX - CHICAGO MERCANTILE EXCHANGE',
    r'NZ DOLLAR - CHICAGO MERCANTILE EXCHANGE',
    r'AUSTRALIAN DOLLAR - CHICAGO MERCANTILE EXCHANGE'
]

columns = [
    'Market and Exchange Names',
    'As of Date in Form YYYY-MM-DD',
    'Open Interest (All)',
    'Noncommercial Positions-Long (All)',
    'Noncommercial Positions-Short (All)',
    'Noncommercial Positions-Spreading (All)',
    'Noncommercial Positions-Long (Old)',
    'Noncommercial Positions-Short (Old)',
    'Noncommercial Positions-Spreading (Old)',
    'Change in Noncommercial-Long (All)',
    'Change in Noncommercial-Short (All)',
    'Change in Noncommercial-Spreading (All)',
    '% of OI-Noncommercial-Long (All)',
    '% of OI-Noncommercial-Short (All)',
    '% of OI-Noncommercial-Spreading (All)',
    '% of OI-Noncommercial-Long (Old)',
    '% of OI-Noncommercial-Short (Old)',
    '% of OI-Noncommercial-Spreading (Old)'
]

# Returns pd.DataFrame of futures data from 1986-latest_date
df = cot.cot_all(cot_report_type='legacy_fut', store_txt=False)

logging.info('Formatting cot file...')

fx_data = df[(df['Market and Exchange Names'].str.contains('CHICAGO MERCANTILE') 
             | df['Market and Exchange Names'].str.contains('USD INDEX - ICE FUTURES')) &
             (df['Market and Exchange Names'].isin(list_of_pairs))]
fx_final_report_data = fx_data[columns]

logging.info('Sucessfully formatted cot file!')

logging.info('Connecting to database...')
try:
    engine = create_engine('postgresql://root:root@pgdatabase:5432/cot_data')
    command = pd.io.sql.get_schema(fx_final_report_data.head(1),name='futures_data', con=engine)

    conn = psycopg2.connect('postgresql://root:root@pgdatabase:5432/cot_data')
    cur = conn.cursor()

    logging.info('Connected to the database!')

    try:
        logging.info('Writing to database...')

        cur.execute(command)

        cur.close()
        conn.commit()

        fx_final_report_data.to_sql(con=engine, name='futures_data',if_exists='replace', index=False)

        logging.info('Files successfully in database!')
    finally:
        conn.close()
        cur.close()

except psycopg2.OperationalError as e:
        logging.error(f'Failed to connect to database...')
        raise(e)
except Exception as e:
        logging.error(f'Failed during data ingestiong...')
        raise(e)