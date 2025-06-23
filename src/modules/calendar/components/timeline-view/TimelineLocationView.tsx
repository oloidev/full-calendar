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
import { TLocation } from "../../mocks/types";

interface IProps {
    events: ICustomEvent[];
    locations: TLocation[];
}

export function TimelineLocationView({ events, locations }: IProps) {
    const { selectedDate, use24HourFormat } = useCalendar();

    const locationList = locations;
    const hours = Array.from({ length: 24 }, (_, i) => i);

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

            <motion.div
                className="hidden flex-col sm:flex"
                variants={staggerContainer}
            >
                <div>
                    {/* Week header */}
                    <motion.div
                        className="relative z-20 flex border-b"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={transition}
                    >
                        <div className="w-18"></div>
                        <div
                            className={`grid flex-1 border-l`}
                            style={{ gridTemplateColumns: `repeat(${locationList.length}, minmax(0, 1fr))` }}
                        >
                            {locationList.map((location: TLocation, index: number) => (
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
                </div>

                <ScrollArea className="h-[736px]" type="always">
                    <div className="flex">
                        {/* Hours column */}
                        <motion.div className="relative w-18" variants={staggerContainer}>
                            {hours.map((hour, index) => (
                                <motion.div
                                    key={hour}
                                    className="relative"
                                    style={{ height: "96px" }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.02, ...transition }}
                                >
                                    <div className="absolute -top-3 right-2 flex h-6 items-center">
                                        {index !== 0 && (
                                            <span className="text-xs text-t-quaternary">
                                                {format(
                                                    new Date().setHours(hour, 0, 0, 0),
                                                    use24HourFormat ? "HH:00" : "h a"
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Week grid */}
                        <motion.div
                            className="relative flex-1 border-l"
                            variants={staggerContainer}
                        >
                            <div className={`grid divide-x`}
                                style={{ gridTemplateColumns: `repeat(${locationList.length}, minmax(0, 1fr))` }}>
                                {locationList.map((location: TLocation, locationIndex: number) => {
                                    const locationEvents = events.filter(
                                        (event) => event.location?.id === location.id
                                    );
                                    const groupedEvents = groupEvents(locationEvents);

                                    return (
                                        <motion.div
                                            key={location.id}
                                            className="relative"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: locationIndex * 0.1, ...transition }}
                                        >
                                            {hours.map((hour, index) => (
                                                <motion.div
                                                    key={hour}
                                                    className="relative"
                                                    style={{ height: "96px" }}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.01, ...transition }}
                                                >
                                                    {index !== 0 && (
                                                        <div className="pointer-events-none absolute inset-x-0 top-0 border-b" />
                                                    )}

                                                    <DroppableArea
                                                        date={selectedDate}
                                                        hour={hour}
                                                        minute={0}
                                                        entityId={location.id}
                                                        className="absolute inset-x-0 top-0 h-[48px]"
                                                    >
                                                        <AddEditEventDialog
                                                            startDate={selectedDate}
                                                            startTime={{ hour, minute: 0 }}
                                                            location={location}
                                                        >
                                                            <div className="absolute inset-0 cursor-pointer transition-colors hover:bg-secondary" />
                                                        </AddEditEventDialog>
                                                    </DroppableArea>

                                                    <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary" />

                                                    <DroppableArea
                                                        date={selectedDate}
                                                        hour={hour}
                                                        minute={30}
                                                        entityId={location.id}
                                                        className="absolute inset-x-0 bottom-0 h-[48px]"
                                                    >
                                                        <AddEditEventDialog
                                                            startDate={selectedDate}
                                                            startTime={{ hour, minute: 30 }}
                                                            location={location}
                                                        >
                                                            <div className="absolute inset-0 cursor-pointer transition-colors hover:bg-secondary" />
                                                        </AddEditEventDialog>
                                                    </DroppableArea>
                                                </motion.div>
                                            ))}

                                            <RenderGroupedEvents
                                                groupedEvents={groupedEvents}
                                                day={selectedDate}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>


                            <CalendarTimeline />
                        </motion.div>
                    </div>
                </ScrollArea>
            </motion.div>
        </motion.div>
    );
}