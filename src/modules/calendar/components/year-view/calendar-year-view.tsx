import { motion } from "framer-motion";
import { getYear, isSameDay, isSameMonth } from "date-fns";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { staggerContainer, transition } from "@/modules/calendar/animations";
import { getCalendarCells } from "@/modules/calendar/helpers";
import { cn } from "@/lib/utils";
import { IEvent } from "@/modules/calendar/interfaces";
import { EventBullet } from "@/modules/calendar/components/month-view/event-bullet";
import { EventListDialog } from "@/modules/calendar/components/dialogs/events-list-dialog";

interface IProps {
    singleDayEvents: IEvent[];
    multiDayEvents: IEvent[];
}

const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CalendarYearView({ singleDayEvents, multiDayEvents }: IProps) {
    const { selectedDate, setSelectedDate } = useCalendar();
    const currentYear = getYear(selectedDate);
    const allEvents = [...multiDayEvents, ...singleDayEvents];

    return (
        <div className="flex flex-col h-full sm:min-h-[80vh] overflow-hidden sm:p-5">
            <motion.div
                className="flex flex-col items-center justify-center py-4 text-sm text-t-quaternary sm:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
            >
                <p>Yearly view is not available on smaller devices.</p>
                <p>Please switch to daily or monthly view.</p>
            </motion.div>
            <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="hidden sm:grid grid-cols-3 gap-4 flex-grow overflow-hidden auto-rows-fr lg:grid-cols-4 "
            >
                {MONTHS.map((month, monthIndex) => {
                    const monthDate = new Date(currentYear, monthIndex, 1);
                    const cells = getCalendarCells(monthDate);

                    return (
                        <motion.div
                            key={month}
                            className="flex flex-col border rounded-md overflow-hidden h-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: monthIndex * 0.05, ...transition }}
                        >
                            <div
                                className="bg-primary/5 px-1 py-1 text-center font-medium cursor-pointer hover:bg-primary/10 transition-colors text-xs sm:text-sm"
                                onClick={() => setSelectedDate(new Date(currentYear, monthIndex, 1))}
                            >
                                {month}
                            </div>

                            <div className="grid grid-cols-7 text-center text-xs py-1">
                                {WEEKDAYS.map(day => (
                                    <div key={day} className="text-muted-foreground">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-0 p-0.5 flex-grow">
                                {cells.map((cell) => {
                                    const isCurrentMonth = isSameMonth(cell.date, monthDate);
                                    const isToday = isSameDay(cell.date, new Date());
                                    const dayEvents = allEvents.filter(event =>
                                        isSameDay(new Date(event.startDate), cell.date)
                                    );
                                    const hasEvents = dayEvents.length > 0;

                                    return (
                                        <div
                                            key={cell.date.toISOString()}
                                            className={cn(
                                                "flex flex-col items-center justify-center text-xs relative",
                                                !isCurrentMonth && "text-muted-foreground/50",
                                                isToday && "font-bold",
                                                !hasEvents && "cursor-default"
                                            )}
                                        >
                                            {hasEvents ? (
                                                <EventListDialog date={cell.date} events={dayEvents}>
                                                    <div className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                                                        <span className={cn(
                                                            "size-4 sm:size-5 flex items-center justify-center",
                                                            isToday && "rounded-full bg-primary text-primary-foreground"
                                                        )}>
                                                            {cell.day}
                                                        </span>
                                                        <div className="flex justify-center items-center gap-0.5">
                                                            {dayEvents.length <= 2 ? (
                                                                dayEvents.slice(0, 2).map(event => (
                                                                    <EventBullet
                                                                        key={event.id}
                                                                        color={event.color}
                                                                        className="size-1"
                                                                    />
                                                                ))
                                                            ) : (
                                                                <>
                                                                    <EventBullet
                                                                        color={dayEvents[0].color}
                                                                        className="size-1"
                                                                    />
                                                                    <span className="text-[.7rem] text-muted-foreground">
                                                                        +{dayEvents.length - 1}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </EventListDialog>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center">
                                                    <span className={cn(
                                                        "size-4 sm:size-5 flex items-center justify-center",
                                                        isToday && "rounded-full bg-primary text-primary-foreground"
                                                    )}>
                                                        {cell.day}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}