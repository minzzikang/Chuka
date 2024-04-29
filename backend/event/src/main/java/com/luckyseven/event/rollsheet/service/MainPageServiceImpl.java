package com.luckyseven.event.rollsheet.service;

import com.luckyseven.event.rollsheet.repository.EventRepository;
import com.luckyseven.event.rollsheet.repository.JoinEventRepository;
import com.luckyseven.event.rollsheet.repository.RollSheetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MainPageServiceImpl implements MainPageService {

    private final EventRepository eventRepository;
    private final RollSheetRepository rollSheetRepository;
    private final JoinEventRepository joinEventRepository;

    @Override
    public int countEvent() {
        return Math.toIntExact(eventRepository.count());
    }

    @Override
    public int countRollSheet() {
        return Math.toIntExact(rollSheetRepository.count());
    }

}
