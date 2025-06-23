import type { TProvider, TLocation, TPatient } from "@/modules/calendar/mocks/types";

export interface ICustomEvent {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    color?: string;
    provider?: TProvider;
    location?: TLocation;
    patient?: TPatient;
}
