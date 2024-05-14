from flask import Blueprint, request, jsonify
from utils.utils import extract_shopping_info
from utils.selectors import get_selectors
app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

# MQ 쓰지않고 크롤링이 제대로 되고 있는 지 확인하기 위한 api
@app_views.route('/crawling/hello', methods=['GET'])
def hello():
    return jsonify({"message": "HELLO!! This is Crawling Server"})

@app_views.route("/crawling", methods=["POST"])
def extract_image():
    data = request.json
    url = data['url']
    selectors = get_selectors(url)
    
    if selectors is None:
        return jsonify({"message": "지원하지 않는 쇼핑몰입니다."}), 401
    
    info = extract_shopping_info(url, selectors)

    if "error" in info:
        return jsonify(info), 500
    else:
        if info.get("productImageUrl") and info.get("productName"):
            return jsonify(info)
        else:
            info["message"] = "구매 상세 페이지를 정확히 입력해주세요."
            return jsonify(info), 400
