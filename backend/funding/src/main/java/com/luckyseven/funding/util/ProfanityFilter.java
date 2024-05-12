package com.luckyseven.funding.util;

import com.vane.badwordfiltering.BadWordFiltering;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ProfanityFilter extends BadWordFiltering {
    private ProfanityFilter profanityFilter;
    private final String[] specialCharacters = {"_", "(", "?", "=", ".", "*", "[", "$", "@", "$", "!", "%", "*", "#", "?", "&", "]", ")", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};

    public ProfanityFilter(@Value("${bad-words-url}") String url) {
        this.readURL(url, ",");
    }

    public String changeWithDeafultDelimiter(String text) {
        return super.change(text, specialCharacters);
    }
}
