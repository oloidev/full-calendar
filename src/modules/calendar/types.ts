export type TCalendarView =
    | "timelineLocation"
    | "timelineProvider"
    | "invertedLocation"
    | "invertedProvider";

export type TEventColor = "blue" | "green" | "red" | "yellow" | "purple" | "orange";


export interface Entity {
    id: string;
    name: string;
}
