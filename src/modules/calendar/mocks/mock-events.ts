import { ICustomEvent } from "@/types/custom-event";

export const mockEvents: ICustomEvent[] = [
    {
        id: 1,
        title: "Cirugía de Rodilla",
        startDate: "2025-07-01T07:00:00",
        endDate: "2025-07-01T08:00:00",
        location: { id: "loc-1", name: "Quirófano 1", color: "#FF5733" },
        provider: { id: "prov-1", name: "Dr. A" },
        patient: { id: "pat-1", name: "Paciente A" },
    },
    {
        id: 2,
        title: "Laparoscopia",
        startDate: "2025-07-01T08:00:00",
        endDate: "2025-07-01T09:30:00",
        location: { id: "loc-2", name: "Quirófano 2", color: "#6366f1" },
        provider: { id: "prov-2", name: "Dr. B" },
        patient: { id: "pat-2", name: "Paciente B" },
    },
    {
        id: 3,
        title: "Evaluación Post-Op",
        startDate: "2025-07-01T08:15:00",
        endDate: "2025-07-01T09:00:00",
        location: { id: "loc-1", name: "Quirófano 3", color: "#10b981" },
        provider: { id: "prov-1", name: "Dr. C" },
        patient: { id: "pat-3", name: "Paciente C" },
    },
];
