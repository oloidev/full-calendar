export function generateTimeSlots(timeSlotMinutes: number, startHour = 0, endHour = 24) {
    const slots: { hour: number; minute: number }[] = [];

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += timeSlotMinutes) {
            slots.push({ hour, minute });
        }
    }

    return slots;
}
