package com.luckyseven.event.rollsheet.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckyseven.event.rollsheet.repository.RollSheetRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class RollSheetServiceImplTest {

    @Mock
    private RollSheetService rollSheetService;

    @Mock
    private RollSheetRepository rollSheetRepository;

    @Spy
    private ObjectMapper objectMapper;

    @Test
    void saveRollSheet() {

    }
}