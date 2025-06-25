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
// import { CalendarTimeline } from "@/modules/calendar/components/week-and-day-view/calendar-time-line";
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
    const { selectedDate, use24HourFormat } = useCalendar();
    const locationList = locations;
    const hourLabels = generateTimeSlots(60, 0, 24);

    const columnWidth = 120;
    const rowHeight = 112;

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={transition}
        >
            <motion.div className="hidden flex-col sm:flex" variants={staggerContainer}>
                {/* Header de horas */}
                <motion.div className="relative z-20 flex border-b bg-muted">
                    <div className="w-36" /> {/* espacio para nombres de entidades */}
                    <div
                        className="grid flex-1 border-l"
                        style={{
                            gridTemplateColumns: `repeat(${hourLabels.length}, ${columnWidth}px)`,
                        }}
                    >
                        {hourLabels.map(({ hour }, index) => (
                            <motion.span
                                key={`hour-${hour}`}
                                className="py-2 text-center text-xs font-medium text-t-quaternary"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.01, ...transition }}
                            >
                                {format(
                                    new Date().setHours(hour, 0, 0, 0),
                                    use24HourFormat ? "HH:mm" : "h a"
                                )}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                <ScrollArea className="h-[736px]" type="always">
                    <div className="relative">
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
                                        style={{ height: `${rowHeight}px` }}
                                    >
                                        {/* Nombre del location */}
                                        <div className="w-36 flex items-center justify-end pr-2 text-xs text-t-quaternary">
                                            {location.name}
                                        </div>

                                        {/* Grilla de horas */}
                                        <div
                                            className="relative grid flex-1 divide-x border-l"
                                            style={{
                                                gridTemplateColumns: `repeat(${hourLabels.length}, ${columnWidth}px)`,
                                            }}
                                        >
                                            {hourLabels.map(({ hour }) => (
                                                <div key={`${location.id}-${hour}`} className="relative">
                                                    <DroppableArea
                                                        date={selectedDate}
                                                        hour={hour}
                                                        minute={0}
                                                        entityId={location.id}
                                                        className="absolute inset-0"
                                                    >
                                                        <AddEditEventDialog
                                                            startDate={selectedDate}
                                                            startTime={{ hour, minute: 0 }}
                                                            entity={location}
                                                            entityType="location"
                                                        >
                                                            <div className="absolute inset-0 cursor-pointer transition-colors hover:bg-secondary/40" />
                                                        </AddEditEventDialog>
                                                    </DroppableArea>
                                                </div>
                                            ))}

                                            {/* Renderizado de eventos */}
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
