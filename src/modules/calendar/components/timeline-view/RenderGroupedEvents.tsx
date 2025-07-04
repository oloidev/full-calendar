"use client";

import React from "react";
import { ICustomEvent } from "@/types/custom-event";
import { getEventBlockStyleForTimeline } from "@/modules/calendar/helpers/getEventBlockStyleForTimeline";
import { CustomEventBlock } from "@/modules/calendar/components/timeline-view/CustomEventBlock";

export interface RenderGroupedEventsProps {
    events: ICustomEvent[];
    entityId: string;
}

export const RenderGroupedEvents = ({
    events = [],
}: RenderGroupedEventsProps) => {
    return (
        <>
            {events.map((event) => {
                const style = getEventBlockStyleForTimeline(event);
                return (
                    <div key={event.id} className="absolute w-full px-1" style={style}>
                        <CustomEventBlock event={event} />
                    </div>
                );
            })}
        </>
    );
};
