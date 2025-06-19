"use client";

import { KanbanView } from "@/modules/calendar/components/kanban-view/KanbanView";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { useMemo } from "react";

// Simula slots de 8 AM a 6 PM (por hora)
const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 8; hour <= 18; hour++) {
        slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    return slots;
};

export function KanbanLocationVsTime() {
    const { events } = useCalendar();

    const locations = useMemo(() => {
        const uniqueLocations = new Set(events.map((e) => e.user.name)); // <- aquí deberías usar e.location si existe
        return Array.from(uniqueLocations);
    }, [events]);

    const timeSlots = useMemo(() => generateTimeSlots(), []);

    return (
        <KanbanView
            rows={locations}
            columns={timeSlots}
            events={events}
            getRowId={(event) => event.user.name} // <- luego cambiar a event.location.name si existe
            getColumnId={(event) => {
                const date = new Date(event.startDate);
                return `${date.getHours().toString().padStart(2, "0")}:00`;
            }}
        />
    );
}
