import { motion } from "framer-motion";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { staggerContainer, transition } from "@/modules/calendar/animations";

import { DayCell } from "@/modules/calendar/components/month-view/day-cell";

import {
  getCalendarCells,
  calculateMonthEventPositions,
} from "@/modules/calendar/helpers";

import type { IEvent } from "@/modules/calendar/interfaces";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarMonthView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate } = useCalendar();

  const allEvents = [...multiDayEvents, ...singleDayEvents];

  const cells = getCalendarCells(selectedDate);

  const eventPositions = calculateMonthEventPositions(
    multiDayEvents,
    singleDayEvents,
    selectedDate
  );

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      <div className="grid grid-cols-7 divide-x">
        {WEEK_DAYS.map((day, index) => (
          <motion.div
            key={day}
            className="flex items-center justify-center py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, ...transition }}
          >
            <span className="text-xs font-medium text-t-quaternary">{day}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-7 overflow-hidden"
        variants={staggerContainer}
      >
        {cells.map((cell, index) => (
          <motion.div
            key={cell.date.toISOString()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.01, ...transition }}
          >
            <DayCell
              cell={cell}
              events={allEvents}
              eventPositions={eventPositions}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
