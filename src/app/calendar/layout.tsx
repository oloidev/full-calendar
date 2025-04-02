// import {CalendarProvider} from "@/modules/calendar/contexts/calendar-context";
// import {getEvents, getUsers} from "@/modules/calendar/requests";
// import {ChangeBadgeVariantInput} from "@/modules/calendar/components/change-badge-variant-input";
// import { DragDropProvider, useDragDrop } from "@/modules/calendar/contexts/drag-drop-context";
// import { IEvent } from "@/modules/calendar/interfaces";
// import { useEffect } from "react";
// import {EventUpdateHandler} from "@/modules/calendar/components/event-update-handler";
//
// export default async function Layout({ children }: { children: React.ReactNode }) {
//   const [events, users] = await Promise.all([getEvents(), getUsers()]);
//
//   const handleEventUpdate = (event: IEvent, newStartDate: Date, newEndDate: Date) => {
//     // Create a new event with updated dates
//     const updatedEvent = {
//       ...event,
//       startDate: newStartDate.toISOString(),
//       endDate: newEndDate.toISOString(),
//     };
//
//     // Update the event in your state or API
//     // This will depend on how your app manages events
//     // For example:
//     // updateEvent(updatedEvent);
//
//     // For now, let's just log it
//     console.log('Event updated:', updatedEvent);
//   };
//
//   return (
//     <DragDropProvider>
//     <CalendarProvider users={users} events={events} view="month" >
//     <EventUpdateHandler onEventUpdate={handleEventUpdate} />
//       <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4">
//         {children}
//         <ChangeBadgeVariantInput />
//       </div>
//     </CalendarProvider>
//     </DragDropProvider>
//   );
// }
//
//


export default function CalendarLayout(
    {
        children,
    }: {
        children: React.ReactNode;
    }
){
  return children
}