import { parseISO, differenceInMinutes, getHours, getMinutes } from "date-fns";
import { ICustomEvent } from "@/types/custom-event";

export function getEventBlockStyleForTimeline(
    event: ICustomEvent,
): React.CSSProperties {
    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);

    const startHour = 7;

    const totalMinutesFromTop = (getHours(start) - startHour) * 60 + getMinutes(start);
    const duration = differenceInMinutes(end, start);

    const slotHeight = 60;
    const pixelsPerMinute = slotHeight / 60;

    const top = totalMinutesFromTop * pixelsPerMinute;
    const height = duration * pixelsPerMinute;

    return {
        top: `${top}px`,
        height: `${height}px`,
    };
}
