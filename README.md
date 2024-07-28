# Cot Data Report

This is a project idea that I have a for a while, but kept putting it off. Now since I'm studying a practicing to become a Data Engineer, I figured there was no time like the present!

# Main things I wanted to accomplish:
- Gather a large amount of historical COT (Commitments of Traders) Report data
- Clean, Transform, and Store this data into a database
- Graphically display data for people to view
- Finally, finish a project that I actually care about

# Tools Used:
- Python for pulling, cleaning, transforming, and uploading the data
- Postgres for storing the cleaned data
- Docker for making the environment setup easier
- React.js for displaying the data
- Express.js for creating the backend API layer for accessing the data
- ~AWS Lambda for pulling the data every week when the report is released~
- _I updated this part by spinning up my own home server and using Apache Airflow to orchestrate a workflow that updates the DB_

More details about specific parts can be found in the README.md files in each separate folder
