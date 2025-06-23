import type { TLocation, TProvider, TPatient } from "./types";

export const mockLocations: TLocation[] = [
    { id: "loc-1", name: "Quirófano 1" },
    { id: "loc-2", name: "Quirófano 2" },
    { id: "loc-3", name: "Quirófano 3" },
    { id: "loc-4", name: "Quirófano 4" },
    { id: "loc-5", name: "Quirófano 5" },
];

export const mockProviders: TProvider[] = [
    { id: "prov-1", name: "Dr. A" },
    { id: "prov-2", name: "Dr. B" },
    { id: "prov-3", name: "Dr. C" },
    { id: "prov-4", name: "Dr. D" },
    { id: "prov-5", name: "Dr. E" },
    { id: "prov-6", name: "Dr. F" },
];

export const mockPatients: TPatient[] = [
    { id: "pat-1", name: "Paciente A" },
    { id: "pat-2", name: "Paciente B" },
    { id: "pat-3", name: "Paciente C" },
];
