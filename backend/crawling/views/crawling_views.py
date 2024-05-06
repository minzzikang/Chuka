from flask import Blueprint, request, jsonify
from utils.utils import extract_shopping_info
from utils.selectors import get_selectors
from views.rabbitmq_client import send_message
app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

@app_views.route('/crawling/hello', methods=['GET'])
def hello():
    return jsonify({"message": "HELLO!! This is Crawling Server"})

@app_views.route('/crawling/rabbit/<param>', methods=['GET'])
def rabbit_test(param):
    info = {'productImageUrl': 'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/v2/2/4/9/7/6/6/KCDQE/6736249766_B.jpg', 'productPrice': 1698400, 'productName': '갤럭시 자급제 SM-S928N', 'fundingId': 28, 'status': 200, 'message': '성공', 'userId': '3460091535'}
    info['productName'] = param
    print(info)
    send_message(info)
    return jsonify({"message": info})

@app_views.route("/crawling", methods=["POST"])
def extract_image():
    data = request.json
    url = data['url']
    selectors = get_selectors(url)
    
    if selectors is None:
        return jsonify({"message": "지원하지 않는 쇼핑몰입니다."}), 400
    
    info = extract_shopping_info(url, selectors)

    if "error" in info:
        return jsonify(info), 400
    else:
        if info.get("product_url") and info.get("product_price") and info.get("product_name"):
            return jsonify(info)
        else:
            return jsonify({"message": "구매 상세 페이지를 정확히 입력해주세요."}), 400
