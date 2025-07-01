import type { TLocation, TProvider, TPatient } from "./types";

export const mockLocations: TLocation[] = [
    { id: "loc-1", name: "Quirófano 1", color: "#FF5733" },   // rojo anaranjado
    { id: "loc-2", name: "Quirófano 2", color: "#6366f1" },   // azul índigo
    { id: "loc-3", name: "Quirófano 3", color: "#10b981" },   // verde esmeralda
    { id: "loc-4", name: "Quirófano 4", color: "#0ea5e9" },   // azul celeste
    { id: "loc-5", name: "Quirófano 5", color: "#8b5cf6" },   // violeta
    { id: "loc-6", name: "Quirófano 6", color: "#33C1FF" },   // azul claro
    { id: "loc-7", name: "Quirófano 7", color: "#f59e0b" },   // ámbar
    { id: "loc-8", name: "Quirófano 8", color: "#ec4899" },   // rosa fuerte
    { id: "loc-9", name: "Quirófano 9", color: "#ef4444" },   // rojo
    { id: "loc-10", name: "Quirófano 10", color: "#14b8a6" }, // turquesa
    { id: "loc-11", name: "Quirófano 11", color: "#a855f7" }, // púrpura
    { id: "loc-12", name: "Quirófano 12", color: "#22c55e" }, // verde brillante
    { id: "loc-13", name: "Quirófano 13", color: "#3b82f6" }, // azul intenso
    { id: "loc-14", name: "Quirófano 14", color: "#d946ef" }, // fucsia
];


export const mockProviders: TProvider[] = [
    { id: "prov-1", name: "Dr. A", avatarUrl: "https://i.pravatar.cc/100?u=dr-a" },
    { id: "prov-2", name: "Dr. B", avatarUrl: "https://i.pravatar.cc/100?u=dr-b" },
    { id: "prov-3", name: "Dr. C", avatarUrl: "https://i.pravatar.cc/100?u=dr-c" },
    { id: "prov-4", name: "Dr. D", avatarUrl: "https://i.pravatar.cc/100?u=dr-d" },
    { id: "prov-5", name: "Dr. E", avatarUrl: "https://i.pravatar.cc/100?u=dr-e" },
    { id: "prov-6", name: "Dr. F", avatarUrl: "https://i.pravatar.cc/100?u=dr-f" },
    { id: "prov-7", name: "Dr. G", avatarUrl: "https://i.pravatar.cc/100?u=dr-g", },
    { id: "prov-8", name: "Dr. H", avatarUrl: "https://i.pravatar.cc/100?u=dr-h" },
    { id: "prov-9", name: "Dr. I", avatarUrl: "https://i.pravatar.cc/100?u=dr-i" },
    { id: "prov-10", name: "Dr. J", avatarUrl: "https://i.pravatar.cc/100?u=dr-j" },
    { id: "prov-11", name: "Dr. K", avatarUrl: "https://i.pravatar.cc/100?u=dr-k" },
    { id: "prov-12", name: "Dr. L", avatarUrl: "https://i.pravatar.cc/100?u=dr-l" },
    { id: "prov-13", name: "Dr. M", avatarUrl: "https://i.pravatar.cc/100?u=dr-m" },
    { id: "prov-14", name: "Dr. N", avatarUrl: "https://i.pravatar.cc/100?u=dr-n" },
    { id: "prov-15", name: "Dr. O", avatarUrl: "https://i.pravatar.cc/100?u=dr-o" },
    { id: "prov-16", name: "Dr. P", avatarUrl: "https://i.pravatar.cc/100?u=dr-p" },
    { id: "prov-17", name: "Dr. Q", avatarUrl: "https://i.pravatar.cc/100?u=dr-q" },
    { id: "prov-19", name: "Dr. R", avatarUrl: "https://i.pravatar.cc/100?u=dr-r" },
    { id: "prov-20", name: "Dr. S", avatarUrl: "https://i.pravatar.cc/100?u=dr-s" },
    { id: "prov-21", name: "Dr. S", avatarUrl: "https://i.pravatar.cc/100?u=dr-t" },
    { id: "prov-22", name: "Dr. S", avatarUrl: "https://i.pravatar.cc/100?u=dr-w" },
    { id: "prov-23", name: "Dr. S", avatarUrl: "https://i.pravatar.cc/100?u=dr-x" },
    { id: "prov-24", name: "Dr. S", avatarUrl: "https://i.pravatar.cc/100?u=dr-y" },
];

export const mockPatients: TPatient[] = [
    { id: "pat-1", name: "Paciente A" },
    { id: "pat-2", name: "Paciente B" },
    { id: "pat-3", name: "Paciente C" },
];
