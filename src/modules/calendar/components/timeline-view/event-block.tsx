"use client";

import { HTMLAttributes } from "react";
import { ICustomEvent } from "@/types/custom-event";
import { parseISO, format, differenceInMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { EventDetailsDialog } from "@/modules/calendar/components/dialogs/event-details-dialog";
import { DraggableEvent } from "@/modules/calendar/components/dnd/draggable-event";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Props extends HTMLAttributes<HTMLDivElement> {
  event: ICustomEvent;
}

export function TimelineEventBlock({ event, className }: Props) {
  const { use24HourFormat, timeSlotMinutes } = useCalendar();

  const start = parseISO(event.startDate);
  const end = parseISO(event.endDate);

  const formattedTime = `${format(start, use24HourFormat ? "HH:mm" : "h:mm a")} - ${format(
    end,
    use24HourFormat ? "HH:mm" : "h:mm a"
  )}`;

  const durationInMinutes = differenceInMinutes(end, start);
  const cellHeight = 96;
  const pixelsPerMinute = cellHeight / Number(timeSlotMinutes);
  const heightInPixels = durationInMinutes * pixelsPerMinute;

  const anesthesiologist = event.provider;
  const patient = event.patient;
  const provider = event.provider;
  const color = anesthesiologist?.color || "#14b8a6"; // fallback a teal

  return (
    <EventDetailsDialog event={event}>
      <DraggableEvent event={event}>
        <div
          role="button"
          tabIndex={0}
          className={cn(
            "w-full rounded-md border border-border bg-gray-50 text-gray-800 text-xs px-2 py-2 shadow-sm flex flex-col gap-1 relative",
            className
          )}
          style={{ height: `${heightInPixels}px` }}
        >
          {/* Línea de color a la izquierda */}
          <div
            className="absolute top-0 left-0 h-full w-1 rounded-l-md"
            style={{ backgroundColor: color }}
          />

          {/* Header: avatar + nombre + quirófano + hora */}
          <div className="flex items-center gap-2">
            <Avatar className="w-5 h-5 shrink-0">
              {provider?.avatarUrl ? (
                <AvatarImage src={provider?.avatarUrl} />
              ) : (
                <AvatarFallback>
                  {anesthesiologist?.name?.charAt(0) ?? "A"}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex flex-col leading-4">
              <span className="font-semibold text-[0.7rem] leading-tight">
                {event.title || provider?.name}
              </span>
              <span className="text-[0.7rem] text-muted-foreground">
                <strong>{event.location?.name || "OR"}</strong> {formattedTime}
              </span>
            </div>
          </div>

          {/* Paciente y médico */}
          <p className="text-[0.7rem] mt-1">{patient?.name || "Paciente"}</p>
          <p className="text-[0.7rem]">{provider?.name || "Médico"}</p>
        </div>
      </DraggableEvent>
    </EventDetailsDialog>
  );
}
