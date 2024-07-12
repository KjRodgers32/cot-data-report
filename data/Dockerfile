FROM python:3.9

WORKDIR /app

COPY requirements.txt .
COPY data_pull_from_cot_report_api.py .
COPY .env .
COPY pull_latest_data.py .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "pull_latest_data.main"]

#CMD [ "python", "data_pull_from_cot_report_api.py" ] use this line for your initial pull.
