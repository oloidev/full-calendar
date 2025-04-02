import {
    CalendarRange, Clock,
    Columns, Grid2X2,
    Grid3X3,
    LayoutList,
    List,
    Plus,
} from "lucide-react";
import {motion} from "framer-motion";

import {Button} from "@/components/ui/button";
import {
    buttonHover,
    slideFromLeft,
    slideFromRight,
    transition,
} from "@/modules/calendar/animations";

import {UserSelect} from "@/modules/calendar/components/header/user-select";
import {TodayButton} from "@/modules/calendar/components/header/today-button";
import {DateNavigator} from "@/modules/calendar/components/header/date-navigator";
import {AddEditEventDialog} from "@/modules/calendar/components/dialogs/add-edit-event-dialog";
import FilterEvents from "@/modules/calendar/components/header/filter";

import type {IEvent} from "@/modules/calendar/interfaces";
import {ButtonGroup} from "@/components/ui/button-group";
import {useCalendar} from "@/modules/calendar/contexts/calendar-context";
import {Toggle} from "@/components/ui/toggle";
import {ModeToggle} from "@/components/mode-toggle";

interface IProps {
    events: IEvent[];
}

const MotionButton = motion(Button);

export function CalendarHeader({events}: IProps) {
    const {view, setView, isAgendaMode, toggleAgendaMode, use24HourFormat, toggleTimeFormat} = useCalendar();
    return (
        <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
            <motion.div
                className="flex items-center gap-3"
                variants={slideFromLeft}
                initial="initial"
                animate="animate"
                transition={transition}
            >
                <TodayButton/>
                <DateNavigator view={view} events={events}/>
            </motion.div>

            <motion.div
                className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-1.5"
                variants={slideFromRight}
                initial="initial"
                animate="animate"
                transition={transition}
            >
                <div className="options flex-wrap flex items-center gap-4 md:gap-2">
                    <FilterEvents/>
                    <MotionButton
                        variant="outline"
                        onClick={toggleTimeFormat}
                        asChild
                        variants={buttonHover}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Toggle>{use24HourFormat ? "24" : "12"} <Clock/></Toggle>
                    </MotionButton>
                    <MotionButton
                        variant="outline"
                        onClick={() => toggleAgendaMode(!isAgendaMode)}
                        asChild
                        variants={buttonHover}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Toggle>{isAgendaMode ? <CalendarRange/> : <LayoutList/>}</Toggle>
                    </MotionButton>
                    <ButtonGroup className="flex">
                        <MotionButton
                            variant={view === "day" ? "default" : "outline"}
                            aria-label="View by day"
                            onClick={() => {
                                setView("day");
                            }}
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <List className="h-4 w-4"/>
                        </MotionButton>

                        <MotionButton
                            variant={view === "week" ? "default" : "outline"}
                            aria-label="View by week"
                            onClick={() => setView("week")}
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Columns className="h-4 w-4"/>
                        </MotionButton>

                        <MotionButton
                            variant={view === "month" ? "default" : "outline"}
                            aria-label="View by month"
                            onClick={() => setView("month")}
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Grid3X3 className="h-4 w-4"/>
                        </MotionButton>
                        <MotionButton
                            variant={view === "year" ? "default" : "outline"}
                            aria-label="View by year"
                            onClick={() => setView("year")}
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Grid2X2 className="h-4 w-4"/>
                        </MotionButton>
                    </ButtonGroup>
                    <ModeToggle/>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-1.5">
                    <UserSelect/>

                    <AddEditEventDialog>
                        <MotionButton
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Plus className="h-4 w-4"/>
                            Add Event
                        </MotionButton>
                    </AddEditEventDialog>
                </div>
            </motion.div>
        </div>
    );
}