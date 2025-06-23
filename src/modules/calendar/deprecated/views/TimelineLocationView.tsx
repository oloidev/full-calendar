"use client";

import React from "react";
import { TimelineBaseView } from "@/modules/calendar/deprecated/TimelineBaseView";
import { mockLocations } from "@/modules/calendar/mocks/mock-data";
import { mockEvents } from "@/modules/calendar/mocks/mock-events";
import { ICustomEvent } from "@/types/custom-event";

export function TimelineLocationView() {
    const events: ICustomEvent[] = mockEvents;

    return (
        <TimelineBaseView
            entities={mockLocations}
            events={events}
            entityType="location"
            timeSlotMinutes={30}
        />
    );
}
