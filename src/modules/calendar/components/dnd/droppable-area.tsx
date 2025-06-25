import React, { ReactNode } from 'react';
import { useDragDrop } from '@/modules/calendar/contexts/drag-drop-context';

interface DroppableAreaProps {
  date: Date;
  hour?: number;
  minute?: number;
  children: ReactNode;
  className?: string;
  entityId?: string; // ✅ NUEVA PROP
}

export function DroppableArea({ date, hour, minute, children, className, entityId }: DroppableAreaProps) {
  const { handleEventDrop, isDragging } = useDragDrop();

  return (
    <div
      className={`${className || ''} ${isDragging ? 'drop-target' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add('bg-primary/10');
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove('bg-primary/10');
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-primary/10');


        handleEventDrop(date, hour, minute, entityId);
      }}
      data-entity-id={entityId}
    >
      {children}
    </div>
  );
}
