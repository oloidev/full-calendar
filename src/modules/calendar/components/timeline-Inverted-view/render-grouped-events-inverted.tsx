import { ICustomEvent } from "@/types/custom-event";
import { getEventBlockStyleForInvertedTimeline } from "@/modules/calendar/helpers/getEventBlockStyleForInvertedTimeline";
import { areIntervalsOverlapping, parseISO } from "date-fns";
import { InvertedEventBlock } from "./InvertedEventBlock";

interface RenderGroupedEventsProps {
    groupedEvents: ICustomEvent[][];
    day: Date;
}

export function RenderGroupedEventsInverted({ groupedEvents }: RenderGroupedEventsProps) {
    return groupedEvents.map((group, groupIndex) =>
        group.map((event) => {
            let style = getEventBlockStyleForInvertedTimeline(event);

            const hasOverlap = groupedEvents.some(
                (otherGroup, otherIndex) =>
                    otherIndex !== groupIndex &&
                    otherGroup.some((otherEvent) =>
                        areIntervalsOverlapping(
                            {
                                start: parseISO(event.startDate),
                                end: parseISO(event.endDate),
                            },
                            {
                                start: parseISO(otherEvent.startDate),
                                end: parseISO(otherEvent.endDate),
                            }
                        )
                    )
            );

            if (!hasOverlap) style = { ...style, top: "0px", height: "100%" };

            return (
                <div
                    key={event.id}
                    className="absolute p-1 pointer-events-none"
                    style={style}
                >
                    <div className="pointer-events-auto h-full">
                        <InvertedEventBlock event={event} />
                    </div>
                </div>
            );
        })
    );
}
