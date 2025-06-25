import { ICustomEvent } from "@/types/custom-event";
import { Entity } from "@/modules/calendar/types";

export function groupEventsByEntityAndTime(
    events: ICustomEvent[],
    entities: Entity[],
    entityType: "location" | "provider"
): Record<string, ICustomEvent[]> {
    const grouped: Record<string, ICustomEvent[]> = {};

    entities.forEach((entity) => {
        grouped[entity.id] = events.filter((event) => {
            return event[entityType]?.id === entity.id;
        });
    });

    return grouped;
}
