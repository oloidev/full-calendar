"use client";

import React from "react";
import { differenceInMinutes, parseISO } from "date-fns";
import { ICustomEvent } from "@/types/custom-event";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
// import { EventDetailsDialog } from "@/modules/calendar/components/dialogs/event-details-dialog";
// import { DraggableEvent } from "@/modules/calendar/components/dnd/draggable-event";
import { formatTime } from "@/modules/calendar/helpers";

interface Props {
    event: ICustomEvent;
}

export function CustomEventBlock({ event }: Props) {
    const { use24HourFormat } = useCalendar();

    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);
    const durationInMinutes = differenceInMinutes(end, start);
    const heightInPixels = (durationInMinutes / 60) * 96 - 8;

    return (
        // <EventDetailsDialog event={event}>
        //  <DraggableEvent event={event}>
        <div
            role="button"
            tabIndex={0}
            className="rounded-md border px-2 py-1.5 text-xs bg-blue-100 text-blue-700"
            style={{ height: `${heightInPixels}px` }}
        >
            <p className="font-semibold truncate">{event.title}</p>
            <p className="truncate">
                {formatTime(start, use24HourFormat)} - {formatTime(end, use24HourFormat)}
            </p>
            <p className="truncate">Dr: {event.provider.name}</p>
            <p className="truncate">Paciente: {event.patient.name}</p>
        </div>
        // </DraggableEvent>
        //</EventDetailsDialog>
    );
}
