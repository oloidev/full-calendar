"use client";

import React from "react";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { motion } from "framer-motion";
import { fadeIn, transition } from "@/modules/calendar/animations";
import { AgendaEvents } from "@/modules/calendar/components/agenda-view/agenda-events";
import { CalendarMonthView } from "@/modules/calendar/components/month-view/calendar-month-view";
import { CalendarWeekView } from "@/modules/calendar/components/week-and-day-view/calendar-week-view";
import { CalendarDayView } from "@/modules/calendar/components/week-and-day-view/calendar-day-view";
import { CalendarYearView } from "@/modules/calendar/components/year-view/calendar-year-view";
import { isSameDay, parseISO } from "date-fns";
import { TimelineLocationView } from "@/modules/calendar/components/timeline-view/views/TimelineLocationView";
import { mockLocations, mockProviders } from "../mocks/mock-data";
import { TimelineProviderView } from "./timeline-view/views/TimelineProviderView";


export function CalendarBody() {
    const { view } = useCalendar();

    const { events } = useCalendar();

    const singleDayEvents = events.filter((event) => {
        const startDate = parseISO(event.startDate);
        const endDate = parseISO(event.endDate);
        return isSameDay(startDate, endDate);
    });

    const multiDayEvents = events.filter((event) => {
        const startDate = parseISO(event.startDate);
        const endDate = parseISO(event.endDate);
        return !isSameDay(startDate, endDate);
    });

    console.log("📦 Eventos renderizados", singleDayEvents);

    return (
        <div className='w-full h-full overflow-scroll relative'>
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
                {
                    view === "agenda" && (
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
                    )
                }
                {view === "timelineLocation" && (
                    <TimelineLocationView
                        events={singleDayEvents}
                        locations={mockLocations}
                    />
                )}
                {view === "timelineProvider" && (
                    <TimelineProviderView
                        events={singleDayEvents}
                        providers={mockProviders}
                    />
                )
                }
            </motion.div>
        </div>
    );
}