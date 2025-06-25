type EntityType = "location" | "provider" | "time";

type ViewMode = {
    key: string;
    label: string;
    type: "kanban" | "timeline";
    rows: EntityType;
    columns: EntityType;
};

export const VIEW_MODES: ViewMode[] = [
    {
        key: "locationVtime",
        label: "Location vs Time",
        type: "kanban",
        rows: "location",
        columns: "time",
    },
    {
        key: "providerVtime",
        label: "Provider vs Time",
        type: "kanban",
        rows: "provider",
        columns: "time",
    },
    {
        key: "timeVlocation",
        label: "Time vs Room",
        type: "timeline",
        rows: "time",
        columns: "location",
    },
    {
        key: "timeVprovider",
        label: "Time vs Provider",
        type: "timeline",
        rows: "time",
        columns: "provider",
    },
];


export type TViewModeKey = (typeof VIEW_MODES)[number]["key"];
