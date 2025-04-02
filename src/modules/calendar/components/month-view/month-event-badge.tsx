import { cva } from "class-variance-authority";
import { endOfDay, format, isSameDay, parseISO, startOfDay } from "date-fns";
import { motion } from "framer-motion";

import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { cardHover, transition } from "@/modules/calendar/animations";

import { EventDetailsDialog } from "@/modules/calendar/components/dialogs/event-details-dialog";
import { DraggableEvent } from "@/modules/calendar/components/draggable-event";
import { DroppableArea } from "@/modules/calendar/components/droppable-area";

import type { IEvent } from "@/modules/calendar/interfaces";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { eventBadgeVariants } from "@/lib/utils";

const eventBadgeVariants = cva(
  "mx-1 flex size-auto h-6.5 select-none items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 text-xs",
  {
    variants: {
      color: {
        blue: "border-blue-200 bg-blue-100/50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-950",
        green:
          "border-green-200 bg-green-100/50 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300 dark:hover:bg-green-950",
        red: "border-red-200 bg-red-100/50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950",
        yellow:
          "border-yellow-200 bg-yellow-100/50 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300 dark:hover:bg-yellow-950",
        purple:
          "border-purple-200 bg-purple-100/50 text-purple-700 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-300 dark:hover:bg-purple-950",
        orange:
          "border-orange-200 bg-orange-100/50 text-orange-700 hover:bg-orange-100 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300 dark:hover:bg-orange-950",

        "blue-dot":
          "border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-blue-600 dark:[&_svg]:fill-blue-500",
        "green-dot":
          "border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-green-600 dark:[&_svg]:fill-green-500",
        "red-dot":
          "border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-red-600 dark:[&_svg]:fill-red-500",
        "orange-dot":
          "border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-orange-600 dark:[&_svg]:fill-orange-500",
        "purple-dot":
          "border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-purple-600 dark:[&_svg]:fill-purple-500",
        "yellow-dot":
          "border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-yellow-600 dark:[&_svg]:fill-yellow-500",
      },
      multiDayPosition: {
        first:
          "relative z-10 mr-0 w-[calc(100%_+_1px)] rounded-r-none border-r-0 [&>span]:mr-2.5",
        middle:
          "relative z-10 mx-0 w-[calc(100%_+_1px)] rounded-none border-x-0",
        last: "ml-0 rounded-l-none border-l-0",
        none: "",
      },
    },
    defaultVariants: {
      color: "blue-dot",
    },
  }
);

interface IProps
  extends Omit<
    VariantProps<typeof eventBadgeVariants>,
    "color" | "multiDayPosition"
  > {
  event: IEvent;
  cellDate: Date;
  eventCurrentDay?: number;
  eventTotalDays?: number;
  className?: string;
  position?: "first" | "middle" | "last" | "none";
}

const MotionDiv = motion.div;

export function MonthEventBadge({
  event,
  cellDate,
  eventCurrentDay,
  eventTotalDays,
  className,
  position: propPosition,
}: IProps) {
  const { badgeVariant, handleEventDrop } = useCalendar();

  const itemStart = startOfDay(parseISO(event.startDate));
  const itemEnd = endOfDay(parseISO(event.endDate));

  if (cellDate < itemStart || cellDate > itemEnd) return null;

  let position: "first" | "middle" | "last" | "none" | undefined;

  if (propPosition) {
    position = propPosition;
  } else if (eventCurrentDay && eventTotalDays) {
    position = "none";
  } else if (isSameDay(itemStart, itemEnd)) {
    position = "none";
  } else if (isSameDay(cellDate, itemStart)) {
    position = "first";
  } else if (isSameDay(cellDate, itemEnd)) {
    position = "last";
  } else {
    position = "middle";
  }

  const renderBadgeText = ["first", "none"].includes(position);

  const color = (
    badgeVariant === "dot" ? `${event.color}-dot` : event.color
  ) as VariantProps<typeof eventBadgeVariants>["color"];

  const eventBadgeClasses = cn(
    eventBadgeVariants({ color, multiDayPosition: position, className })
  );

  return (
    <EventDetailsDialog event={event}>
      <MotionDiv
        className={cn(
          "group relative flex items-center gap-1 rounded-md px-1 py-0.5 text-xs",
          "hover:bg-bg-primary-hover",
          eventBadgeVariants({ color: event.color })
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, ...transition }}
        >
          {!["middle", "last"].includes(position) && eventCurrentDay && (
            <motion.span
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, ...transition }}
            >
              {format(parseISO(event.startDate), "h:mm a")}
            </motion.span>
          )}
          <motion.span
            className="truncate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, ...transition }}
          >
            {event.title}
          </motion.span>
        </motion.div>
      </MotionDiv>
    </EventDetailsDialog>
  );
}
