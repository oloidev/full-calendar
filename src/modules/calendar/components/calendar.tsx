"use client";

import React from "react";
import { CalendarProvider } from "@/modules/calendar/contexts/calendar-context";
import { CalendarHeader } from "@/modules/calendar/components/header/calendar-header";
import { CalendarBody } from "@/modules/calendar/components/calendar-body";
import { EventUpdateHandler } from "@/modules/calendar/components/event-update-handler";
import { DragDropProvider } from "@/modules/calendar/contexts/drag-drop-context";
import { mockProviders } from "@/modules/calendar/mocks/mock-data";
import { mockEvents } from "@/modules/calendar/mocks/mock-events";

export function Calendar() {
    return (
        <DragDropProvider>
            <CalendarProvider events={mockEvents} users={mockProviders} view="timelineLocation">
                <div className="w-full border rounded-xl">
                    <EventUpdateHandler />
                    <CalendarHeader />
                    <CalendarBody />
                </div>
            </CalendarProvider>
        </DragDropProvider>
    );
}
