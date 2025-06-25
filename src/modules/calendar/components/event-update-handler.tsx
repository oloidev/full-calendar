"use client";

import { ICustomEvent } from "@/types/custom-event";
import { useDragDrop } from "@/modules/calendar/contexts/drag-drop-context";
import { useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";

export function EventUpdateHandler() {
    const { setOnEventDropped } = useDragDrop();
    const { updateEvent } = useCalendar();

    const handleEventUpdate = useCallback((event: ICustomEvent) => {
        try {
            const updatedEvent = {
                ...event,
            };

            updateEvent(updatedEvent);
            toast.success("Event updated successfully");
        } catch {
            toast.error("Failed to update event");
        }
    }, [updateEvent]);

    useEffect(() => {
        setOnEventDropped(handleEventUpdate);
    }, [setOnEventDropped, handleEventUpdate]);

    return null;
}
