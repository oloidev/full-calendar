import {IEvent} from "@/modules/calendar/interfaces";
import {useDragDrop} from "@/modules/calendar/contexts/drag-drop-context";
import {useEffect} from "react";

interface EventUpdateHandlerProps {
    onEventUpdate: (event: IEvent, newStartDate: Date, newEndDate: Date) => void;
}

export function EventUpdateHandler({ onEventUpdate }: EventUpdateHandlerProps) {
    const { setOnEventDropped } = useDragDrop();

    useEffect(() => {
        setOnEventDropped(onEventUpdate);
    }, [setOnEventDropped, onEventUpdate]);

    return null;
}
