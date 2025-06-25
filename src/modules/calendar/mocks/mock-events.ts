import { ICustomEvent } from "@/types/custom-event";

export const mockEvents: ICustomEvent[] = [
    {
        id: 1,
        title: "Cirugía de Rodilla",
        startDate: "2025-06-24T07:00:00",
        endDate: "2025-06-24T08:00:00",
        provider: { id: "prov-1", name: "Dr. A" },
        location: { id: "loc-1", name: "Quirófano 1" },
        patient: { id: "pat-1", name: "Paciente A" },
        color: "blue"
    },
    {
        id: 2,
        title: "Laparoscopia",
        startDate: "2025-06-24T08:00:00",
        endDate: "2025-06-24T09:30:00",
        location: { id: "loc-2", name: "Quirófano 2" },
        provider: { id: "prov-2", name: "Dr. B" },
        patient: { id: "pat-2", name: "Paciente B" },
        color: "green",
    },
    {
        id: 3,
        title: "Evaluación Post-Op",
        startDate: "2025-06-24T08:15:00",
        endDate: "2025-06-24T09:00:00",
        location: { id: "loc-1", name: "Quirófano 1" },
        provider: { id: "prov-1", name: "Dr. A" },
        patient: { id: "pat-3", name: "Paciente C" },
        color: "red",
    },
];
