"use client";

import React from "react";
import { IEvent } from "@/modules/calendar/interfaces";

interface KanbanViewProps {
    rows: string[]; // Locations o Providers
    columns: string[]; // Time slots 
    events: IEvent[];
    getRowId: (event: IEvent) => string;
    getColumnId: (event: IEvent) => string;
}

export function TimelineInvertedGrid({
    rows,
    columns,
    events,
    getRowId,
    getColumnId,
}: KanbanViewProps) {
    return (
        <div className="overflow-auto border rounded-xl">
            {/* Header */}
            <div className="grid" style={{ gridTemplateColumns: `200px repeat(${columns.length}, 1fr)` }}>
                <div className="bg-gray-100 p-2 font-bold">Entidad</div>
                {columns.map((col, index) => (
                    <div key={index} className="bg-gray-100 p-2 text-center font-bold border-l border-gray-300">
                        {col}
                    </div>
                ))}
            </div>

            {/* Body */}
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid border-t" style={{ gridTemplateColumns: `200px repeat(${columns.length}, 1fr)` }}>
                    <div className="bg-gray-50 p-2 border-r font-medium">{row}</div>
                    {columns.map((col, colIndex) => {
                        const cellEvents = events.filter(
                            (e) => getRowId(e) === row && getColumnId(e) === col
                        );

                        return (
                            <div key={colIndex} className="border-l p-1 min-h-[60px]">
                                {cellEvents.map((event) => (
                                    <div key={event.id} className={`bg-${event.color}-500 text-white text-xs p-1 rounded`}>
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
