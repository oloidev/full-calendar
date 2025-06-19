"use client";

import React from "react";
import { IEvent } from "@/modules/calendar/interfaces";

interface TimelineViewProps {
    rows: string[]; // Las horas en orden vertical
    columns: string[]; // Las entidades que van en la primera fila (rooms o providers)
    events: IEvent[];
    getRowId: (event: IEvent) => string;
    getColumnId: (event: IEvent) => string;
}

export function TimelineView({
    rows,
    columns,
    events,
    getRowId,
    getColumnId,
}: TimelineViewProps) {
    return (
        <div className="overflow-auto w-full h-full border border-gray-200 rounded-md">
            {/* Header */}
            <div className="grid" style={{ gridTemplateColumns: `120px repeat(${columns.length}, 1fr)` }}>
                <div className="bg-gray-100 p-2 font-bold">Hora</div>
                {columns.map((col, index) => (
                    <div key={index} className="bg-gray-100 p-2 text-center font-bold border-l border-gray-300">
                        {col}
                    </div>
                ))}
            </div>

            {/* Rows */}
            {rows.map((row) => (
                <div key={row} className="grid border-t border-gray-300" style={{ gridTemplateColumns: `120px repeat(${columns.length}, 1fr)` }}>
                    <div className="bg-gray-50 p-2 font-medium border-r border-gray-300">{row}</div>
                    {columns.map((col) => {
                        const cellEvents = events.filter(
                            (e) => getRowId(e) === row && getColumnId(e) === col
                        );

                        return (
                            <div key={col} className="border-l border-gray-200 min-h-[60px] p-1">
                                {cellEvents.map((event) => (
                                    <div key={event.id} className={`rounded p-1 text-xs text-white bg-${event.color}-500`}>
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
