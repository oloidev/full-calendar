"use client";

import React from "react";
import { ICustomEvent } from "@/types/custom-event";
import { TimeGrid } from "@/modules/calendar/components/common/TimeGrid";
import { RenderGroupedEvents } from "@/modules/calendar/components/timeline-view/RenderGroupedEvents";
import { groupEventsByEntityAndTime } from "@/modules/calendar/utils/groupEventsByEntityAndTime";
import { Entity } from "@/modules/calendar/types";

interface TimelineBaseViewProps {
    events: ICustomEvent[];
    entities: Entity[];
    entityType: "location" | "provider";
    timeSlotMinutes: number;
}

export function TimelineBaseView({
    events,
    entities,
    entityType,
    timeSlotMinutes,
}: TimelineBaseViewProps) {
    const grouped = groupEventsByEntityAndTime(events, entities, entityType);

    return (
        <div className="relative w-full h-full overflow-auto">
            {/* Header con nombres de entidades */}
            <div
                className="grid sticky top-0 z-10 bg-background border-b"
                style={{ gridTemplateColumns: `80px repeat(${entities.length}, 1fr)` }}
            >
                <div className="bg-muted text-sm p-2 border-r">Hora</div>
                {entities.map((e) => (
                    <div
                        key={e.id}
                        className="bg-muted text-sm p-2 border-r text-center font-medium"
                    >
                        {e.name}
                    </div>
                ))}
            </div>

            {/* Grilla de tiempo y eventos */}
            <div className="grid" style={{ gridTemplateColumns: `80px repeat(${entities.length}, 1fr)` }}>
                <TimeGrid timeSlotMinutes={timeSlotMinutes} />
                {entities.map((entity) => (
                    <div key={entity.id} className="relative">
                        <RenderGroupedEvents
                            events={grouped[entity.id] || []}
                            entityId={entity.id}
                            timeSlotMinutes={timeSlotMinutes}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
