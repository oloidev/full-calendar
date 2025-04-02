import { useMemo } from "react";
import { isToday, startOfDay } from "date-fns";
import { motion } from "framer-motion";

import { EventBullet } from "@/modules/calendar/components/month-view/event-bullet";
import { MonthEventBadge } from "@/modules/calendar/components/month-view/month-event-badge";

import { getMonthCellEvents } from "@/modules/calendar/helpers";
import { staggerContainer, transition } from "@/modules/calendar/animations";

import type { ICalendarCell, IEvent } from "@/modules/calendar/interfaces";
import { cn } from "@/lib/utils";

interface IProps {
  cell: ICalendarCell;
  events: IEvent[];
  eventPositions: Record<string, number>;
}

const MAX_VISIBLE_EVENTS = 3;

export function DayCell({ cell, events, eventPositions }: IProps) {
  const { day, currentMonth, date } = cell;

  const cellEvents = useMemo(
    () => getMonthCellEvents(date, events, eventPositions),
    [date, events, eventPositions]
  );
  const isSunday = date.getDay() === 0;

  return (
    <motion.div
      className={cn(
        "flex flex-col gap-1 border-l border-t py-1.5 lg:py-2",
        isSunday && "border-l-0"
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <motion.span
        className={cn(
          "h-6 px-1 text-xs font-semibold lg:px-2",
          !currentMonth && "text-muted-foreground",
          isToday(date) &&
            "flex w-6 translate-x-1 items-center justify-center rounded-full bg-primary text-primary-foreground"
        )}
        whileHover={{ scale: 1.1 }}
        transition={transition}
      >
        {day}
      </motion.span>

      <motion.div
        className={cn(
          "flex h-6 gap-1 px-2 lg:h-[94px] lg:flex-col lg:gap-2 lg:px-0",
          !currentMonth && "opacity-50"
        )}
        variants={staggerContainer}
      >
        {[0, 1, 2].map((position) => {
          const event = cellEvents.find((e) => e.position === position);
          const eventKey = event
            ? `event-${event.id}-${position}`
            : `empty-${position}`;

          return (
            <motion.div
              key={eventKey}
              className="lg:flex-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: position * 0.1, ...transition }}
            >
              {event && (
                <>
                  <EventBullet className="lg:hidden" color={event.color} />
                  <MonthEventBadge
                    className="hidden lg:flex"
                    event={event}
                    cellDate={startOfDay(date)}
                  />
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {cellEvents.length > MAX_VISIBLE_EVENTS && (
        <motion.p
          className={cn(
            "h-4.5 px-1.5 text-xs font-semibold text-muted-foreground",
            !currentMonth && "opacity-50"
          )}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...transition }}
        >
          <span className="sm:hidden">
            +{cellEvents.length - MAX_VISIBLE_EVENTS}
          </span>
          <span className="hidden sm:inline">
            {" "}
            {cellEvents.length - MAX_VISIBLE_EVENTS} more...
          </span>
        </motion.p>
      )}
    </motion.div>
  );
}
