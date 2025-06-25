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
    const { selectedDate, use24HourFormat, timeSlotMinutes } = useCalendar();
    const locationList = locations;
    const timeSlots = generateTimeSlots(timeSlotMinutes, 0, 24);
    const hourLabels = generateTimeSlots(60, 0, 24); // Para las etiquetas horarias

    const cellHeight = 96 / (60 / timeSlotMinutes); // Alto por slot

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={transition}
        >
            <motion.div
                className="flex flex-col items-center justify-center border-b py-4 text-sm text-t-quaternary sm:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
            >
                <p>Weekly view is not available on smaller devices.</p>
                <p>Please switch to daily or monthly view.</p>
            </motion.div>

            <motion.div className="hidden flex-col sm:flex" variants={staggerContainer}>
                {/* Header */}
                <motion.div
                    className="relative z-20 flex border-b"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={transition}
                >
                    <div className="w-18" />
                    <div
                        className="grid flex-1 border-l"
                        style={{
                            gridTemplateColumns: `repeat(${locationList.length}, minmax(0, 1fr))`,
                        }}
                    >
                        {locationList.map((location, index) => (
                            <motion.span
                                key={location.id}
                                className="py-2 text-center text-xs font-medium text-t-quaternary"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, ...transition }}
                            >
                                {location.name}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                <ScrollArea className="h-[736px]" type="always">
                    <div className="relative"> {/* 👈 Contenedor necesario para posicionar correctamente el timeline */}
                        <div className="flex">
                            {/* Columna de horas */}
                            <div className="relative w-18">
                                {hourLabels.map(({ hour }) => (
                                    <div
                                        key={`label-${hour}`}
                                        className="relative"
                                        style={{ height: "96px" }}
                                    >
                                        <span className="absolute -top-3 right-2 text-xs text-t-quaternary">
                                            {format(
                                                new Date().setHours(hour, 0, 0, 0),
                                                use24HourFormat ? "HH:mm" : "h a"
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Grilla */}
                            <div
                                className="relative flex-1 grid divide-x border-l"
                                style={{
                                    gridTemplateColumns: `repeat(${locationList.length}, minmax(0, 1fr))`,
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

                            <CalendarTimeline />
                        </div>
                    </div>
                </ScrollArea>

            </motion.div>
        </motion.div>
    );
}
