import {getEvents, getUsers} from "@/modules/calendar/requests";
import {DragDropProvider} from "@/modules/calendar/contexts/drag-drop-context";
import {CalendarProvider} from "@/modules/calendar/contexts/calendar-context";
import {ChangeBadgeVariantInput} from "@/modules/calendar/components/change-badge-variant-input";
import {ClientContainer} from "@/modules/calendar/components/client-container";

export default async function Calendar() {
    const [events, users] = await Promise.all([getEvents(), getUsers()]);


    return (
        <DragDropProvider>
            <CalendarProvider users={users} events={events} view="month">
                <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4">
                    <ClientContainer/>
                    <ChangeBadgeVariantInput/>
                </div>
            </CalendarProvider>
        </DragDropProvider>
    );
}