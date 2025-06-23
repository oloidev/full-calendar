"use client";

import {
    Plus,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
    buttonHover,
    slideFromLeft,
    slideFromRight,
    transition,
} from "@/modules/calendar/animations";

import { TodayButton } from "@/modules/calendar/components/header/today-button";
import { DateNavigator } from "@/modules/calendar/components/header/date-navigator";
import { AddEditEventDialog } from "@/modules/calendar/components/dialogs/add-edit-event-dialog";
import { ViewSwitcher } from "@/modules/calendar/components/dev/view-switcher";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { useFilteredEvents } from "@/modules/calendar/hooks";

export const MotionButton = motion.create(Button);

export function CalendarHeader() {
    const { view } = useCalendar();
    const events = useFilteredEvents();

    return (
        <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
            <motion.div
                className="flex items-center gap-3"
                variants={slideFromLeft}
                initial="initial"
                animate="animate"
                transition={transition}
            >
                <TodayButton />
                <DateNavigator view={view} events={events} />
            </motion.div>

            <motion.div
                className="flex items-center gap-3"
                variants={slideFromRight}
                initial="initial"
                animate="animate"
                transition={transition}
            >
                <AddEditEventDialog>
                    <div>
                        <MotionButton
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Plus className="h-4 w-4" />
                            Add Event
                        </MotionButton>
                    </div>
                </AddEditEventDialog>

                <ViewSwitcher />
            </motion.div>
        </div>
    );
}
