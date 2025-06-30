"use client";

import { HTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ICustomEvent } from "@/types/custom-event";
import { parseISO, format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { EventDetailsDialog } from "@/modules/calendar/components/dialogs/event-details-dialog";
import { DraggableEvent } from "@/modules/calendar/components/dnd/draggable-event";

interface Props extends HTMLAttributes<HTMLDivElement> {
    event: ICustomEvent;
}

export function InvertedEventBlock({ event, className }: Props) {
    const { use24HourFormat } = useCalendar();

    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);
    const formattedTime = `${format(start, use24HourFormat ? "HH:mm" : "h:mm a")} - ${format(
        end,
        use24HourFormat ? "HH:mm" : "h:mm a"
    )}`;

    const provider = event.provider;
    const patient = event.patient;
    const orName = event.location?.name || "OR";

    const color = provider?.color || "#14b8a6"; // fallback

    return (
        <EventDetailsDialog event={event}>
            <DraggableEvent event={event}>
                <div
                    role="button"
                    tabIndex={0}
                    className={cn(
                        "flex items-center justify-between gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-gray-800 bg-white shadow-sm relative",
                        className
                    )}
                >
                    {/* Línea de color a la izquierda */}
                    <div
                        className="absolute top-0 left-0 h-full w-1 rounded-l-md"
                        style={{ backgroundColor: color }}
                    />

                    {/* Contenido principal */}
                    <div className="flex flex-col truncate">
                        <p className="font-semibold truncate">{patient?.name || "Paciente"}</p>
                        <p className="text-muted-foreground truncate">
                            {orName} {formattedTime} {provider?.name ? `· ${provider.name}` : ""}
                        </p>
                    </div>

                    {/* Avatar */}
                    {provider && (
                        <Avatar className="h-5 w-5 shrink-0">
                            {provider.avatarUrl ? (
                                <AvatarImage src={provider.avatarUrl} />
                            ) : (
                                <AvatarFallback>
                                    {provider.name?.charAt(0) ?? "D"}
                                </AvatarFallback>
                            )}
                        </Avatar>
                    )}
                </div>
            </DraggableEvent>
        </EventDetailsDialog>
    );
}
