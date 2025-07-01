"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";

import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import {
    fadeIn,
    staggerContainer,
    transition,
} from "@/modules/calendar/animations";

import { AddEditEventDialog } from "@/modules/calendar/components/dialogs/add-edit-event-dialog";
import { CalendarTimeline } from "@/modules/calendar/components/week-and-day-view/calendar-time-line";
import { groupEvents } from "@/modules/calendar/helpers";
import type { ICustomEvent } from "@/types/custom-event";
import { RenderGroupedEvents } from "@/modules/calendar/components/week-and-day-view/render-grouped-events";
import { DroppableArea } from "@/modules/calendar/components/dnd/droppable-area";
import { TLocation } from "../../../mocks/types";
import { generateTimeSlots } from "@/modules/calendar/utils/timeSlots";

interface IProps {
    events: ICustomEvent[];
    locations: TLocation[];
}

export function TimelineLocationView({ events, locations }: IProps) {
    const {
        selectedDate,
        use24HourFormat,
        timeSlotMinutes: rawSlot,
    } = useCalendar();

    const timeSlotMinutes = Number(rawSlot);
    const locationList = locations;
    const timeSlots = generateTimeSlots(timeSlotMinutes, 0, 24);

    const cellHeight = 96;
    const columnWidth = 180;

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={transition}
        >
            {/* Mensaje solo para móviles */}
            <motion.div
                className="flex flex-col items-center justify-center border-b py-4 text-sm text-t-quaternary sm:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
            >
                <p>Weekly view is not available on smaller devices.</p>
                <p>Please switch to daily or monthly view.</p>
            </motion.div>

            {/* Desktop calendar */}
            <motion.div className="hidden flex-col sm:flex" variants={staggerContainer}>
                <div className="flex">
                    {/* Columna fija de horas */}
                    <div className="shrink-0 w-18 border-r">
                        <div className="h-[48px] border-b bg-muted" />
                        <div className="h-[736px] overflow-y-auto" id="hour-scroll">
                            {timeSlots.map(({ hour, minute }) => (
                                <div
                                    key={`label-${hour}-${minute}`}
                                    className="relative"
                                    style={{ height: `${cellHeight}px` }}
                                >
                                    <span className="absolute -top-3 right-2 text-xs text-t-quaternary">
                                        {format(
                                            new Date().setHours(hour, minute, 0, 0),
                                            use24HourFormat ? "HH:mm" : "h:mm a"
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contenedor scroll horizontal + vertical sincronizado */}
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-fit">
                            {/* Fila de encabezados fija */}
                            <div
                                className="sticky top-0 z-10 grid border-b bg-muted"
                                style={{
                                    gridTemplateColumns: `repeat(${locationList.length}, ${columnWidth}px)`,
                                    minWidth: `${locationList.length * columnWidth}px`,
                                    height: "48px",
                                }}
                            >
                                {locationList.map((location, index) => (
                                    <motion.div
                                        key={location.id}
                                        className="flex items-center justify-center text-xs font-medium text-t-quaternary border-r"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, ...transition }}
                                    >
                                        {location.name}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Grilla con scroll vertical sincronizado */}
                            <div
                                className="h-[736px] overflow-y-auto relative"
                                onScroll={(e) => {
                                    const target = e.currentTarget;
                                    const hourScroll = document.getElementById("hour-scroll");
                                    if (hourScroll) {
                                        hourScroll.scrollTop = target.scrollTop;
                                    }
                                }}
                            >
                                <div className="relative">
                                    {/* Timeline sobre la grilla */}
                                    <div className="absolute top-0 left-0 h-full z-30 pointer-events-none">
                                        <CalendarTimeline />
                                    </div>

                                    {/* Grilla de columnas */}
                                    <div
                                        className="grid divide-x border-l"
                                        style={{
                                            gridTemplateColumns: `repeat(${locationList.length}, ${columnWidth}px)`,
                                            minWidth: `${locationList.length * columnWidth}px`,
                                        }}
                                    >
                                        {locationList.map((location) => {
                                            const locationEvents = events.filter(
                                                (e) => e.location?.id === location.id
                                            );
                                            const groupedEvents = groupEvents(locationEvents);

                                            return (
                                                <div key={location.id} className="relative">
                                                    {timeSlots.map(({ hour, minute }) => (
                                                        <div
                                                            key={`${hour}-${minute}`}
                                                            className="relative border-b border-border"
                                                            style={{ height: `${cellHeight}px` }}
                                                        >
                                                            <DroppableArea
                                                                date={selectedDate}
                                                                hour={hour}
                                                                minute={minute}
                                                                entityId={location.id}
                                                                className="w-full h-full"
                                                            >
                                                                <AddEditEventDialog
                                                                    startDate={selectedDate}
                                                                    startTime={{ hour, minute }}
                                                                    entity={location}
                                                                    entityType="location"
                                                                >
                                                                    <div className="absolute inset-0 cursor-pointer transition-colors hover:bg-secondary" />
                                                                </AddEditEventDialog>
                                                            </DroppableArea>
                                                        </div>
                                                    ))}

                                                    <RenderGroupedEvents
                                                        groupedEvents={groupedEvents}
                                                        day={selectedDate}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
