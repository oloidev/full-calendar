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
import {format, parseISO} from "date-fns";
import {cn} from "@/lib/utils";
import {formatTime, getBgColor, getColorClass, getFirstLetters, useGetEventsByMode} from "@/modules/calendar/helpers";
import {EventDetailsDialog} from "@/modules/calendar/components/dialogs/event-details-dialog";
import {useCalendar} from "@/modules/calendar/contexts/calendar-context";
import {EventBullet} from "@/modules/calendar/components/month-view/event-bullet";

export const AgendaEvents: FC = () => {
    const {events, use24HourFormat, badgeVariant} = useCalendar();

    const eventsByMode = Object.groupBy(useGetEventsByMode(events), (event) => {
        return format(parseISO(event.startDate), 'yyyy-MM-dd');
    });

    const groupedAndSortedEvents = Object.entries(eventsByMode).sort((a, b) =>
        new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );

    return (
        <Command className="py-4 h-[80vh] bg-transparent">
            <div className="mb-4 mx-4">
                <CommandInput placeholder="Type a command or search..."/>
            </div>
            <CommandList className="max-h-max px-3">
                {groupedAndSortedEvents.map(([date, groupedEvents]) => (
                    <CommandGroup key={date} heading={format(new Date(date), "EEEE, dd MMMM yyyy")}>
                        {groupedEvents!.map((event) => (
                            <CommandItem
                                key={event.id}
                                className={cn(
                                    "mb-2 p-4 border rounded-md data-[selected=true]:bg-bg hover:bg-zinc-200 dark:hover:bg-gray-900 transition-all data-[selected=true]:text-none hover:cursor-pointer",
                                    {
                                        [getColorClass(event.color)]: badgeVariant === "colored",
                                    }
                                )}>
                                <EventDetailsDialog event={event}>
                                    <div className="w-full flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            {badgeVariant === "dot" ? (
                                                <EventBullet color={event.color}  />
                                            ) : (
                                                <Avatar>
                                                    <AvatarImage src="" alt="@shadcn"/>
                                                    <AvatarFallback className={getBgColor(event.color)}>
                                                        {getFirstLetters(event.title)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <p className={cn({
                                                "font-medium": badgeVariant === "dot",
                                                "text-foreground": badgeVariant === "dot"
                                            })}>{event.title}</p>
                                        </div>
                                        <div className="w-40 sm:w-auto flex items-center gap-1">
                                            <p className="flex flex-wrap">
                                                <span className={cn("block", {
                                                    "text-muted-foreground": badgeVariant === "dot",
                                                    "text-muted": badgeVariant === "colored"
                                                })}>
                                                    {formatTime(event.startDate, use24HourFormat)}
                                                </span>
                                            </p>
                                            <span
                                                className={cn({
                                                    "text-muted-foreground": badgeVariant === "dot",
                                                    "text-muted": badgeVariant === "colored"
                                                })}
                                            >
                                             -
                                            </span>
                                            <p className="flex flex-wrap">
                                                <span className={cn("block", {
                                                    "text-muted-foreground": badgeVariant === "dot",
                                                    "text-muted": badgeVariant === "colored"
                                                })}>
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