package com.luckyseven.funding.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestClient;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA;

public class EventCommunicationService {
    RestClient restClient;

    //FIXME: 리턴 타입 수정
    /*
    void getEventInfo(int eventId) {
        restClient = RestClient.create();

        // 응답을 저장할 변수 선언
        RestClient.ResponseSpec response = null;
        String response2String = null;
        JsonNode response2Json = null;

        try {
            response = restClient.post().uri(APIGW_Invoke_URL).contentType(MULTIPART_FORM_DATA).header("X-OCR-SECRET", Secret_Key).body(requestBody).retrieve();
            response2String = response.body(String.class);
            ObjectMapper objectMapper = new ObjectMapper();

            response2Json = objectMapper.readTree(response2String);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return response2Json;
    }
     */
}
