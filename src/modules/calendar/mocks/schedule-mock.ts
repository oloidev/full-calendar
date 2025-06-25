import { ScheduleEvent, GridEntity } from "@/types/schedule";

export const mockEvents: ScheduleEvent[] = [
    {
        id: "1",
        provider: {
            id: "p1",
            name: "Dr. House",
            avatarUrl: "/avatars/house.png"
        },
        roomId: "r1",
        start: "08:00",
        end: "09:30",
        patientName: "John Doe",
        physicianName: "Dr. House",
        color: "#FF5733"
    },
    {
        id: "2",
        provider: {
            id: "p2",
            name: "Dr. Cuddy",
            avatarUrl: "/avatars/cuddy.png"
        },
        roomId: "r2",
        start: "10:00",
        end: "11:00",
        patientName: "Jane Doe",
        physicianName: "Dr. Cuddy",
        color: "#33C1FF"
    }
];

export const mockLocations: GridEntity[] = [
    { id: "r1", label: "Quirófano 1" },
    { id: "r2", label: "Quirófano 2" }
];
