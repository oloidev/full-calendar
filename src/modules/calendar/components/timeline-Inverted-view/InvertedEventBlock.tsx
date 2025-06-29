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

    const anesthesiologist = event.anesthesiologist;
    const orName = event.location?.name || "OR";
    const role = event.surgeon?.role || "Surgeon";

    return (
        <EventDetailsDialog event={event}>
            <DraggableEvent event={event}>
                <div
                    role="button"
                    tabIndex={0}
                    className={cn(
                        "flex items-center justify-between gap-2 rounded-md border px-2 py-1.5 text-xs bg-muted text-foreground shadow-sm",
                        className
                    )}
                >
                    {/* Contenido principal */}
                    <div className="flex flex-col truncate">
                        <span className="font-semibold truncate">{event.title}</span>
                        <span className="text-muted-foreground truncate">
                            {`${orName} · ${formattedTime} · ${role}`}
                        </span>
                    </div>

                    {/* Avatar del anestesiólogo */}
                    {anesthesiologist && (
                        <Avatar className="h-5 w-5 shrink-0">
                            <AvatarImage src={anesthesiologist.avatarUrl} />
                            <AvatarFallback>{anesthesiologist.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </DraggableEvent>
        </EventDetailsDialog>
    );
}
