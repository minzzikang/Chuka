package com.luckyseven.event.rollsheet.entity;

import com.luckyseven.event.rollsheet.entity.Event;
import com.luckyseven.event.rollsheet.entity.Font;
import com.luckyseven.event.rollsheet.entity.Shape;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "roll_sheet")
public class RollSheet {

    @Id
    private String rollSheetId;
    private Integer eventId;
    private String userId;
    private Shape shape;
    private String backgroundColor;
    private String content;
    private Font font;
    private String fontColor;
    private String backgroundImage;
    private String backgroundImageThumbnail;
    private String nickname;
    private LocalDateTime createTime;
}
