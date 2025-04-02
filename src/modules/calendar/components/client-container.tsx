"use client";

import { isSameDay, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { fadeIn, transition } from "@/modules/calendar/animations";

import { CalendarHeader } from "@/modules/calendar/components/header/calendar-header";
import { CalendarMonthView } from "@/modules/calendar/components/month-view/calendar-month-view";
import { CalendarDayView } from "@/modules/calendar/components/week-and-day-view/calendar-day-view";
import { CalendarWeekView } from "@/modules/calendar/components/week-and-day-view/calendar-week-view";
import { AgendaEvents } from "@/modules/calendar/components/agenda-view/agenda-events";
import {EventUpdateHandler} from "@/modules/calendar/components/event-update-handler";
import {IEvent} from "@/modules/calendar/interfaces";
import {toast} from "sonner";
import {CalendarYearView} from "@/modules/calendar/components/year-view/calendar-year-view";

export function ClientContainer() {
  const { selectedDate, view, isAgendaMode, selectedUserId, events , updateEvent} =
    useCalendar();

  const filteredEvents = events.filter((event) => {
    const itemStartDate = new Date(event.startDate);
    const itemEndDate = new Date(event.endDate);

    const monthStart = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const monthEnd = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );

    const isInSelectedMonth =
      itemStartDate <= monthEnd && itemEndDate >= monthStart;
    const isUserMatch =
      selectedUserId === "all" || event.user.id === selectedUserId;
    return isInSelectedMonth && isUserMatch;
  });

  const singleDayEvents = filteredEvents.filter((event) => {
    const startDate = parseISO(event.startDate);
    const endDate = parseISO(event.endDate);
    return isSameDay(startDate, endDate);
  });

  const multiDayEvents = filteredEvents.filter((event) => {
    const startDate = parseISO(event.startDate);
    const endDate = parseISO(event.endDate);
    return !isSameDay(startDate, endDate);
  });

  const handleEventUpdate = (event: IEvent, newStartDate: Date, newEndDate: Date) => {
    // Create a new event with updated dates
    try {
      const updatedEvent = {
        ...event,
        startDate: newStartDate.toISOString(),
        endDate: newEndDate.toISOString(),
      };

      updateEvent(updatedEvent);
      toast.success("Event updated successfully");
    }catch {
        toast.error("Failed to update event");
    }

    // Update the event in your state or API
    // This will depend on how your app manages events
    // For example:
    // updateEvent(updatedEvent);

    // For now, let's just log it
  };

  return (
    <motion.div
      className="rounded-xl border"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      transition={transition}
    >
      <EventUpdateHandler onEventUpdate={handleEventUpdate} />
      <CalendarHeader events={filteredEvents} />
      <AnimatePresence mode="wait">
        {isAgendaMode ? (
          <motion.div
            key="agenda"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={transition}
          >
            <AgendaEvents />
          </motion.div>
        ) : (
          <motion.div
            key={view}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={transition}
          >
            {view === "month" && (
              <CalendarMonthView
                singleDayEvents={singleDayEvents}
                multiDayEvents={multiDayEvents}
              />
            )}
            {view === "week" && (
              <CalendarWeekView
                singleDayEvents={singleDayEvents}
                multiDayEvents={multiDayEvents}
              />
            )}
            {view === "day" && (
              <CalendarDayView
                singleDayEvents={singleDayEvents}
                multiDayEvents={multiDayEvents}
              />
            )}
            {view === "year" && (
              <CalendarYearView
                singleDayEvents={singleDayEvents}
                multiDayEvents={multiDayEvents}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
