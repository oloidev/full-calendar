"use client";

import React, { createContext, useContext, useState } from "react";
import type { ICustomEvent } from "@/types/custom-event";
import { TProvider } from "../mocks/types";
import { TCalendarView } from "@/modules/calendar/types";
import { useLocalStorage } from "@/modules/calendar/hooks";

interface ICalendarContext {
    selectedDate: Date;
    view: TCalendarView;
    setView: (view: TCalendarView) => void;
    agendaModeGroupBy: "date" | "color";
    setAgendaModeGroupBy: (groupBy: "date" | "color") => void;
    use24HourFormat: boolean;
    toggleTimeFormat: () => void;
    setSelectedDate: (date: Date | undefined) => void;
    selectedUserId: TProvider["id"] | "all";
    setSelectedUserId: (userId: TProvider["id"] | "all") => void;
    badgeVariant: "dot" | "colored";
    setBadgeVariant: (variant: "dot" | "colored") => void;
    filterEventsBySelectedUser: (userId: TProvider["id"] | "all") => void;
    users: TProvider[];
    events: ICustomEvent[];
    addEvent: (event: ICustomEvent) => void;
    updateEvent: (event: ICustomEvent) => void;
    removeEvent: (eventId: number) => void;
    clearFilter: () => void;
}

interface CalendarSettings {
    badgeVariant: "dot" | "colored";
    view: TCalendarView;
    use24HourFormat: boolean;
    agendaModeGroupBy: "date" | "color";
}

const DEFAULT_SETTINGS: CalendarSettings = {
    badgeVariant: "colored",
    view: "timelineLocation",
    use24HourFormat: true,
    agendaModeGroupBy: "date",
};

const CalendarContext = createContext({} as ICalendarContext);

export function CalendarProvider({
    children,
    users,
    events,
    badge = "colored",
    view = "day",
}: {
    children: React.ReactNode;
    users: TProvider[];
    events: ICustomEvent[];
    view?: TCalendarView;
    badge?: "dot" | "colored";
}) {
    const [settings, setSettings] = useLocalStorage<CalendarSettings>("calendar-settings", {
        ...DEFAULT_SETTINGS,
        badgeVariant: badge,
        view: view,
    });

    const [badgeVariant, setBadgeVariantState] = useState<"dot" | "colored">(settings.badgeVariant);
    const [currentView, setCurrentViewState] = useState<TCalendarView>(settings.view);
    const [use24HourFormat, setUse24HourFormatState] = useState<boolean>(settings.use24HourFormat);
    const [agendaModeGroupBy, setAgendaModeGroupByState] = useState<"date" | "color">(settings.agendaModeGroupBy);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedUserId, setSelectedUserId] = useState<TProvider["id"] | "all">("all");

    const [allEvents, setAllEvents] = useState<ICustomEvent[]>(events || []);
    const [filteredEvents, setFilteredEvents] = useState<ICustomEvent[]>(events || []);

    const updateSettings = (newPartialSettings: Partial<CalendarSettings>) => {
        setSettings({
            ...settings,
            ...newPartialSettings,
        });
    };

    const setBadgeVariant = (variant: "dot" | "colored") => {
        setBadgeVariantState(variant);
        updateSettings({ badgeVariant: variant });
    };

    const setView = (newView: TCalendarView) => {
        setCurrentViewState(newView);
        updateSettings({ view: newView });
    };

    const toggleTimeFormat = () => {
        const newValue = !use24HourFormat;
        setUse24HourFormatState(newValue);
        updateSettings({ use24HourFormat: newValue });
    };

    const setAgendaModeGroupBy = (groupBy: "date" | "color") => {
        setAgendaModeGroupByState(groupBy);
        updateSettings({ agendaModeGroupBy: groupBy });
    };

    const filterEventsBySelectedUser = (userId: TProvider["id"] | "all") => {
        setSelectedUserId(userId);
        if (userId === "all") {
            setFilteredEvents(allEvents);
        } else {
            const filtered = allEvents.filter((event) => event.provider?.id === userId);
            setFilteredEvents(filtered);
        }
    };

    const handleSelectDate = (date: Date | undefined) => {
        if (!date) return;
        setSelectedDate(date);
    };

    const addEvent = (event: ICustomEvent) => {
        setAllEvents((prev) => [...prev, event]);
        setFilteredEvents((prev) => [...prev, event]);
    };

    const updateEvent = (updatedEvent: ICustomEvent) => {
        setAllEvents((prev) =>
            prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
        );
        setFilteredEvents((prev) =>
            prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
        );
    };

    const removeEvent = (eventId: number) => {
        setAllEvents((prev) => prev.filter((e) => e.id !== eventId));
        setFilteredEvents((prev) => prev.filter((e) => e.id !== eventId));
    };

    const clearFilter = () => {
        setFilteredEvents(allEvents);
        setSelectedUserId("all");
    };

    const value = {
        selectedDate,
        setSelectedDate: handleSelectDate,
        selectedUserId,
        setSelectedUserId,
        badgeVariant,
        setBadgeVariant,
        users,
        filterEventsBySelectedUser,
        events: filteredEvents,
        view: currentView,
        use24HourFormat,
        toggleTimeFormat,
        setView,
        agendaModeGroupBy,
        setAgendaModeGroupBy,
        addEvent,
        updateEvent,
        removeEvent,
        clearFilter,
    };

    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar(): ICalendarContext {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("useCalendar must be used within a CalendarProvider.");
    }
    return context;
}
