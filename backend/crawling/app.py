from flask import Flask, request, jsonify
import py_eureka_client.eureka_client as eureka_client
from views.crawling_views import app_views
from views.rabbitmq_client import receive_message
from threading import Thread

rest_port = 8085

app = Flask(__name__)


def create_app():
    # eureka_client.init(eureka_server="http://luckyseven:cnzkcnzk7!@k10c107.p.ssafy.io:8761/eureka",
    #             app_name="crawling",
    #             instance_port=rest_port)
    thread = Thread(target=receive_message)
    thread.start()
    app = Flask(__name__)
    app.register_blueprint(app_views)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port = rest_port)