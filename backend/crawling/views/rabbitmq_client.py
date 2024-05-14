from utils.utils import extract_shopping_info
from utils.selectors import get_selectors
import pika
import json
from config import RABBITMQ_HOST_NAME, RABBITMQ_PORT_NAME, QUEUE_NAME, RABBITMQ_ID, RABBITMQ_PASSWORD, PUB_QUEUE_NAME, PUB_EXCHANGE_NAME 


def send_message(info):
    credentials = pika.PlainCredentials(RABBITMQ_ID, RABBITMQ_PASSWORD)
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host=RABBITMQ_HOST_NAME, credentials=credentials)
    )
    channel = connection.channel()
    channel.queue_declare(queue=PUB_QUEUE_NAME)
    
    message = json.dumps(info)
    channel.basic_publish(exchange=PUB_EXCHANGE_NAME, routing_key="", body=message)
    print(" [x] Sent", info)
    
    connection.close()


def receive_message():
    credentials = pika.PlainCredentials(RABBITMQ_ID, RABBITMQ_PASSWORD)
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host=RABBITMQ_HOST_NAME, port=RABBITMQ_PORT_NAME, credentials=credentials)
    )
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME)
    
    def callback(ch, method, properties, body):
        data = json.loads(body)
        print(" [x] Received", data.get('productUrl'))
        selectors = get_selectors(data.get('productUrl'))
        info = extract_shopping_info(data.get('productUrl'), selectors)
        info.update({'fundingId': data.get('fundingId'), 'userId': data.get('userId')})
        if selectors is None:
            info.update({"status": 401, "message": "Unsupported shopping site"})
            print(info)
            send_message(info)
            return
        
        try:

            if info.get("productImageUrl") and info.get("productName"):
                info.update({"status": 200, "message": ""})
            else:
                info.update({"status": 400, "message": "Please check the product details page again."})
            
        except Exception as e:
            info = {"status": 500, "message": str(e)}
        print(info)
        send_message(info)
        
    channel.basic_consume(on_message_callback=callback, queue=QUEUE_NAME, auto_ack=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()
