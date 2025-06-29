"use client";

import { HTMLAttributes } from "react";
import { ICustomEvent } from "@/types/custom-event";
import { parseISO, format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { EventDetailsDialog } from "@/modules/calendar/components/dialogs/event-details-dialog";
import { DraggableEvent } from "@/modules/calendar/components/dnd/draggable-event";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Props extends HTMLAttributes<HTMLDivElement> {
  event: ICustomEvent;
}

export function TimelineEventBlock({ event, className }: Props) {
  const { use24HourFormat } = useCalendar();

  const start = parseISO(event.startDate);
  const end = parseISO(event.endDate);
  const formattedTime = `${format(start, use24HourFormat ? "HH:mm" : "h:mm a")} - ${format(
    end,
    use24HourFormat ? "HH:mm" : "h:mm a"
  )}`;

  const anesthesiologist = event.anesthesiologist;
  const patient = event.patient;
  const provider = event.provider;

  return (
    <EventDetailsDialog event={event}>
      <DraggableEvent event={event}>
        <div
          role="button"
          tabIndex={0}
          className={cn(
            "w-full h-full rounded-md border border-border bg-muted px-2 py-1.5 text-xs flex flex-col gap-1 overflow-hidden shadow-sm",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <Avatar className="w-5 h-5">
              {anesthesiologist?.avatarUrl ? (
                <AvatarImage src={anesthesiologist.avatarUrl} />
              ) : (
                <AvatarFallback>
                  {anesthesiologist?.name?.charAt(0) ?? "A"}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="font-semibold truncate">
              {anesthesiologist?.name || "Anestesiólogo"}
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            <strong>{event.location?.name || "OR"}</strong> {formattedTime}
          </p>

          <p className="truncate">{patient?.name || "Paciente"}</p>
          <p className="truncate">{provider?.name || "Médico"}</p>
        </div>
      </DraggableEvent>
    </EventDetailsDialog>
  );
}
