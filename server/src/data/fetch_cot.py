import pandas as pd
import numpy as np
import cot_reports as cot
import os
import csv
import json

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

def delete_text_file(file_name):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, file_name)
    print(script_dir)

    try:
        # Check if the file exists before attempting to delete
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"The file '{file_name}' has been deleted successfully.")
        else:
            print(f"The file '{file_name}' does not exist in the directory.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Use cot library to pull in the latest cot report data
cot.cot_year(year=2024, cot_report_type='legacy_fut')

# Take that data and convert it into a csv that can be uploaded to our database
df = pd.read_csv("annual.txt", index_col=False)

# structure the data into a better format before uploading to our database
df = df[df['Market and Exchange Names'].str.contains('CHICAGO MERCANTILE') | df['Market and Exchange Names'].str.contains('USD INDEX - ICE FUTURES') | df['Market and Exchange Names'].str.contains('GOLD - COMMODITY EXCHANGE INC.')]
df = df[df['Market and Exchange Names'].isin(list_of_pairs)]
df = df[columns]
df = df[df['As of Date in Form YYYY-MM-DD'] == df['As of Date in Form YYYY-MM-DD'].max()]

# Export to CSV file that will be uploaded to our database
df.to_csv("LATEST_COT_DATA.csv", index=None)

# After file have been coverted, delete the original txt file
delete_text_file("annual.txt")

