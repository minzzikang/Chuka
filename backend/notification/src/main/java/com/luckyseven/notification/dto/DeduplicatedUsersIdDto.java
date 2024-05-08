package com.luckyseven.notification.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeduplicatedUsersIdDto {
    HashMap<String, List<String>> hashMapData = new HashMap<>();
    public DeduplicatedUsersIdDto(String jsonString) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        DeduplicatedUsersIdDto dto = objectMapper.readValue(jsonString, DeduplicatedUsersIdDto.class);
        this.hashMapData = dto.getHashMapData();
    }
}
