package com.luckyseven.funding.dto;

import com.luckyseven.funding.entity.Sponsor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import static lombok.AccessLevel.PRIVATE;

@Getter
@ToString
@RequiredArgsConstructor(access = PRIVATE)
public class SponsorRes {
    private final Integer sponsorId;
    private final Integer amount;
    private final String comment;
    private final String nickname;
    private final String profileImage;

    public static SponsorRes of(final Sponsor sponsor, final String profileImage){
        return new SponsorRes(
                sponsor.getSponsorId(),
                sponsor.getAmount(),
                sponsor.getComment(),
                sponsor.getNickname(),
                profileImage
        );
    }
}
