"use client";

import { useMemo } from "react";
import { isToday, startOfDay, format } from "date-fns";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Assuming shadcn/ui components are installed

import { EventBullet } from "@/modules/calendar/components/month-view/event-bullet";
import { MonthEventBadge } from "@/modules/calendar/components/month-view/month-event-badge";

import { getMonthCellEvents } from "@/modules/calendar/helpers";
import { staggerContainer, transition } from "@/modules/calendar/animations";

import type { ICalendarCell, IEvent } from "@/modules/calendar/interfaces";
import { cn } from "@/lib/utils";
import {cva} from "class-variance-authority";
import {useCalendar} from "@/modules/calendar/contexts/calendar-context";

interface IProps {
  cell: ICalendarCell;
  events: IEvent[];
  eventPositions: Record<string, number>;
}

const MAX_VISIBLE_EVENTS = 3;

const dayCellVariants = cva(
    "text-white", {
        variants: {
            color: {
                blue: "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 ",
                green: "bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400",
                red: "bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-400",
                yellow: "bg-yellow-600 dark:bg-yellow-500 hover:bg-yellow-700 dark:hover:bg-yellow-400",
                purple: "bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-400",
                orange: "bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-400",
                gray: "bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-400",
            },
        },
        defaultVariants: {
            color: "blue",
        },
    }
)


export function DayCell({ cell, events, eventPositions }: IProps) {
  const { day, currentMonth, date } = cell;

  const {badgeVariant} = useCalendar()


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
            <motion.div
                className={cn(
                    "h-4.5 px-1.5 text-xs font-semibold text-muted-foreground",
                    !currentMonth && "opacity-50"
                )}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ...transition }}
            >
              <Dialog>
                <DialogTrigger asChild>
              <span className="cursor-pointer">
                <span className="sm:hidden">
                  +{cellEvents.length - MAX_VISIBLE_EVENTS}
                </span>
                <span className="hidden sm:inline py-0.5 px-2 my-1 rounded-xl border">
                  {cellEvents.length - MAX_VISIBLE_EVENTS}
                  <span className="mx-1">more...</span>
                </span>
              </span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      Events for {format(date, "MMMM d, yyyy")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto space-y-2">
                    {cellEvents.map((event) => (
                        <div
                            key={event.id}
                            className={
                            cn("flex items-center gap-2 p-2 border rounded-md hover:bg-muted" , {
                                [dayCellVariants({color: event.color})]: badgeVariant === "colored",
                            })
                            }
                        >
                          <EventBullet color={event.color} className={""} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className={cn("text-xs" , {
                                "text-muted" : badgeVariant === "colored",
                                "text-muted-foreground" : badgeVariant === "dot",
                            })}>
                              {format(event.startDate, "h:mm a")}
                            </p>
                          </div>
                        </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
        )}
      </motion.div>
  );
}