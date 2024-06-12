FROM python:3.9

WORKDIR /app

COPY requirements.txt .
COPY data_pull_from_cot_report_api.py .
COPY .env .

RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python", "data_pull_from_cot_report_api.py" ]