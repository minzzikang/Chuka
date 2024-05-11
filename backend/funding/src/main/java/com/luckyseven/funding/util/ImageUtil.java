package com.luckyseven.funding.util;

import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
public class ImageUtil {
    public boolean isImageUrlValidStrict(String url) {
        try {
            //URL 연결
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            //이미지 형식 확인
            String contentType = connection.getHeaderField("Content-Type");
            if (!contentType.startsWith("image/")) {
                return false;
            }

            //이미지 데이터 읽기
            BufferedImage image = ImageIO.read(connection.getInputStream());
            if (image == null) {
                return false;
            }

            //이미지 크기 확인
            if (image.getWidth() <= 0 || image.getHeight() <= 0) {
                return false;
            }

            return true;
        } catch (IOException e) {
            return false;
        }
    }

    public boolean isImageUrlValidModerate(String url) {
        try {
            // URL 연결
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            // 이미지 형식 확인
            String contentType = connection.getHeaderField("Content-Type");
            if (!contentType.startsWith("image/")) {
                return false;
            }

            return true;
        } catch (IOException e) {
            return false;
        }
    }
}
