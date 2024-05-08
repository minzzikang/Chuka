package com.luckyseven.user.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashMap;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeduplicatedUsersIdDto {
    HashMap<String, List<String>> hashMapData = new HashMap<>();
}
