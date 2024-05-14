from flask import Flask
from views.crawling_views import app_views
from views.rabbitmq_client import receive_message
from threading import Thread

rest_port = 8085

app = Flask(__name__)


def create_app():
    thread = Thread(target=receive_message)
    thread.start()
    app = Flask(__name__)
    app.register_blueprint(app_views)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port = rest_port)