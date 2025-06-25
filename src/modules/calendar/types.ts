export type TCalendarView =
    | "day"
    | "week"
    | "month"
    | "year"
    | "agenda"
    | "timelineLocation"
    | "timelineProvider"
    | "invertedLocation"
    | "timeVprovider";

export type TEventColor = "blue" | "green" | "red" | "yellow" | "purple" | "orange";


export interface Entity {
    id: string;
    name: string;
}
