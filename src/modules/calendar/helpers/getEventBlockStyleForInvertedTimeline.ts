import { parseISO, differenceInMinutes, getHours, getMinutes } from "date-fns";
import { ICustomEvent } from "@/types/custom-event";
export function getEventBlockStyleForInvertedTimeline(
    event: ICustomEvent
): React.CSSProperties {
    const start = parseISO(event.startDate);
    const end = parseISO(event.endDate);

    const startHour = 0; // ⬅️ CAMBIA esto para que inicie a medianoche
    const endHour = 24;
    const totalVisibleMinutes = (endHour - startHour) * 60;

    const startMinutes = (getHours(start) - startHour) * 60 + getMinutes(start);
    const duration = differenceInMinutes(end, start);

    const leftPercent = (startMinutes / totalVisibleMinutes) * 100;
    const widthPercent = (duration / totalVisibleMinutes) * 100;

    return {
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        top: "0px",
        height: "100%",
    };
}
