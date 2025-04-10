import {FC} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {format, getTime} from "date-fns";
import {Repeat} from "lucide-react";
import {cn} from "@/lib/utils";
import {formatTime, getBgColor, getColorClass, useGetEventsByMode} from "@/modules/calendar/helpers";
import {EventDetailsDialog} from "@/modules/calendar/components/dialogs/event-details-dialog";
import {getFirstLetters} from "@/modules/calendar/helpers";
import {useCalendar} from "@/modules/calendar/contexts/calendar-context";

export const AgendaEvents: FC = () => {
    const {events , use24HourFormat} = useCalendar();

    const eventsByMode = Object.groupBy(useGetEventsByMode(events), (event) => {
        return format(event.startDate, 'yyyy-MM-dd');
    });

    const groupedAndSortedEvents = Object.entries(eventsByMode).sort((a, b) =>
        getTime(a[0]) - getTime(b[0])
    );

    return (
        <Command className="py-4 h-[80vh] bg-transparent">
            <div className="mb-4 mx-4 shadow-md">
                <CommandInput placeholder="Type a command or search..."/>
            </div>
            <CommandList className="max-h-max px-3">
                {groupedAndSortedEvents.map(([date, groupedEvents]) => (
                    <CommandGroup key={date} heading={format(date, "MMMM d, yyyy")}>
                        {groupedEvents!.map((event) => (
                            <CommandItem
                                key={event.id}
                                className={cn(
                                    "mb-2 p-4 border rounded-md data-[selected=true]:bg-bg data-[selected=true]:text-none hover:cursor-pointer",
                                    getColorClass(event.color)
                                )}>
                                <EventDetailsDialog event={event}>
                                    <div className="w-full flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src="" alt="@shadcn"/>
                                                <AvatarFallback className={getBgColor(event.color)}>
                                                    {getFirstLetters(event.title)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p>{event.title}</p>
                                        </div>
                                        <div className="w-40 sm:w-auto flex items-center gap-4">
                                            <p className="flex flex-wrap">
                                            <span className="block">
                                                {formatTime(event.startDate, use24HourFormat)}
                                            </span>
                                            </p>
                                            <Repeat/>
                                            <p className="flex flex-wrap">
                                            <span className="block">
                                                {formatTime(event.endDate, use24HourFormat)}
                                            </span>
                                            </p>
                                        </div>
                                    </div>
                                </EventDetailsDialog>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ))}
                <CommandEmpty>No results found.</CommandEmpty>
            </CommandList>
        </Command>
    );
};