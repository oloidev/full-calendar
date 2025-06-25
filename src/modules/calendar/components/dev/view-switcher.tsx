"use client";

import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { TCalendarView } from "../../types";

export function ViewSwitcher() {
    const { view, setView } = useCalendar();

    const views = [
        "day",
        "week",
        "month",
        "year",
        "agenda",
        "timelineLocation",
        "timelineProvider",
        "invertedLocation",
        "timeVprovider",
    ];

    return (
        <div className="p-2 bg-white shadow rounded border mb-2 flex items-center gap-2">
            <label htmlFor="view-selector" className="text-sm font-medium text-gray-700">
                Cambiar vista:
            </label>
            <select
                id="view-selector"
                value={view}
                onChange={(e) => setView(e.target.value as TCalendarView)}
                className="p-1 border rounded text-sm"
            >
                {views.map((v) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </select>
        </div>
    );
}
