"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ICustomEvent } from '@/types/custom-event';
import { format } from 'date-fns';
import { mockLocations } from '../mocks/mock-data';

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
  const [draggedEvent, setDraggedEvent] = useState<ICustomEvent | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [onEventDropped, setOnEventDroppedCallback] = useState<
    ((event: ICustomEvent) => void) | undefined
  >(undefined);

  const startDrag = (event: ICustomEvent) => {
    setDraggedEvent(event);
    setIsDragging(true);
  };

  const endDrag = () => {
    setDraggedEvent(null);
    setIsDragging(false);
  };

  const handleEventDrop = (
    targetDate: Date,
    hour?: number,
    minute?: number,
    entityId?: string // 👈 NUEVO
  ) => {
    if (!draggedEvent || !onEventDropped) return;

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

    // Create new end date based on the same duration
    const newEnd = new Date(newStart.getTime() + duration);

    const updatedEvent = {
      ...draggedEvent,
      startDate: format(newStart, "yyyy-MM-dd'T'HH:mm:ss"),
      endDate: format(newEnd, "yyyy-MM-dd'T'HH:mm:ss"),
      location: entityId
        ? mockLocations.find((loc) => loc.id === entityId)
        : draggedEvent.location, // 👈 Cambiar solo si se soltó en otra columna
    };

    console.log("🧠 Dragged event", draggedEvent);
    console.log("🕒 New start:", newStart.toISOString());
    console.log("🕒 New end:", newEnd.toISOString());
    console.log("🏥 New entityId:", entityId);
    console.log("📦 Updated event:", updatedEvent);
    console.log("🧩 ID del evento actualizado:", updatedEvent.id);

    // Check if the event is being dropped in the same position
    const isSamePosition =
      originalStart.getFullYear() === newStart.getFullYear() &&
      originalStart.getMonth() === newStart.getMonth() &&
      originalStart.getDate() === newStart.getDate() &&
      originalStart.getHours() === newStart.getHours() &&
      originalStart.getMinutes() === newStart.getMinutes();


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
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}