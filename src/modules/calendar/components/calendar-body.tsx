"use client";

import React from "react";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { motion } from "framer-motion";
import { fadeIn, transition } from "@/modules/calendar/animations";
import { isSameDay, parseISO } from "date-fns";
import { TimelineLocationView } from "@/modules/calendar/components/timeline-view/views/TimelineLocationView";
import { mockLocations, mockProviders } from "../mocks/mock-data";
import { TimelineProviderView } from "./timeline-view/views/TimelineProviderView";
import { InvertedLocationView } from "./timeline-Inverted-view/views/InvertedLocationView";


export function CalendarBody() {
    const { view } = useCalendar();

    const { events } = useCalendar();

    const singleDayEvents = events.filter((event) => {
        const startDate = parseISO(event.startDate);
        const endDate = parseISO(event.endDate);
        return isSameDay(startDate, endDate);
    });

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
                {view === "invertedLocation" && (
                    <InvertedLocationView
                        events={singleDayEvents}
                        locations={mockLocations}
                    />
                )}
                {/* {view === "invertedProvider" && (
                    <InvertedProviderView
                        events={singleDayEvents}
                        providers={mockProviders}
                    />
                )} */}
            </motion.div>
        </div>
    );
}