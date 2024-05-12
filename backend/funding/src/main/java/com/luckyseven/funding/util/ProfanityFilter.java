package com.luckyseven.funding.util;

import com.vane.badwordfiltering.BadWordFiltering;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ProfanityFilter {
    public BadWordFiltering badWordFiltering;

    public ProfanityFilter(@Value("${bad-words-url}") String url) {
        badWordFiltering = new BadWordFiltering();
        badWordFiltering.readURL(url, ",");
    }
}
