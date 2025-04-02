import {Filter} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useCalendar} from "@/modules/calendar/contexts/calendar-context";
import type {TEventColor} from "@/modules/calendar/types";
import {Toggle} from "@/components/ui/toggle";


export default function FilterEvents() {
    const {filterEventsByColor, resetFilter} = useCalendar();

    const colors: TEventColor[] = [
        "blue",
        "green",
        "red",
        "yellow",
        "purple",
        "orange",
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Toggle
                    variant="outline"
                >
                    <Filter className="h-4 w-4"/>
                </Toggle>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                {colors.map((color, index) => (
                    <DropdownMenuItem
                        key={index}
                        className="flex items-center gap-2"
                        onClick={() => filterEventsByColor(color)}
                    >
                        <div
                            className={`size-3.5 rounded-full bg-${color}-600 dark:bg-${color}-700`}
                        />
                        <span className="capitalize">{color}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
