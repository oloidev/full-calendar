import type { TLocation, TProvider, TPatient } from "./types";

export const mockLocations: TLocation[] = [
    { id: "loc-1", name: "Quirófano 1" },
    { id: "loc-2", name: "Quirófano 2" },
    { id: "loc-3", name: "Quirófano 3" },
    { id: "loc-4", name: "Quirófano 4" },
    { id: "loc-5", name: "Quirófano 5" },
];

export const mockProviders: TProvider[] = [
    { id: "prov-1", name: "Dr. A", avatarUrl: "https://i.pravatar.cc/100?u=dr-a", color: "#FF5733" },
    { id: "prov-2", name: "Dr. B", avatarUrl: "https://i.pravatar.cc/100?u=dr-b", color: "#6366f1" },
    { id: "prov-3", name: "Dr. C", avatarUrl: "https://i.pravatar.cc/100?u=dr-c", color: "#10b981" },
    { id: "prov-4", name: "Dr. D", avatarUrl: "https://i.pravatar.cc/100?u=dr-d", color: "#0ea5e9" },
    { id: "prov-5", name: "Dr. E", avatarUrl: "https://i.pravatar.cc/100?u=dr-e", color: "#8b5cf6" },
    { id: "prov-6", name: "Dr. F", avatarUrl: "https://i.pravatar.cc/100?u=dr-f", color: "#33C1FF" },
];

export const mockPatients: TPatient[] = [
    { id: "pat-1", name: "Paciente A" },
    { id: "pat-2", name: "Paciente B" },
    { id: "pat-3", name: "Paciente C" },
];
