import {
  CalendarRange,
  Columns,
  Grid3X3,
  LayoutList,
  List,
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

import { UserSelect } from "@/modules/calendar/components/header/user-select";
import { TodayButton } from "@/modules/calendar/components/header/today-button";
import { DateNavigator } from "@/modules/calendar/components/header/date-navigator";
import { AddEventDialog } from "@/modules/calendar/components/dialogs/add-event-dialog";
import FilterEvents from "@/modules/calendar/components/header/filter";

import type { IEvent } from "@/modules/calendar/interfaces";
import { ButtonGroup } from "@/components/ui/button-group";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import { TCalendarView } from "@/modules/calendar/types";
import { Toggle } from "@/components/ui/toggle";
import {ModeToggle} from "@/components/mode-toggle";

interface IProps {
  events: IEvent[];
}

const MotionButton = motion(Button);

export function CalendarHeader({ events }: IProps) {
  const { view, setView, isAgendaMode, toggleAgendaMode } = useCalendar();
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
        className="flex items-center justify-between gap-1.5"
        variants={slideFromRight}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <FilterEvents />
        <MotionButton
          variant="outline"
          onClick={() => toggleAgendaMode(!isAgendaMode)}
          className="size-min"
          asChild
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
        >
          <Toggle>{isAgendaMode ? <CalendarRange /> : <LayoutList />}</Toggle>
        </MotionButton>
        <ButtonGroup>
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
            <List className="h-4 w-4" />
          </MotionButton>

          <MotionButton
            variant={view === "week" ? "default" : "outline"}
            aria-label="View by week"
            className="hidden md:flex"
            onClick={() => setView("week")}
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          >
            <Columns className="h-4 w-4" />
          </MotionButton>

          <MotionButton
            variant={view === "month" ? "default" : "outline"}
            aria-label="View by month"
            className="hidden md:flex"
            onClick={() => setView("month")}
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          >
            <Grid3X3 className="h-4 w-4" />
          </MotionButton>
        </ButtonGroup>

        <div className="flex items-center gap-1.5">
          <UserSelect />

          <AddEventDialog>
            <MotionButton
              size="sm"
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Plus className="h-4 w-4" />
              Add Event
            </MotionButton>
          </AddEventDialog>

          <ModeToggle />
        </div>
      </motion.div>
    </div>
  );
}
