import logging
import psycopg2

import cot_reports as cot
import pandas as pd

from sqlalchemy import create_engine, text
from dotenv import dotenv_values

config = dotenv_values(".env")

LOGGING_FORMAT = '%(asctime)s - %(levelname)s - %(message)s'

DB_HOST = config['DB_HOST']
DB_PASS = config['DB_PASS']
DB_USER = config['DB_USER']
DB = config['DB']
PORT = 5432
POSTGRES_URL = f'postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{PORT}/{DB}'
TABLE_NAME = 'futures_data'

list_of_pairs = [
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

def get_futures_data() -> pd.DataFrame:
      """ Calls cot api and returns pandas dataframe of historical futures data
      from 1986-latest_date """
      return cot.cot_all(cot_report_type='legacy_fut', store_txt=False)

# Returns pd.DataFrame of futures data from 1986-latest_date
def main() -> None:
    logging.basicConfig(level=logging.INFO, format=LOGGING_FORMAT)
    
    logging.info('Fetchng COT data...')
    df = get_futures_data()
    logging.info('Fetching Successful!')

    logging.info('Formatting COT file...')
    fx_data = df[(df['Market and Exchange Names'].str.contains('CHICAGO MERCANTILE') 
                | df['Market and Exchange Names'].str.contains('USD INDEX - ICE FUTURES')) &
                (df['Market and Exchange Names'].isin(list_of_pairs))]
    fx_final_report_data = fx_data[columns]
    logging.info('Formatting Successful!')

    logging.info('Connecting to database...')
    try:
        engine = create_engine(POSTGRES_URL)

        with engine.connect() as conn:
            logging.info('Connection Successful!')

            logging.info('Creating table schema...')
            command = pd.io.sql.get_schema(fx_final_report_data.head(1),name=TABLE_NAME, con=engine)
             
            with conn.begin():
                conn.execute(text(command))
                logging.info('Created Schema Successful!')

            logging.info('Writing data to database...')
            fx_final_report_data.to_sql(con=engine, name='futures_data',if_exists='replace', index=False)
            logging.info('Write Successful!')

    except psycopg2.OperationalError as e:
            logging.error(f'Failed to connect to database...')
            raise(e)
    except Exception as e:
            logging.error(f'Failed during data ingestiong...')
            raise(e)
    
if __name__ == '__main__':
      main()