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

    const columnWidth = 120;
    const rowHeight = 55;

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={transition}
        >
            <motion.div className="hidden flex-col sm:flex" variants={staggerContainer}>
                <div className="flex">
                    {/* Columna fija de entidades */}
                    <div className="shrink-0 w-36 border-r">
                        <div className="h-[48px] border-b bg-muted" />
                        <div className="h-[736px] overflow-y-auto" id="location-scroll">
                            {locationList.map((location) => (
                                <div
                                    key={`label-${location.id}`}
                                    className="flex items-center justify-end pr-2 text-xs text-t-quaternary border-b"
                                    style={{ height: `${rowHeight}px` }}
                                >
                                    {location.name}
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
                                    gridTemplateColumns: `repeat(${timeSlots.length}, ${columnWidth}px)`,
                                    minWidth: `${timeSlots.length * columnWidth}px`,
                                    height: "48px",
                                }}
                            >
                                {timeSlots.map(({ hour, minute }, i) => {
                                    const show = timeSlotMinutes < 60 || minute === 0;
                                    return (
                                        <div
                                            key={`slot-header-${i}`}
                                            className="flex items-center justify-center text-xs font-medium text-t-quaternary border-r"
                                        >
                                            {show
                                                ? format(
                                                    new Date().setHours(hour, minute, 0, 0),
                                                    use24HourFormat ? "HH:mm" : "h:mm a"
                                                )
                                                : null}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Grilla de eventos con scroll vertical */}
                            <div
                                className="h-[736px] overflow-y-auto"
                                onScroll={(e) => {
                                    const target = e.currentTarget;
                                    const locationScroll = document.getElementById("location-scroll");
                                    if (locationScroll) {
                                        locationScroll.scrollTop = target.scrollTop;
                                    }
                                }}
                            >
                                <div className="flex flex-col">
                                    {locationList.map((location) => {
                                        const locationEvents = events.filter(
                                            (e) => e.location?.id === location.id
                                        );
                                        const groupedEvents = groupEvents(locationEvents);

                                        return (
                                            <div
                                                key={location.id}
                                                className="grid border-b border-border relative"
                                                style={{
                                                    gridTemplateColumns: `repeat(${timeSlots.length}, ${columnWidth}px)`,
                                                    minWidth: `${timeSlots.length * columnWidth}px`,
                                                    height: `${rowHeight}px`,
                                                }}
                                            >
                                                {/* Celdas droppables */}
                                                {timeSlots.map(({ hour, minute }) => (
                                                    <div
                                                        key={`${location.id}-${hour}-${minute}`}
                                                        className="relative border-r"
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
                                                                <div className="absolute inset-0 cursor-pointer transition-colors hover:bg-secondary/40" />
                                                            </AddEditEventDialog>
                                                        </DroppableArea>
                                                    </div>
                                                ))}

                                                {/* Eventos alineados por columna */}
                                                <RenderGroupedEventsInverted
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
            </motion.div>
        </motion.div>
    );
}
