import { GridConfig } from '@/types/schedule'

export const schedulePresets: { [key: string]: GridConfig } = {
    roomsVsTime: {
        type: 'timeline',
        view: 'Rooms vs Time',
        rows: [
            { id: 'room-1', label: 'Room 1' },
            { id: 'room-2', label: 'Room 2' },
        ],
        columns: [
            { id: 'time-col', label: 'Time' }
        ],
        time: {
            start: '06:00',
            end: '23:00',
            interval: 15,
        }
    },

    providersVsTime: {
        type: 'timeline',
        view: 'Providers vs Time',
        rows: [
            { id: 'provider-1', label: 'Dr. Smith' },
            { id: 'provider-2', label: 'Dr. Adams' },
        ],
        columns: [
            { id: 'time-col', label: 'Time' }
        ],
        time: {
            start: '06:00',
            end: '23:00',
            interval: 15,
        }
    },

    roomsKanban: {
        type: 'kanban',
        view: 'Rooms Kanban',
        rows: [],
        columns: [
            { id: 'room-1', label: 'Room 1' },
            { id: 'room-2', label: 'Room 2' },
        ],
        time: {
            start: '',
            end: '',
            interval: 0,
        }
    },
}
