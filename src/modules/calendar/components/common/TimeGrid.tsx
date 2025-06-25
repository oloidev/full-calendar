"use client";

import React from "react";
import { format, setMinutes, setHours } from "date-fns";

interface Props {
    timeSlotMinutes: number;
}

export function TimeGrid({ timeSlotMinutes }: Props) {
    const startHour = 7; // puedes parametrizarlo luego
    const endHour = 18;
    const timeSlots: Date[] = [];

    for (let hour = startHour; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += timeSlotMinutes) {
            timeSlots.push(setMinutes(setHours(new Date(), hour), min));
        }
    }

    return (
        <div className="flex flex-col border-r bg-background">
            {timeSlots.map((time, index) => (
                <div
                    key={index}
                    className="h-[60px] border-b text-xs text-muted-foreground px-2 py-1"
                >
                    {format(time, "HH:mm")}
                </div>
            ))}
        </div>
    );
}
