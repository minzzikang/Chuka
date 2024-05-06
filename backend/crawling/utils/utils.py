from bs4 import BeautifulSoup
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def extract_and_convert_price(price_tag):
    if price_tag:
        price_text = price_tag.text.strip().replace(',', '').replace('원', '')
        price_text = re.sub(r'[^\d]', '', price_text)
        price = int(price_text)
    else:
        price = None
    return price

def fetch_html_with_selenium(url):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    with webdriver.Chrome(options=chrome_options) as driver:
        driver.get(url)
        html_source = driver.page_source
    return html_source

def extract_shopping_info(url: str, selectors: dict):
    try:
        html_source = fetch_html_with_selenium(url)
        soup = BeautifulSoup(html_source, 'html.parser')
        
        # 이미지
        if selectors.get('image_method', 'find') == 'select_one':
            img_tag = soup.select_one(selectors['image'])
        elif selectors.get('image_method', 'find') == 'id':
            img_tag = soup.find('img', id=selectors['image'])
        else:
            img_tag = soup.find('img', class_=selectors['image'])
        image_url = img_tag.get('src') if img_tag else None
        
        if image_url and image_url.startswith('//'):
            image_url = 'https:' + image_url

        # 가격
        if selectors.get('price_method', 'find') == 'select_one':
            price_tag = soup.select_one(selectors['price'])
        else:
            price_tag = soup.find(selectors['price_tag'], class_=selectors['price'])
        price = extract_and_convert_price(price_tag)

        # 이름
        name_tag = soup.find(selectors['name_tag'], class_=selectors['name'])
        name = re.sub(r'\(.*?\)|\[.*?\]', '', name_tag.text).strip() if name_tag else None

        return {"productImageUrl": image_url, "productPrice": price, "productName": name}
    except Exception as e:
        return {"status":400, "message": str(e)}