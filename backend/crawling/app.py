from flask import Flask, request, jsonify
import py_eureka_client.eureka_client as eureka_client
from views.crawling_views import app_views

rest_port = 8085

app = Flask(__name__)

def create_app():
    #eureka_client.init(eureka_server="http://admin:5678@localhost:8761/eureka",
    #            app_name="crawling",
    #            instance_port=rest_port)
    app = Flask(__name__)
    app.register_blueprint(app_views)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port = rest_port)