"use client";

import { createContext, useContext, useState, useCallback } from "react";

import type { IEvent, IUser } from "@/modules/calendar/interfaces";
import { TCalendarView, TEventColor } from "@/modules/calendar/types";

interface ICalendarContext {
  selectedDate: Date;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  isAgendaMode: boolean;
  toggleAgendaMode: (isAgenda?: boolean) => void;
  setSelectedDate: (date: Date | undefined) => void;
  selectedUserId: IUser["id"] | "all";
  setSelectedUserId: (userId: IUser["id"] | "all") => void;
  badgeVariant: "dot" | "colored";
  setBadgeVariant: (variant: "dot" | "colored") => void;
  filterEventsByColor: (color: TEventColor) => void;
  users: IUser[];
  events: IEvent[];
  addEvent: (event: IEvent) => void;
  resetFilter: () => void;
}

const CalendarContext = createContext({} as ICalendarContext);

export function CalendarProvider({
  children,
  users,
  events,
  badge = "colored",
  view = "day",
}: {
  children: React.ReactNode;
  users: IUser[];
  events: IEvent[];
  view?: "day" | "week" | "month";
  badge?: "dot" | "colored";
}) {
  const [badgeVariant, setBadgeVariant] = useState<"dot" | "colored">(badge);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUserId, setSelectedUserId] = useState<IUser["id"] | "all">(
    "all"
  );
  const [currentView, setCurrentView] = useState(view);
  const [isAgendaMode, setAgendaMode] = useState(false);
  const [data, setData] = useState(events || []);

  const filterEventsByColor = (color: TEventColor) => {
    setData(events.filter((event) => event.color === color));
  };

  const toggleAgendaMode = (isAgenda?: boolean) => {
    const newMode = isAgenda ?? !isAgendaMode;
    if (!newMode) {
      setCurrentView(view);
    }
    setAgendaMode(newMode);
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const setView = (view: "day" | "week" | "month") => {
    setCurrentView(view);
  };

  const addEvent = (event: IEvent) => {
    setData((prevEvents) => [...prevEvents, event]);
  };

  const resetFilter = () => {
    setData(events);
  };

  const value = {
    selectedDate,
    setSelectedDate: handleSelectDate,
    selectedUserId,
    setSelectedUserId,
    badgeVariant,
    setBadgeVariant,
    users,
    filterEventsByColor,
    events: data,
    view: currentView,
    setView,
    isAgendaMode,
    toggleAgendaMode,
    addEvent,
    resetFilter,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within a CalendarProvider.");
  return context;
}
