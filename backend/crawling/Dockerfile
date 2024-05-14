FROM python:3.12-slim
USER root
WORKDIR /backend/crawling

RUN apt-get -y update && \
    apt -y install wget && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt -y install ./google-chrome-stable_current_amd64.deb
COPY requirements.txt requirements.txt
COPY app.py app.py
COPY config.py config.py
COPY utils/ utils/
COPY views/ views/
RUN pip install -r requirements.txt

CMD ["gunicorn", "app:create_app()", "--bind", "0.0.0.0:8085"]