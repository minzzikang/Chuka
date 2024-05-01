package com.luckyseven.event.rollsheet.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QEvent is a Querydsl query type for Event
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEvent extends EntityPathBase<Event> {

    private static final long serialVersionUID = 1215577515L;

    public static final QEvent event = new QEvent("event");

    public final StringPath banner = createString("banner");

    public final StringPath bannerThumbnail = createString("bannerThumbnail");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final DatePath<java.time.LocalDate> date = createDate("date", java.time.LocalDate.class);

    public final NumberPath<Integer> eventId = createNumber("eventId", Integer.class);

    public final StringPath pageUri = createString("pageUri");

    public final EnumPath<Theme> theme = createEnum("theme", Theme.class);

    public final StringPath title = createString("title");

    public final EnumPath<EventType> type = createEnum("type", EventType.class);

    public final StringPath userId = createString("userId");

    public final BooleanPath visibility = createBoolean("visibility");

    public QEvent(String variable) {
        super(Event.class, forVariable(variable));
    }

    public QEvent(Path<? extends Event> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEvent(PathMetadata metadata) {
        super(Event.class, metadata);
    }

}

