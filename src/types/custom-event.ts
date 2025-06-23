import type { TProvider, TLocation, TPatient } from "@/modules/calendar/mocks/types";

export interface ICustomEvent {
    id: number;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    color?: string;
    provider?: TProvider;
    location?: TLocation;
    patient?: TPatient;
}
