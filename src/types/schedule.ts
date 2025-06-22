export type ScheduleEvent = {
    id: string
    provider: {
        id: string
        name: string
        avatarUrl: string
    }
    roomId: string
    start: string // formato: '07:15'
    end: string   // formato: '09:45'
    patientName: string
    physicianName: string
    color: string // HEX
}

export type GridEntity = {
    id: string
    label: string
}
