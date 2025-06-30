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
import { TProvider } from "../../../mocks/types";
import { generateTimeSlots } from "@/modules/calendar/utils/timeSlots";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IProps {
    events: ICustomEvent[];
    providers: TProvider[];
}

export function InvertedProviderView({ events, providers }: IProps) {
    const {
        selectedDate,
        use24HourFormat,
        timeSlotMinutes,
    } = useCalendar();

    const providerList = providers;
    const timeSlots = generateTimeSlots(timeSlotMinutes, 0, 24);

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
                <div className="flex w-full h-[736px]">

                    {/* Columna izquierda fija con nombres de entidades */}
                    <div className="shrink-0 w-48 border-r">
                        <div className="h-[48px] border-b bg-muted" />
                        {providerList.map((provider) => (
                            <div
                                key={`label-${provider.id}`}
                                className="h-[112px] flex items-center justify-start pl-2 border-b"
                                style={{ height: `${rowHeight}px` }}
                            >
                                <div className="flex items-center gap-2 w-full max-w-full">
                                    <Avatar className="w-8 h-8 shrink-0">
                                        <AvatarImage src={provider.avatarUrl} />
                                        <AvatarFallback>
                                            {provider.name?.charAt(0) ?? "P"}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col justify-center leading-tight w-full truncate text-left">
                                        <span className="font-semibold text-sm truncate">{provider.name}</span>
                                        <span className="text-xs text-muted-foreground truncate">5 Cases 6:30 Hours</span> {/* mock */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Scroll horizontal que contiene header + grilla */}
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-fit">

                            {/* Header de horas */}
                            <div
                                className="grid border-b bg-muted"
                                style={{
                                    gridTemplateColumns: `repeat(${timeSlots.length}, ${columnWidth}px)`,
                                    minWidth: `${timeSlots.length * columnWidth}px`,
                                    height: "48px",
                                }}
                            >
                                {timeSlots.map(({ hour, minute }, i) => {
                                    const shouldShowLabel = timeSlotMinutes < 60 || minute === 0;

                                    return (
                                        <div
                                            key={`slot-header-${i}`}
                                            className="flex items-center justify-center text-xs font-medium text-t-quaternary border-r"
                                        >
                                            {shouldShowLabel
                                                ? format(
                                                    new Date().setHours(hour, minute, 0, 0),
                                                    use24HourFormat ? "HH:mm" : "h:mm a"
                                                )
                                                : null}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Grilla de eventos */}
                            <div className="flex flex-col">
                                {providerList.map((provider) => {
                                    const providerEvents = events.filter(
                                        (e) => e.provider?.id === provider.id
                                    );
                                    const groupedEvents = groupEvents(providerEvents);

                                    return (
                                        <div
                                            key={provider.id}
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
                                                    key={`${provider.id}-${hour}-${minute}`}
                                                    className="relative border-r"
                                                >
                                                    <DroppableArea
                                                        date={selectedDate}
                                                        hour={hour}
                                                        minute={minute}
                                                        entityId={provider.id}
                                                        className="w-full h-full"
                                                    >
                                                        <AddEditEventDialog
                                                            startDate={selectedDate}
                                                            startTime={{ hour, minute }}
                                                            entity={provider}
                                                            entityType="provider"
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
            </motion.div>
        </motion.div>
    );
}
