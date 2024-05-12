package com.luckyseven.event.util;

import com.vane.badwordfiltering.BadWordFiltering;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.StringTokenizer;

@Slf4j
@Component
public class ProfanityFilter extends BadWordFiltering {
    private final String[] specialCharacters = {"_", "(", "?", "=", ".", "*", "[", "$", "@", "$", "!", "%", "*", "#", "?", "&", "]", ")", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};
    private String substituteValue = "*";

    public ProfanityFilter(@Value("${bad-words-url}") String url) {
        try {
            readURL(url, ",");
        } catch (Exception e) {
            //e.printStackTrace();
        }
    }

    public String changeWithDeafultDelimiter(String text) {
        try {
            return change(text, specialCharacters);
        } catch (Exception e) {
            //e.printStackTrace();
            return text;
        }
    }

    @Override
    public void readURL(String url, String delim) {
        try {
            //URL 연결
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            try (BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                String line = "";
                StringTokenizer st = null;

                while ((line = br.readLine()) != null) {
                    st = new StringTokenizer(line, ",");

                    while(st.hasMoreTokens()) {
                        this.add(st.nextToken().trim());
                    }

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
