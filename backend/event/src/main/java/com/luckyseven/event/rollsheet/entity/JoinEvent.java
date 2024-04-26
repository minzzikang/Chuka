package com.luckyseven.event.rollsheet.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class JoinEvent {

    @EmbeddedId
    private JoinEventPk joinEventPK;

}
