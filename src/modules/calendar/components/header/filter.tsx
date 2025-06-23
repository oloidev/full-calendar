import { Filter, RefreshCcw } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCalendar } from "@/modules/calendar/contexts/calendar-context";
import type { TEventColor } from "@/modules/calendar/types";
import { Toggle } from "@/components/ui/toggle";

export default function FilterEvents() {
    const { clearFilter } = useCalendar();

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
                    className="cursor-pointer w-fit"
                >
                    <Filter className="h-4 w-4" />
                </Toggle>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                {colors.map((color, index) => (
                    <DropdownMenuItem
                        key={index}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <div
                            className={`size-3.5 rounded-full bg-${color}-600 dark:bg-${color}-700`}
                        />
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                    //  disabled={selectedColors.length === 0}
                    className="flex gap-2 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault()
                        clearFilter();
                    }}
                >
                    <RefreshCcw
                        className='size-3.5'
                    />
                    Clear Filter
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
