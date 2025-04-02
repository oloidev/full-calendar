"use client";

import {useCalendar} from "@/modules/calendar/contexts/calendar-context";

import {Select, SelectItem, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select";

export function ChangeBadgeVariantInput() {
    const {badgeVariant, setBadgeVariant} = useCalendar();

    return (
        <div className="space-y-1">
            <p className="text-sm font-semibold">Change badge variant</p>

            <Select value={badgeVariant} onValueChange={setBadgeVariant}>
                <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select badge variant"/>
                </SelectTrigger>
                <SelectContent className="w-64" align="end">
                    <SelectItem value="dot">Dot</SelectItem>
                    <SelectItem value="colored">Colored</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
