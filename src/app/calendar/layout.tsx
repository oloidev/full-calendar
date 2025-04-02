import {CalendarProvider} from "@/modules/calendar/contexts/calendar-context";
import {getEvents, getUsers} from "@/modules/calendar/requests";
import {ChangeBadgeVariantInput} from "@/modules/calendar/components/change-badge-variant-input";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const [events, users] = await Promise.all([getEvents(), getUsers()]);

  return (
    <CalendarProvider users={users} events={events} view="month" >
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4">
        {children}
        <ChangeBadgeVariantInput />
      </div>
    </CalendarProvider>
  );
}
