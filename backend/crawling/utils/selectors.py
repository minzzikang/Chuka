def get_selectors(url):
    if "shopping.naver.com" in url:
        return {
            "image": "_2RYeHZAP_4",
            "image_method": "find",
            "price": "_1LY7DqCnwR",
            "price_tag": "span",
            "price_method": "find",
            "name": "_22kNQuEXmb _copyable",
            "name_tag": "h3",
        }
    elif "brand.naver.com" in url or "smartstore.naver.com" in url:
        return {
            "image": "div.bd_1uFKu > img.bd_2DO68",
            "image_method": "select_one",
            "price": "_1LY7DqCnwR",
            "price_tag": "span",
            "price_method": "find",
            "name": "_22kNQuEXmb _copyable",
            "name_tag": "h3",
        }
    # 쿠팡은 셀레니움으로 변경 이후 크롤링이 안됨
    elif "m.coupang.com" in url:
        return {
            "image": "li.on > img",
            "image_method": "select_one",
            "price": "title",
            "price_tag": "dt",
            "price_method": "find",
            "name": "prod-price__original-price",
            "name_tag": "span",
        }
    elif "www.coupang.com" in url:
        return {
            "image": "prod-image__detail",
            "image_method": "find",
            "price": "origin-price",
            "price_tag": "span",
            "price_method": "find",
            "name": "prod-buy-header__title",
            "name_tag": "h2",
        }
    elif "11st.co.kr" in url:
        return {
            "image": "div.img_full > img",
            "image_method": "select_one",
            "price": "dd.price_regular > del",
            "price_method": "select_one",
            "name": "title",
            "name_tag": "h1",
        }
    elif "gmarket.co.kr" in url or "auction.co.kr" in url:
        return {
            "image": "li.on > a > img",
            "image_method": "select_one",
            "price": "price_real",
            "price_tag": "strong",
            "price_method": "find",
            "name": "itemtit",
            "name_tag": "h1",
        }
    elif "wemakeprice.com" in url:
        return {
            "image": "div.info_img > img",
            "image_method": "select_one",
            "price": "strong.sale_price > em",
            "price_tag": "",
            "price_method": "select_one",
            "name": "deal_tit",
            "name_tag": "h3",
        }
    elif "ssg.com" in url:
        return {
            "image": "mainImg",
            "image_method": "id",
            "price": "span.cdtl_old_price > em",
            "price_tag": "em",
            "price_method": "select_one",
            "name": "cdtl_info_tit_txt",
            "name_tag": "span",
        }
    else:
        return None