"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";

import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import {
    fadeIn,
    staggerContainer,
    transition,
} from "@/modules/calendar/animations";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AddEditEventDialog } from "@/modules/calendar/components/dialogs/add-edit-event-dialog";
import { groupEvents } from "@/modules/calendar/helpers";
import type { ICustomEvent } from "@/types/custom-event";
import { RenderGroupedEventsInverted } from "@/modules/calendar/components/timeline-Inverted-view/render-grouped-events-inverted";
import { DroppableArea } from "@/modules/calendar/components/dnd/droppable-area";
import { TLocation } from "../../../mocks/types";
import { generateTimeSlots } from "@/modules/calendar/utils/timeSlots";

interface IProps {
    events: ICustomEvent[];
    locations: TLocation[];
}

export function InvertedLocationView({ events, locations }: IProps) {
    const {
        selectedDate,
        use24HourFormat,
        timeSlotMinutes,
    } = useCalendar();

    const locationList = locations;

    const timeSlots = generateTimeSlots(timeSlotMinutes, 0, 24);
    const hourLabels = generateTimeSlots(60, 0, 24); // una por hora

    const columnWidth = 120;
    const rowHeight = 112;

    const slotsPerHour = 60 / timeSlotMinutes;

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={transition}
        >
            <motion.div className="hidden flex-col sm:flex" variants={staggerContainer}>
                <ScrollArea className="h-[736px]" type="always">
                    <div className="w-full min-w-fit">
                        {/* Header de horas */}
                        <div className="relative flex border-b bg-muted z-20">
                            <div className="w-36" />
                            <div
                                className="grid flex-1 border-l"
                                style={{
                                    gridTemplateColumns: `repeat(${timeSlots.length}, ${columnWidth}px)`,
                                    minWidth: `${timeSlots.length * columnWidth}px`,
                                }}
                            >
                                {hourLabels.map(({ hour }, i) => (
                                    <div
                                        key={`hour-${hour}`}
                                        className="flex items-center justify-center text-xs font-medium text-t-quaternary py-2 h-[48px] border-r"
                                        style={{
                                            gridColumnStart: i * slotsPerHour + 1,
                                            gridColumnEnd: `span ${1}`,
                                        }}
                                    >
                                        {format(
                                            new Date().setHours(hour, 0, 0, 0),
                                            use24HourFormat ? "HH:mm" : "h a"
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cuerpo de grilla */}
                        <div className="flex flex-col">
                            {locationList.map((location) => {
                                const locationEvents = events.filter(
                                    (e) => e.location?.id === location.id
                                );
                                const groupedEvents = groupEvents(locationEvents);

                                return (
                                    <div
                                        key={location.id}
                                        className="relative flex border-b border-border"
                                        style={{
                                            height: `${rowHeight}px`,
                                            minWidth: `${timeSlots.length * columnWidth}px`,
                                        }}
                                    >
                                        <div className="w-36 flex items-center justify-end pr-2 text-xs text-t-quaternary">
                                            {location.name}
                                        </div>
                                        <div
                                            className="relative grid flex-1 divide-x border-l"
                                            style={{
                                                gridTemplateColumns: `repeat(${timeSlots.length}, ${columnWidth}px)`,
                                            }}
                                        >
                                            {timeSlots.map(({ hour, minute }) => (
                                                <div
                                                    key={`${location.id}-${hour}-${minute}`}
                                                    className="relative"
                                                >
                                                    <DroppableArea
                                                        date={selectedDate}
                                                        hour={hour}
                                                        minute={minute}
                                                        entityId={location.id}
                                                        className="absolute inset-0"
                                                    >
                                                        <AddEditEventDialog
                                                            startDate={selectedDate}
                                                            startTime={{ hour, minute }}
                                                            entity={location}
                                                            entityType="location"
                                                        >
                                                            <div className="absolute inset-0 cursor-pointer transition-colors hover:bg-secondary/40" />
                                                        </AddEditEventDialog>
                                                    </DroppableArea>
                                                </div>
                                            ))}
                                            <RenderGroupedEventsInverted
                                                groupedEvents={groupedEvents}
                                                day={selectedDate}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </ScrollArea>
            </motion.div>
        </motion.div>
    );
}
