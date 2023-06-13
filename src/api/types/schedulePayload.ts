type ScheduleCreatePayload = {
    name: string
    fromHours: number
    toHours: number
    fromWeekDay: number
    toWeekDay: number
}

export { ScheduleCreatePayload };