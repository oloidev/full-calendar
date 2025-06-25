"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ICustomEvent } from "@/types/custom-event";
import { format } from "date-fns";
import { mockLocations, mockProviders } from "../mocks/mock-data";
import { useCalendar } from "./calendar-context"; // ✅ Importa el contexto

interface DragDropContextType {
  draggedEvent: ICustomEvent | null;
  isDragging: boolean;
  startDrag: (event: ICustomEvent) => void;
  endDrag: () => void;
  handleEventDrop: (date: Date, hour?: number, minute?: number, entityId?: string) => void;
  onEventDropped?: (event: ICustomEvent) => void;
  setOnEventDropped: (callback: (event: ICustomEvent) => void) => void;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export function DragDropProvider({ children }: { children: ReactNode }) {
  const { view } = useCalendar(); // ✅ usamos el contexto para decidir qué entidad se arrastra

  const getEntityType = () => {
    if (view === "timelineLocation") return "location";
    if (view === "timelineProvider") return "provider";
    return undefined;
  };

  const entityType = getEntityType();

  const [draggedEvent, setDraggedEvent] = useState<ICustomEvent | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [onEventDropped, setOnEventDroppedCallback] = useState<((event: ICustomEvent) => void) | undefined>(
    undefined
  );

  const startDrag = (event: ICustomEvent) => {
    setDraggedEvent(event);
    setIsDragging(true);
  };

  const endDrag = () => {
    setDraggedEvent(null);
    setIsDragging(false);
  };

  const handleEventDrop = (targetDate: Date, hour?: number, minute?: number, entityId?: string) => {
    if (!draggedEvent || !onEventDropped || !entityType) return;

    const originalStart = new Date(draggedEvent.startDate);
    const originalEnd = new Date(draggedEvent.endDate);
    const duration = originalEnd.getTime() - originalStart.getTime();

    const newStart = new Date(targetDate);
    if (hour !== undefined) {
      newStart.setHours(hour);
      newStart.setMinutes(minute || 0);
    } else {
      newStart.setHours(originalStart.getHours());
      newStart.setMinutes(originalStart.getMinutes());
    }

    const newEnd = new Date(newStart.getTime() + duration);

    const updatedEvent: ICustomEvent = {
      ...draggedEvent,
      startDate: format(newStart, "yyyy-MM-dd'T'HH:mm:ss"),
      endDate: format(newEnd, "yyyy-MM-dd'T'HH:mm:ss"),
      ...(entityType === "location" && {
        location: entityId
          ? mockLocations.find((loc) => loc.id === entityId)
          : draggedEvent.location,
      }),
      ...(entityType === "provider" && {
        provider: entityId
          ? mockProviders.find((p) => p.id === entityId)
          : draggedEvent.provider,
      }),
    };

    onEventDropped(updatedEvent);
    endDrag();
  };

  const setOnEventDropped = (callback: (event: ICustomEvent) => void) => {
    setOnEventDroppedCallback(() => callback);
  };

  return (
    <DragDropContext.Provider
      value={{
        draggedEvent,
        isDragging,
        startDrag,
        endDrag,
        handleEventDrop,
        onEventDropped,
        setOnEventDropped,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
}

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (context === undefined) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }
  return context;
}
